import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRegionDto } from './dto/create-region.dto';
import { FillRegionsDto } from './dto/fill-regions.dto';
import { Region, RegionDocument } from './schemas/region.schema';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region.name) private readonly regionModel: Model<RegionDocument>,
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const createdRegion = new this.regionModel(createRegionDto);
    return createdRegion.save();
  }

  async findAll(): Promise<Region[]> {
    return this.regionModel.find({}, {_id: 0, __v: 0}).exec();
  }

  async findOne(id: number): Promise<Region> {
    return this.regionModel.findOne({region: id}, {_id: 0, __v: 0}).exec();
  }

  async fillRegions(fillRegionsDto: FillRegionsDto): Promise<Region> {
    var updatedRegion;

    fillRegionsDto.region.forEach(async (el, index) => {
      const name = fillRegionsDto.geo_region[index];
      const reg = {region: el, name: name};
      updatedRegion = new this.regionModel(reg);
      updatedRegion.save()
    }) 
    return updatedRegion;
  }
}
