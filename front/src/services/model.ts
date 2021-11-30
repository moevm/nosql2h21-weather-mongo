export enum TimeIntervalType {
	daily = 'По дням',
	monthly = 'По месяцам',
	seasonly = 'По сезонам',
	annual = 'По годам',
}

export interface Region {
	region: number;
	name: string;
}

export interface Statistic {
	year: number;
	month?: number;
	day?: number;
	season?: number;
	tasmax?: number;
	tasmin?: number;
	rainfall?: number;

	tas?: number;
	sun?: number;
	sfcWind?: number;
	psl?: number;

	hurs?: number;
	pv?: number;
	groundfrost?: number;
	snowLying?: number;
}
