import {action, makeAutoObservable} from "mobx"
import {Region, Statistic, TimeIntervalType} from "../../services/model";
import axios from "axios";
import {EXPORT_URL, GET_REGIONS_URL, GET_STATS_URL, IMPORT_REGIONS_URL, IMPORT_URL} from "../../services/urls";

class WeatherStore {
	regions: Region;
	region: Region = {name: '', region: 0};
	timeInterval: TimeIntervalType = TimeIntervalType.daily;
	from: Date = new Date();
	to: Date = new Date();
	fromSeason: string = '';
	toSeason: string = '';
	stats: Statistic[];
	statsForChart: Statistic[];
	table: string = '1';
	observation: string = 'tasmax';

	constructor() {
		makeAutoObservable(this);
		this.setRegion = this.setRegion.bind(this);
		this.setTimeInterval = this.setTimeInterval.bind(this);
		this.setFrom = this.setFrom.bind(this);
		this.setTo = this.setTo.bind(this);
		this.setFromSeason = this.setFromSeason.bind(this);
		this.setToSeason = this.setToSeason.bind(this);
		this.setTable = this.setTable.bind(this);
		this.getFilteredData = this.getFilteredData.bind(this);
		this.setObservation = this.setObservation.bind(this);
	}

	async getRegions() {
		const res = await axios.get(`${GET_REGIONS_URL}`);
		this.regions = res.data;
	}

	getStatsCommon() {
		let data = {};
		if (this.timeInterval === TimeIntervalType.daily) {
			data = {
				"region": this.region.region,
				"fromYear": this.from.getFullYear(),
				"toYear": this.to.getFullYear(),
				"fromDay": this.from.getDate(),
				"toDay": this.to.getDate(),
				"fromMonth": this.from.getMonth() + 1,
				"toMonth": this.to.getMonth() + 1
			};
		} else if (this.timeInterval === TimeIntervalType.monthly) {
			data = {
				"region": this.region.region,
				"fromYear": this.from.getFullYear(),
				"toYear": this.to.getFullYear(),
				"fromMonth": this.from.getMonth() + 1,
				"toMonth": this.to.getMonth() + 1
			};
		} else if (this.timeInterval === TimeIntervalType.seasonly) {
			data = {
				"region": this.region.region,
				"fromYear": this.from.getFullYear(),
				"toYear": this.to.getFullYear(),
				"fromSeason": parseInt(this.fromSeason),
				"toSeason": parseInt(this.toSeason)
			};
		} else if (this.timeInterval === TimeIntervalType.annual) {
			data = {
				"region": this.region.region,
				"fromYear": this.from.getFullYear(),
				"toYear": this.to.getFullYear(),
			};
		}
		return data;
	}

	async getFilteredData(filter) {
		const period = Object.keys(TimeIntervalType)[Object.values(TimeIntervalType).indexOf(this.timeInterval)];
		const data = this.getStatsCommon();

		if (Object.keys(filter).length !== 0) {
			const filteredData = {
				...data,
				...filter
			};
			const res = await axios.post(`${GET_STATS_URL}/${period}`, filteredData);
			this.stats = res.data;
		}
	}


	async getStats() {
		const period = Object.keys(TimeIntervalType)[Object.values(TimeIntervalType).indexOf(this.timeInterval)];
		const data = this.getStatsCommon();
		const res = await axios.post(`${GET_STATS_URL}/${period}?skip=0&limit=10`, data);
		this.stats = res.data;
	}

	async getStatsForChart() {
		const period = Object.keys(TimeIntervalType)[Object.values(TimeIntervalType).indexOf(this.timeInterval)];
		const data = this.getStatsCommon();
		const res = await axios.post(`${GET_STATS_URL}/${period}?param=${this.observation}`, data);
		this.statsForChart = res.data;
	}

	async exportData(){
		axios({
			url: `${EXPORT_URL}`,
			method: 'GET',
			responseType: 'blob',
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'export.txt');
			document.body.appendChild(link);
			link.click();
		});
	}

	async importWeatherData(period: string, data: FormData){
		await axios.put(`${IMPORT_URL}/${period}`, data, {
				headers: {
					'Content-Type': 'application/JSON'
				}
			}
		);
	}

	async importRegionsData(data: FormData){
		await axios.put(`${IMPORT_REGIONS_URL}`, data, {
				headers: {
					'Content-Type': 'application/JSON'
				}
			}
		);
	}

	@action
	setRegion(region: Region) {
		this.region = region;
	}

	@action
	setObservation(observation: string) {
		this.observation = observation;
	}

	@action
	setTable(table: string) {
		this.table = table;
	}

	@action
	setTimeInterval(timeInterval: TimeIntervalType) {
		this.timeInterval = timeInterval;
	}

	@action
	setFrom(from: Date) {
		this.from = from;
	}

	@action
	setTo(to: Date) {
		this.to = to;
	}

	@action
	setFromSeason(fromSeason: string) {
		this.fromSeason = fromSeason;
	}

	@action
	setToSeason(toSeason: string) {
		this.toSeason = toSeason;
	}
}

export default WeatherStore;
