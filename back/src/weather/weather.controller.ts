import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather } from './schemas/weather.schema';
import { FillMonthlyDto } from './dto/fill-monthly.dto';
import { FillAnnualDto } from './dto/fill-annual.dto';
import { FillDailyDto } from './dto/fill-daily.dto';
import { FillSeasonlyDto } from './dto/fill-seasonly.dto';

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

  @Put('/import/annual')
  async fillAnnual(@Body() fillAnnualDto: FillAnnualDto): Promise<Weather> {
    return this.weatherService.fillAnnual(fillAnnualDto);
  }

  @Put('/import/seasonly')
  async fillSeasonly(@Body() fillSeasonlyDto: FillSeasonlyDto): Promise<Weather> {
    return this.weatherService.fillSeasonly(fillSeasonlyDto);
  }

  @Put('/import/monthly')
  async fillMonthly(@Body() fillMonthlyDto: FillMonthlyDto): Promise<Weather> {
    return this.weatherService.fillMonthly(fillMonthlyDto);
  }

  @Put('/import/daily')
  async fillDaily(@Body() fillDailyDto: FillDailyDto): Promise<Weather> {
    return this.weatherService.fillDaily(fillDailyDto);
  }

}
