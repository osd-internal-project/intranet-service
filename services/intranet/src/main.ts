import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@inventory/share';
import helmet from 'helmet';
import config from './configs';
import { IntranetMainModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const PORT = config().port;

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  const app = await NestFactory.create(IntranetMainModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app as any);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Intranet API')
    .setDescription('The Intranet API description')
    .setVersion('1.0')
    .addTag('Intranet')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`service start on port : ${PORT}`);
}
bootstrap();
