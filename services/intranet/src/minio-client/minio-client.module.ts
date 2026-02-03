import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/configs';

const config = appConfig();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    MinioModule.register({
      endPoint: config.minioEndpoint,
      port: +config.minioPort,
      accessKey: config.minioAccessKey,
      secretKey: config.minioSecretKey,
      useSSL: config.minioSsl,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
