import { Body, Controller, Get, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { extname } from 'path';
import { Region } from './schemas/region.schema';
import { diskStorage } from 'multer';

import { FillRegionsDto } from './dto/fill-regions.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('region')
export class RegionController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    await this.regionsService.create(createRegionDto);
  }

  @Get()
  async find(): Promise<Region[]> {
    return this.regionsService.findAll();
  }

  @Get('/name')
  async findName(@Query('id') id: string): Promise<Region> {
    return this.regionsService.findOne(Number(id));
  }

  @Put('/import')
  @UseInterceptors(FileInterceptor('data', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async fillRegions(@UploadedFile() file: Express.Multer.File): Promise<Region> {
    var allText = fs.readFileSync(file.path, 'utf-8').toString()
    const fillRegionsDto: FillRegionsDto = JSON.parse(allText)
    return this.regionsService.fillRegions(fillRegionsDto);
  }

}
