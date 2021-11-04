import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Year } from './year.schema';

export type RegionDocument = Region & Document;

@Schema()
export class Region {    
  @Prop()
  region: number

  @Prop()
  regionName: string
  
  @Prop()
  years: Year[]
}

export const RegionSchema = SchemaFactory.createForClass(Region);
