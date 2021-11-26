import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {    
  @Prop()
  humidity: number;

  @Prop()
  temperature: number;

  @Prop()
  isRainy: boolean;

  @Prop()
  isCloudly: boolean;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
