import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather, WeatherDocument } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private readonly weatherModel: Model<WeatherDocument>,
  ) {}

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    const createdWeather = new this.weatherModel(createWeatherDto);
    return createdWeather.save();
  }

  async findAll(): Promise<Weather[]> {
    return this.weatherModel.find().exec();
  }

  async fillAnnual() {
    
  }

  async fillMonthly() {
    
  }

  async fillDaily() {
    
  }
}
