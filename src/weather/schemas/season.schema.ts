import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClimateFull } from './climateFull.schema';

export type SeasonDocument = Season & Document;

@Schema()
export class Season {    
  @Prop()
  season: number

  @Prop()
  climate_variables: ClimateFull

}

export const SeasonSchema = SchemaFactory.createForClass(Season);
