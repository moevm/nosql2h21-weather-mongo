import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClimateFullDocument = ClimateFull & Document;

@Schema()
export class ClimateFull {    
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

export const ClimateFullSchema = SchemaFactory.createForClass(ClimateFull);
