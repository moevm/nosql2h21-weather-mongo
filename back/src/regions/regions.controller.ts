import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { Region } from './schemas/region.schema';
import { FillRegionsDto } from './dto/fill-regions.dto';

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
  async fillRegions(@Body() fillRegionsDto: FillRegionsDto): Promise<Region> {
    return this.regionsService.fillRegions(fillRegionsDto);
  }

}
