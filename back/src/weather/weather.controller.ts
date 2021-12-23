import { Body, Controller, Get, Post, Put, Query, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather } from './schemas/weather.schema';
import { diskStorage } from 'multer';
import { FillMonthlyDto } from './dto/fill-monthly.dto';
import { FillAnnualDto } from './dto/fill-annual.dto';
import { FillDailyDto } from './dto/fill-daily.dto';
import { FillSeasonlyDto } from './dto/fill-seasonly.dto';
import { ReqParamsDto } from './dto/reqParams.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import * as fs from 'fs';
import { exec, execSync } from 'child_process';

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

  @Get('/export')
  async exportData(): Promise<StreamableFile> {
    execSync('mongoexport --uri=mongodb://mongodb/weatherdb --collection=weathers --out=uploads/db.json');
    const file = fs.createReadStream(join(process.cwd(), 'uploads/db.json'));
    return new StreamableFile(file)
  }

  @Post('/annual')
  async getAnnualData(@Query('param') param: string, @Query('skip') skip: number, @Query('limit') limit: number, @Body() reqParamsDto: ReqParamsDto): Promise<{total: number, data: Weather[]}> {
    console.log(reqParamsDto)
    return this.weatherService.getAnnual(param, reqParamsDto, skip, limit);
  }
  
  @Post('/seasonly')
  async getSeasonlyData(@Query('param') param: string, @Query('skip') skip: number, @Query('limit') limit: number, @Body() reqParamsDto: ReqParamsDto): Promise<{total: number, data: Weather[]}> {
    console.log(reqParamsDto)
    return this.weatherService.getSeasonly(param, reqParamsDto, skip, limit);
  }

  @Post('/monthly')
  async getMonthlyData(@Query('param') param: string, @Query('skip') skip: number, @Query('limit') limit: number, @Body() reqParamsDto: ReqParamsDto): Promise<{total: number, data: Weather[]}> {
    console.log(reqParamsDto)
    console.log("==============")
    console.log(limit)
    console.log(skip)
    return this.weatherService.getMonthly(param, reqParamsDto, skip, limit);
  }

  @Post('/daily')
  async getDailyData(@Query('param') param: string, @Query('skip') skip: number, @Query('limit') limit: number, @Body() reqParamsDto: ReqParamsDto): Promise<{total: number, data: Weather[]}> {
    console.log(reqParamsDto)
    return this.weatherService.getDaily(param, reqParamsDto, skip, limit);
  }

  @Put('/import/annual')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async fillAnnual(@UploadedFile() file: Express.Multer.File): Promise<Weather> {
    var allText = fs.readFileSync(file.path, 'utf-8').toString()
    const fillAnnualDto: FillAnnualDto = JSON.parse(allText)
    return this.weatherService.fillAnnual(fillAnnualDto);
  }

  @Put('/import/seasonly')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async fillSeasonly(@UploadedFile() file: Express.Multer.File): Promise<Weather> {
    var allText = fs.readFileSync(file.path, 'utf-8').toString()
    const fillSeasonlyDto: FillSeasonlyDto = JSON.parse(allText)
    return this.weatherService.fillSeasonly(fillSeasonlyDto);
  }

  @Put('/import/monthly')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async fillMonthly(@UploadedFile() file: Express.Multer.File): Promise<Weather> {
    var allText = fs.readFileSync(file.path, 'utf-8').toString()
    const fillMonthlyDto: FillMonthlyDto = JSON.parse(allText)
    return this.weatherService.fillMonthly(fillMonthlyDto);
  }

  @Put('/import/daily')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async fillDaily(@UploadedFile() file: Express.Multer.File): Promise<Weather> {
    var allText = fs.readFileSync(file.path, 'utf-8').toString()
    const fillDailyDto: FillDailyDto = JSON.parse(allText)
    return this.weatherService.fillDaily(fillDailyDto);
  }

}
