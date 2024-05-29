import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@inventory/share';
import helmet from 'helmet';
import config from './configs';
import { EvoteMainModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';

const PORT = config().port;

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  const app = await NestFactory.create(EvoteMainModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app as any);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('inventory API')
    .setDescription('The inventory API description')
    .setVersion('1.0')
    .addTag('inventory')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`service user start on port : ${PORT}`);
}
bootstrap();
