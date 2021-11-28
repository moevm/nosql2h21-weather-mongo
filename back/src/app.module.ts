import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';
import { RegionModule } from './regions/regions.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb/weatherdb'),
            WeatherModule,
            RegionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
