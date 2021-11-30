import { ParamDto } from "./param.dto"

export class ReqParamsDto {
  region: ParamDto;
  fromDay: number;
  fromMonth: number;
  fromSeason: number;
  fromYear: number;
  toDay: number;
  toMonth: number;
  toSeason: number;
  toYear: number;
  year: ParamDto;
  month: ParamDto;
  day: ParamDto;
  season: ParamDto;
  tasmax: ParamDto;
  tasmin: ParamDto;
  tas: ParamDto;
  rainfall: ParamDto;
  sun: ParamDto;
  sfcWind: ParamDto
  psl: ParamDto;
  hurs: ParamDto;
  pv: ParamDto;
  groundfrost: ParamDto;
  snowLying: ParamDto;
}
