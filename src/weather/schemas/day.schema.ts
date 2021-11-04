import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClimateDay } from './climateDay.schema';

export type DayDocument = Day & Document;

@Schema()
export class Day {    
  @Prop()
  day: number

  @Prop()
  climate_variables: ClimateDay
}

export const DaySchema = SchemaFactory.createForClass(Day);
