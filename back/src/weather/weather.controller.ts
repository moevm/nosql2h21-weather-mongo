import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather } from './schemas/weather.schema';
import { FillMonthlyDto } from './dto/fill-monthly.dto';
import { FillAnnualDto } from './dto/fill-annual.dto';
import { FillDailyDto } from './dto/fill-daily.dto';
import { FillSeasonlyDto } from './dto/fill-seasonly.dto';
import { ReqParamsDto } from './dto/reqParams.dto';

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

  @Get('/annual')
  async getAnnualData(@Body() reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    console.log(reqParamsDto)
    return this.weatherService.getAnnual(reqParamsDto);
  }
  
  @Get('/seasonly')
  async getSeasonlyData(@Body() reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    console.log(reqParamsDto)
    return this.weatherService.getSeasonly(reqParamsDto);
  }

  @Get('/monthly')
  async getMonthlyData(@Body() reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    console.log(reqParamsDto)
    return this.weatherService.getMonthly(reqParamsDto);
  }

  @Get('/daily')
  async getDailyData(@Body() reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    console.log(reqParamsDto)
    return this.weatherService.getDaily(reqParamsDto);
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
