import React, {useEffect, useState} from "react";
import {ArgumentAxis, Chart, LineSeries, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {Paper} from "@mui/material";
import {TimeIntervalType} from "../../../services/model";
import {observer} from "mobx-react";


let data = [];
const WeatherChart =  ({weatherStore}) => {
	const [isData, setIsData] = useState(false);
	const madeSeason = (season: number) => {
		if(season === 1){
			return "Зима";
		}if(season === 2){
			return "Весна";
		}if(season === 3){
			return "Лето";
		}if(season === 4){
			return "Осень";
		}
	};
	useEffect(()=>{
		data = [];
		weatherStore.getStatsForChart().then(() => {
			if(weatherStore.statsForChart[0] && weatherStore.observation in weatherStore.statsForChart[0]){
				setIsData(true);
				if(weatherStore.timeInterval === TimeIntervalType.annual){
					weatherStore.statsForChart.map((statsForChart) => {
						data.push({
							argument: `${statsForChart.year}`,
							lineValue: statsForChart[weatherStore.observation]
						})
					})
				}else if(weatherStore.timeInterval === TimeIntervalType.seasonly){
					weatherStore.statsForChart.map((statsForChart) => {
						const season = madeSeason(statsForChart.season);
						data.push({
							argument: season +'\n'+ statsForChart.year,
							lineValue: statsForChart[weatherStore.observation]
						})
					})
				}else if(weatherStore.timeInterval === TimeIntervalType.monthly){
					weatherStore.statsForChart.map((statsForChart) => {
						data.push({
							argument: `${statsForChart.month}.${statsForChart.year}`,
							lineValue: statsForChart[weatherStore.observation]
						})
					})
				}else if(weatherStore.timeInterval === TimeIntervalType.daily){
					weatherStore.statsForChart.map((statsForChart) => {
						data.push({
							argument: `${statsForChart.day}.${statsForChart.month}.${statsForChart.year}`,
							lineValue: statsForChart[weatherStore.observation]
						})
					})
				}
				console.log(data)
			}else{
				setIsData(false);
			}
		})
	}, [weatherStore.observation, weatherStore.statsForChart]);

	if(isData){
		return (
			<Paper>
				<Chart
					data={data}
				>
					<ArgumentAxis/>
					<ValueAxis/>

					<LineSeries name="line"
											valueField="lineValue"
											argumentField="argument"/>
				</Chart>
			</Paper>
		)
	}else{
		return <p>Данных заданного погодного наблюдения нет</p>
	}
};

export default observer(WeatherChart);
