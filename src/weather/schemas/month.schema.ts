import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClimateFull } from './climateFull.schema';
import { Day } from './day.schema';

export type MonthDocument = Month & Document;

@Schema()
export class Month {    
  @Prop()
  month: number

  @Prop()
  climate_variables: ClimateFull

  @Prop()
  days: Day[]
}

export const MonthSchema = SchemaFactory.createForClass(Month);
