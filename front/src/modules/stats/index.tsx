import React from "react";
import TimePeriod from "../general/components/timePeriod";
import TimeInterval from "../general/components/timeInterval";
import WeatherTable from "./components/WeatherTable";
import FilterTable from "./components/FilterTable";
import {Grid, Typography} from "@mui/material";
import {Space} from "../general/components/Space";
import {observer} from "mobx-react";
import TableList from "./components/tableList";

const StatsPage = ({weatherStore}) => {
	return (
		<Grid
			container
			direction="column"
			alignItems="flex-start"
			style={{maxWidth: 800, marginLeft: 100}}
		>
			<Space size={5}/>
			<Typography variant="h6">
				Статистика погодных наблюдений в {weatherStore.region?.name}
			</Typography>
			<Space size={5}/>
			<TimeInterval setTimeInterval={weatherStore.setTimeInterval} timeInterval={weatherStore.timeInterval}/>
			<Space size={5}/>
			<TimePeriod
				from={weatherStore.from}
				to={weatherStore.to}
				timeInterval={weatherStore.timeInterval}
				setFrom={weatherStore.setFrom}
				setTo={weatherStore.setTo}
				fromSeason={weatherStore.fromSeason}
				toSeason={weatherStore.toSeason}
				setFromSeason={weatherStore.setFromSeason}
				setToSeason={weatherStore.setToSeason}
			/>
			<Space size={5}/>
			<TableList weatherStore = {weatherStore} table={weatherStore.table} setTable={weatherStore.setTable}/>
			<Space size={5}/>
			<FilterTable weatherStore={weatherStore} table={weatherStore.table} getStats={weatherStore.getStats} getFilteredData={weatherStore.getFilteredData}/>
			<Space size={5}/>
			<WeatherTable stats = {weatherStore.stats} timeInterval = {weatherStore.timeInterval} table={weatherStore.table}/>
		</Grid>
	);
};

export default  observer(StatsPage);
