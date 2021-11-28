import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { FillAnnualDto } from './dto/fill-annual.dto';
import { FillDailyDto } from './dto/fill-daily.dto';
import { FillMonthlyDto } from './dto/fill-monthly.dto';
import { FillSeasonlyDto } from './dto/fill-seasonly.dto';
import { ParamDto } from './dto/param.dto';
import { ReqParamsDto } from './dto/reqParams.dto';
import { Weather, WeatherDocument } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private readonly weatherModel: Model<WeatherDocument>,
  ) { }

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    const createdWeather = new this.weatherModel(createWeatherDto);
    return createdWeather.save();
  }

  async getAnnual(reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    const filter = Object.assign({ month: null, season: null, day: null }, reqParamsDto);
    return this.weatherModel.find(filter, { _id: 0, __v: 0 }).exec();
  }

  async getSeasonly(reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    reqParamsDto.season = { $gte: (reqParamsDto.fromYear - 1800) * 4 + reqParamsDto.fromSeason - 1, 
                            $lte: (reqParamsDto.toYear - 1800) * 4 + reqParamsDto.toSeason - 1 };
    const filter = Object.assign({ month: null, day: null, year: null }, reqParamsDto);
    var data = await this.weatherModel.find(filter, { _id: 0, __v: 0 }).exec();
    data.map(el => {el.year = Math.floor(el.season/4) + 1800;
                    el.season = el.season%4 + 1;})
    return data;
  }

  async getMonthly(reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    reqParamsDto.month = { $gte: (reqParamsDto.fromYear - 1800) * 12 + reqParamsDto.fromMonth - 1, 
                           $lte: (reqParamsDto.toYear - 1800) * 12 + reqParamsDto.toMonth - 1 };
    const filter = Object.assign({ season: null, day: null, year: null }, reqParamsDto);
    var data = await this.weatherModel.find(filter, { _id: 0, __v: 0 }).exec();
    data.map(el => {el.year = Math.floor(el.month/12) + 1800;
    el.month = el.month%12 + 1;})
    return data;
  }

  async getDaily(reqParamsDto: ReqParamsDto): Promise<Weather[]> {
    const init = new Date(1800, 0, 1).getTime()
    const dayFrom = new Date(reqParamsDto.fromYear, reqParamsDto.fromMonth-1, reqParamsDto.fromDay+1).getTime()
    const dayTo = new Date(reqParamsDto.toYear, reqParamsDto.toMonth-1, reqParamsDto.toDay+1).getTime()
    reqParamsDto.day = { $gte: (dayFrom - init)/(1000*60*60*24), 
                         $lte: (dayTo - init)/(1000*60*60*24) };
    console.log(init)
    console.log(dayFrom)                    
    console.log(dayTo)                
    console.log(reqParamsDto)
    const filter = Object.assign({ season: null, month: null, year: null }, reqParamsDto);
    var data = await this.weatherModel.find(filter, { _id: 0, __v: 0 }).exec();
    data.map(el => { const time = new Date(1800, 0, el.day)
      el.year = time.getFullYear();
      el.month = time.getMonth()+1;
      el.day = time.getDate();})
    return data;
  }

  async findAll(): Promise<Weather[]> {
    return this.weatherModel.find({}, { _id: 0, __v: 0 }).exec();
  }

  async fillAnnual(fillAnnualDto: FillAnnualDto): Promise<Weather> {
    var updatedWeather;
    const param = fillAnnualDto.parameter;

    fillAnnualDto.values.forEach(async (el, index) => {
      const timeId = Math.floor(index / 16);
      const year = new Date(1800, 0, 1, fillAnnualDto.time[timeId]).getFullYear();
      const filter = { year: year, region: index % 16 + 1, month: null, season: null };
      const entity = await this.weatherModel.findOne(filter).exec();
      const update = this.getParamField(param, el);

      if (entity == null) {
        const object = Object.assign({ year: year, region: index % 16 + 1 }, update);
        updatedWeather = new this.weatherModel(object);
        updatedWeather.save();
      } else {
        updatedWeather = this.weatherModel.findOneAndUpdate(filter, update).exec();
      }

    })
    return updatedWeather;
  }

  async fillSeasonly(fillSeasonlyDto: FillSeasonlyDto): Promise<Weather> {
    var updatedWeather;
    var season;
    const param = fillSeasonlyDto.parameter;

    for (var index = 0; index < fillSeasonlyDto.values.length; index++) {
      const yearSeasonId = Math.floor(index / 16);
      season = (fillSeasonlyDto.calendar_year[yearSeasonId] - 1800) * 4
      switch (fillSeasonlyDto.clim_season[yearSeasonId]) {
        case "mam                                                             ": season += 2; break;
        case "jja                                                             ": season += 3; break;
        case "son                                                             ": season += 4; break;
        case "djf                                                             ": season += 1; break;
      }
      const filter = { season: season, region: index % 16 + 1 };
      const entity = await this.weatherModel.findOne(filter).exec();
      const update = this.getParamField(param, fillSeasonlyDto.values[index]);

      if (entity == null) {
        const object = Object.assign({ region: index % 16 + 1, season: season }, update)
        updatedWeather = new this.weatherModel(object);
        updatedWeather.save()
      } else {
        updatedWeather = this.weatherModel.findOneAndUpdate(filter, update).exec();
      }

    }
    return updatedWeather;
  }

  async fillMonthly(fillMonthlyDto: FillMonthlyDto): Promise<Weather> {
    var updatedWeather;
    const param = fillMonthlyDto.parameter;

    fillMonthlyDto.values.forEach(async (el, index) => {
      const monthYearId = Math.floor(index / 16);
      const monthNumber = (fillMonthlyDto.calendar_year[monthYearId] - 1800) * 12 + fillMonthlyDto.month_number[monthYearId]
      const filter = { month: monthNumber, region: index % 16 + 1 };
      const entity = await this.weatherModel.findOne(filter).exec();
      const update = this.getParamField(param, el);

      if (entity == null) {
        const object = Object.assign({}, filter, update)
        updatedWeather = new this.weatherModel(object);
        updatedWeather.save()
      } else {
        updatedWeather = this.weatherModel.findOneAndUpdate(filter, update).exec();
      }

    })
    return updatedWeather;
  }

  async fillDaily(fillDailyDto: FillDailyDto): Promise<Weather> {
    var updatedWeather;
    const param = fillDailyDto.parameter;

    for (var index = 0; index < fillDailyDto.values.length; index++) {
      const timeId = Math.floor(index / 16);
      const dayNumber = (fillDailyDto.time[timeId] - 12) / 24;
      const filter = { day: dayNumber, region: index % 16 + 1 };
      const entity = await this.weatherModel.findOne(filter).exec();
      const update = this.getParamField(param, fillDailyDto.values[index]);

      if (entity == null) {
        const object = Object.assign({}, filter, update);
        updatedWeather = new this.weatherModel(object);
        updatedWeather.save();
      } else {
        updatedWeather = this.weatherModel.findOneAndUpdate(filter, update).exec();
      }
    }
    return updatedWeather;
  }

  getParamField(param: string, value: number) {
    switch (param) {
      case "tasmax": return { tasmax: value };
      case "tasmin": return { tasmin: value };
      case "tas": return { tas: value };
      case "rainfall": return { rainfall: value };
      case "sun": return { sun: value };
      case "sfcWind": return { sfcWind: value };
      case "psl": return { psl: value };
      case "hurs": return { hurs: value };
      case "pv": return { pv: value };
      case "groundfrost": return { groundfrost: value };
      case "snowLying": return { snowLying: value };
    }
  }
}
