import { Injectable, Logger } from '@nestjs/common';
import { UserMapRoleGroupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserMapRoleGroupService {
  constructor(
    private readonly userMapRoleGroupRepo: UserMapRoleGroupRepository,
  ) {}

  /**
   * ผูก role code เข้ากับกลุ่มผู้ใช้ 1 รายการ
   * @param data ข้อมูลการผูก (groupId, roleCode)
   * @returns ข้อมูลที่ถูกสร้าง
   */
  create(data: Prisma.userMapRoleGroupCreateInput) {
    const condition = { data: data } as Prisma.userMapRoleGroupCreateArgs;
    return this.userMapRoleGroupRepo.create(condition);
  }

  /**
   * ดึงการผูก role กับกลุ่มทั้งหมด
   * @returns รายการทั้งหมด เรียงตาม id
   */
  findAll() {
    try {
      return this.userMapRoleGroupRepo.findMany({ orderBy: { id: 'asc' } });
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  /**
   * ค้นหาการผูก role กับกลุ่มตามเงื่อนไข
   * @param condition เงื่อนไขแบบ Prisma where
   * @returns รายการที่ตรงเงื่อนไข เรียงตาม id
   */
  findMany(condition: Prisma.userMapRoleGroupWhereInput) {
    return this.userMapRoleGroupRepo.findMany({
      where: { ...condition },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * ดึงเฉพาะ role code ของกลุ่มที่ระบุ
   * @param groupId รหัสกลุ่มผู้ใช้
   * @returns รายการ role code เช่น ["admin", "ma-user"]
   */
  async findRoleCodesByGroupId(groupId: string): Promise<string[]> {
    const records = await this.userMapRoleGroupRepo.findMany({
      where: { groupId: groupId },
      orderBy: { id: 'asc' },
    });
    return records.map((item) => item.roleCode);
  }

  /**
   * กำหนด role ของกลุ่มใหม่ทั้งชุด — ลบของเดิมแล้วสร้างตามรายการที่ส่งมา
   * ใช้ตอนแก้สิทธิ์ของกลุ่มในหน้าจัดการ เพื่อให้ผลลัพธ์ตรงกับที่ผู้ใช้เลือกเสมอ
   * @param groupId รหัสกลุ่มผู้ใช้
   * @param roleCodes รายการ role code ที่ต้องการให้กลุ่มนี้มี (ส่ง [] เพื่อล้างสิทธิ์ทั้งหมด)
   * @returns รายการ role code หลังบันทึก
   */
  async setRolesByGroupId(
    groupId: string,
    roleCodes: string[],
  ): Promise<string[]> {
    // ตัดค่าซ้ำและค่าว่างออก กัน unique constraint [groupId, roleCode] ชน
    const uniqueRoleCodes = Array.from(
      new Set((roleCodes ?? []).filter((code) => !!code)),
    );

    await this.userMapRoleGroupRepo.deleteMany({
      where: { groupId: groupId },
    });

    if (uniqueRoleCodes.length > 0) {
      await this.userMapRoleGroupRepo.createMany({
        data: uniqueRoleCodes.map((roleCode) => ({
          groupId: groupId,
          roleCode: roleCode,
        })),
      });
    }

    return uniqueRoleCodes;
  }

  /**
   * แก้ไขการผูก role กับกลุ่มรายการเดียว
   * @param id id ของรายการ
   * @param data ข้อมูลที่ต้องการแก้ไข
   * @returns ข้อมูลหลังแก้ไข
   */
  update(id: number, data: Prisma.userMapRoleGroupUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userMapRoleGroupUpdateArgs;
    return this.userMapRoleGroupRepo.update(condition);
  }

  /**
   * ลบการผูก role กับกลุ่มรายการเดียว
   * @param id id ของรายการ
   * @returns ข้อมูลที่ถูกลบ
   */
  remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userMapRoleGroupDeleteArgs;
    return this.userMapRoleGroupRepo.delete(condition);
  }
}
