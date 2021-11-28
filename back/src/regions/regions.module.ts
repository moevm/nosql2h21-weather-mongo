import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionController } from './regions.controller';
import { RegionsService } from './regions.service';
import { Region, RegionSchema } from './schemas/region.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }])],
  controllers: [RegionController],
  providers: [RegionsService],
})
export class RegionModule {}
