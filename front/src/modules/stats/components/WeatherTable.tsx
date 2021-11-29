import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {observer} from 'mobx-react';
import {Statistic, TimeIntervalType} from "../../../services/model";
import {Space} from "../../general/components/Space";


const WeatherTable = ({stats, timeInterval, table}) => {

	const getSeason = (season: number) => {
		if (season === 1) {
			return 'Зима'
		} else if (season === 2) {
			return 'Весна'
		} else if (season === 3) {
			return 'Лето'
		} else if (season === 4) {
			return 'Осень'
		}
	};

	const getDate = (stat: Statistic) => {
		if (timeInterval === TimeIntervalType.daily) {
			return `${stat.day}.${stat.month}.${stat.year}`;
		} else if (timeInterval === TimeIntervalType.monthly) {
			return `${stat.month}.${stat.year}`;
		} else if (timeInterval === TimeIntervalType.seasonly) {
			const season = getSeason(stat.season);
			return `${season} ${stat.year}`;
		} else if (timeInterval === TimeIntervalType.annual) {
			return `${stat.year}`;
		}
	};

	return (
		<>
			{table === '1' &&
			<TableContainer component={Paper} style={{maxWidth: 700}}>
				<Table sx={{minWidth: 650}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Дата</TableCell>
							<TableCell>Минимальная температура, °C</TableCell>
							<TableCell>Максимальная температура, °C</TableCell>
							<TableCell>Осадки, мм</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{stats.map((stat) => (
							<TableRow
								key={stat.tasmin}
							>
								<TableCell>
									{getDate(stat)}
								</TableCell>
								<TableCell>
									{stat.tasmax}
								</TableCell>
								<TableCell>{stat.tasmin}</TableCell>
								<TableCell>{stat.rainfall}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			}
			{table === '1' && <Space size={10}/>}

			{
				timeInterval === TimeIntervalType.monthly || timeInterval === TimeIntervalType.seasonly || timeInterval === TimeIntervalType.annual ?
					<>
						{table === '2' &&
						<TableContainer component={Paper} style={{maxWidth: 700}}>
							<Table sx={{minWidth: 650}} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Дата</TableCell>
										<TableCell>Cредняя температура, °C</TableCell>
										<TableCell>Cолнечноe сияниe, часы</TableCell>
										<TableCell>Cкорость ветра, узлы</TableCell>
										<TableCell>Давление на уровне моря, hPa</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{stats.map((stat) => (
										<TableRow
											key={stat.tas}
										>
											<TableCell>
												{getDate(stat)}
											</TableCell>
											<TableCell>
												{stat.tas}
											</TableCell>
											<TableCell>{stat.sun}</TableCell>
											<TableCell>{stat.sfcWind}</TableCell>
											<TableCell>{stat.psl}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>}
						{table === '2' && <Space size={10}/>}
						{table === '3' &&

						<TableContainer component={Paper} style={{maxWidth: 700}}>
							<Table sx={{minWidth: 650}} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Дата</TableCell>
										<TableCell>Влажность воздуха, %</TableCell>
										<TableCell>Давление пара, hPa</TableCell>
										<TableCell>Мин. температура травы меньше 0 °C, дни</TableCell>
										<TableCell>Больше 50% земли покрыто снегом, дни</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{stats.map((stat) => (
										<TableRow
											key={stat.hurs}
										>
											<TableCell>
												{getDate(stat)}
											</TableCell>
											<TableCell>
												{stat.hurs}
											</TableCell>
											<TableCell>
												{stat.pv}
											</TableCell>
											<TableCell>{stat.groundfrost}</TableCell>
											<TableCell>{stat.snowLying}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>}
						<Space size={10}/>
					</>
					: <p>Погодных наблюдений(№2 и №3) за данный промежуток времени не существует.</p>
			}

		</>
	);
}

export default observer(WeatherTable);
