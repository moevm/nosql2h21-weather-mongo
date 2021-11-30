import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  tasmax: number
  
  @Prop()
  tasmin: number
  
  @Prop()
  tas: number
  
  @Prop()
  rainfall: number
  
  @Prop()
  sun: number

  @Prop()
  sfcWind: number
  
  @Prop()
  psl: number
  
  @Prop()
  hurs: number
  
  @Prop()
  pv: number
  
  @Prop()
  groundfrost: number
  
  @Prop()
  snowLying: number
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
