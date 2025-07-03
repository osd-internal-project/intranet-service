import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@inventory/share';
import helmet from 'helmet';
import config from './configs';
import { ReportMainModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
const PORT = config().port;

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  const app = await NestFactory.create(ReportMainModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(cors());
  app.use(helmet());
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app as any);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Report API')
    .setDescription('The Report API description')
    .setVersion('1.0')
    .addTag('Report')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`service start on port : ${PORT}`);
}
bootstrap();
