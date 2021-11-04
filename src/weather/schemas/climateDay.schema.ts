import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClimateDayDocument = ClimateDay & Document;

@Schema()
export class ClimateDay {    
  @Prop()
  tasmax: number

  @Prop()
  tasmin: number

  @Prop()
  rainfall: number
}

export const ClimateDaySchema = SchemaFactory.createForClass(ClimateDay);
