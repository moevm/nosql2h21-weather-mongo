import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { Weather, WeatherSchema } from './schemas/weather.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
