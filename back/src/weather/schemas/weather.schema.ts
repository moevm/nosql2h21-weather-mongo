import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClimateFull } from './climateFull.schema';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {    
  @Prop()
  region: number

  @Prop()
  year: number

  @Prop()
  month: number

  @Prop()
  day: number

  @Prop()
  season: number

  @Prop()
  climate_variables: ClimateFull
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
