import { Region } from "../schemas/region.schemas";

export class CreateWeatherDto {
    readonly region: Region[]
}