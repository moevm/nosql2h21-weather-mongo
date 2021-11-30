export class CreateWeatherDto {
  readonly region: number
  readonly year: number
  readonly month: number
  readonly day: number
  readonly season: number
  readonly tasmax: number  
  readonly tasmin: number  
  readonly tas: number  
  readonly rainfall: number  
  readonly sun: number
  readonly sfcWind: number  
  readonly psl: number  
  readonly hurs: number  
  readonly pv: number  
  readonly groundfrost: number  
  readonly snowLying: number
}