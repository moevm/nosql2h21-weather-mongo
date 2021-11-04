import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClimateFull } from './climateFull.schema';
import { Month } from './month.schema';
import { Season } from './season.schema';

export type YearDocument = Year & Document;

@Schema()
export class Year {    
  @Prop()
  year: number
  
  @Prop()
  climate_variables: ClimateFull

  @Prop()
  months: Month[]
  
  @Prop()
  seasons: Season[]
}

export const YearSchema = SchemaFactory.createForClass(Year);
