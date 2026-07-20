import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MaCarDocumentService } from './ma-car-document.service';

@Controller('ma-car-document')
export class MaCarDocumentController {
  constructor(private readonly maCarDocumentService: MaCarDocumentService) {}

  // route แบบ literal ต้องมาก่อน :documentId เสมอ ไม่งั้น Nest จะจับ "matrix" เป็น param
  /**
   * ตาราง matrix แบ่งหน้า: คืน { data (หน้าปัจจุบัน), count, cars (ทุกคัน) }
   * ไม่ส่ง take = คืนทุกแถว; keyword/status กรองฝั่ง server
   */
  @Get('matrix')
  getMatrix(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('keyword') keyword?: string,
    @Query('status') status?: string,
  ) {
    return this.maCarDocumentService.getMatrix({
      skip: skip !== undefined ? Number(skip) : undefined,
      take: take !== undefined ? Number(take) : undefined,
      keyword,
      status,
    });
  }

  /** ตัวเลขบนการ์ดสรุป */
  @Get('summary')
  getSummary(@Query('year') year?: string) {
    return this.maCarDocumentService.getSummary(year ? +year : undefined);
  }

  /** ข้อมูลกราฟทั้ง 2 แท็บ */
  @Get('chart')
  getChart(@Query('year') year?: string) {
    return this.maCarDocumentService.getChart(year ? +year : undefined);
  }

  /** ตัวเลือก combobox จากค่าที่เคยบันทึกไว้ ลดการพิมพ์ซ้ำ */
  @Get('suggestions')
  getSuggestions() {
    return this.maCarDocumentService.getSuggestions();
  }

  /**
   * รายการเอกสารทั้งหมดแบบ flat (log) — กรอง คัน/ประเภท/ช่วงเดือน เรียงใหม่→เก่า รวมแถวที่ยกเลิก
   * คืน { data, count }; ส่ง take มาเพื่อแบ่งหน้า (ไม่ส่ง = ได้ทุกแถว เช่นตอน Export)
   */
  @Get('log')
  getLog(
    @Query('carId') carId?: string,
    @Query('docType') docType?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.maCarDocumentService.getLog({
      carId,
      docType,
      startDate,
      endDate,
      skip: skip !== undefined ? Number(skip) : undefined,
      take: take !== undefined ? Number(take) : undefined,
    });
  }

  /** ประวัติทุกงวดของรถ 1 คัน + เอกสาร 1 ประเภท (รวมแถวที่ยกเลิก) */
  @Get('history/:carId/:docType')
  getHistory(@Param('carId') carId: string, @Param('docType') docType: string) {
    return this.maCarDocumentService.getHistory(carId, docType);
  }

  /** เพิ่มเอกสารงวดใหม่ — ใช้ทั้งตอนเพิ่มครั้งแรกและตอนต่ออายุ */
  @Post()
  create(@Body() data: Prisma.maCarDocumentCreateInput) {
    return this.maCarDocumentService.create(data);
  }

  @Patch(':documentId')
  update(
    @Param('documentId') documentId: string,
    @Body() data: Prisma.maCarDocumentUpdateInput,
  ) {
    return this.maCarDocumentService.update(documentId, data);
  }

  /** ยกเลิกเอกสาร (soft-void) — หายจาก matrix แต่ยังอยู่ในประวัติ */
  @Patch(':documentId/void')
  void(
    @Param('documentId') documentId: string,
    @Body() body: { updatedById?: string; updatedByName?: string },
  ) {
    return this.maCarDocumentService.void(
      documentId,
      body?.updatedById,
      body?.updatedByName,
    );
  }

  /** อัปโหลดไฟล์เอกสารขึ้น MinIO — memory storage (ไม่ใช้ diskStorage) */
  @Post(':documentId/files')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 200 * 1024 * 1024 },
    }),
  )
  async uploadFiles(
    @Param('documentId') documentId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files) {
      throw new Error('File is undefined');
    }
    return this.maCarDocumentService.uploadFiles(documentId, files);
  }

  @Delete('files/:id')
  removeFile(@Param('id') id: string) {
    return this.maCarDocumentService.removeFile(+id);
  }
}
