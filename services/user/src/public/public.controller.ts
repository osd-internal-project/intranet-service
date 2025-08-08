import { Controller, Get, Param, Res, Header } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import configs from 'src/configs';
const PORT = configs();
@Controller('public')
export class PublicController {}
