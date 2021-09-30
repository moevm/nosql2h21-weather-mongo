import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather } from './schemas/weather.schema';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async create(@Body() createWeatherDto: CreateWeatherDto) {
    await this.weatherService.create(createWeatherDto);
  }

  @Get()
  async findAll(): Promise<Weather[]> {
    return this.weatherService.findAll();
  }
}
