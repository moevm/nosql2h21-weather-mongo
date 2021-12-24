import React, {useState, useEffect} from "react";
import {Typography, MenuItem, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {observer} from "mobx-react";
import {Grid, FormControl, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {TimeIntervalType} from "../../../services/model";
import {DatePickerView} from "@mui/lab/DatePicker/shared";

interface TimePeriodProps {
	from: Date;
	to: Date;
	timeInterval: TimeIntervalType;
	setFrom: (from: Date) => void;
	setTo: (to: Date) => void;
	fromSeason: string;
	toSeason: string;
	setFromSeason: (from: string) => void;
	setToSeason: (to: string) => void;
}

const TimePeriod = (props: TimePeriodProps) => {
	const {from, to, timeInterval, fromSeason, toSeason} = props;
	const [views, setViews] = useState<DatePickerView[]>(['year', 'month', 'day']);

	useEffect(() => {
		if (timeInterval === TimeIntervalType.daily) {
			setViews(['year', 'month', 'day']);
		} else if (timeInterval === TimeIntervalType.monthly) {
			setViews(['year', 'month']);
		} else if (timeInterval === TimeIntervalType.seasonly) {
			setViews(['year']);
		} else if (timeInterval === TimeIntervalType.annual) {
			setViews(['year']);
		}
	}, [timeInterval]);


	return (
		<div>
			<Typography variant="body1" style={{marginBottom: 10}}>
				Интервал времени*
			</Typography>
			{
				timeInterval === TimeIntervalType.seasonly ?
					<Grid container spacing={4}
								style={{
									maxWidth: 500,
									marginBottom: 20
								}}>
						<Grid item md={6} xs={6} lg={6}>
							<FormControl  variant="standard" sx={{  minWidth: 100 }}>
								<InputLabel id="demo-simple-select-standard-label">От</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={fromSeason}
									onChange={(event: SelectChangeEvent) => props.setFromSeason(event.target.value)}
								>
									<MenuItem value="1">Зима</MenuItem>
									<MenuItem value="2">Весна</MenuItem>
									<MenuItem value="3">Лето</MenuItem>
									<MenuItem value="4">Осень</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid item md={6} xs={6} lg={6}>
							<FormControl  variant="standard" sx={{  minWidth: 100 }}>
								<InputLabel id="demo-simple-select-standard-label">До</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={toSeason}
									onChange={(event: SelectChangeEvent) => props.setToSeason(event.target.value)}
								>
									<MenuItem value="1">Зима</MenuItem>
									<MenuItem value="2">Весна</MenuItem>
									<MenuItem value="3">Лето</MenuItem>
									<MenuItem value="4">Осень</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					:
					null
			}
			<Grid container spacing={4}
						style={{
							maxWidth: 500
						}}>
				<Grid item md={6} xs={6} lg={6}>
					<FormControl>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								views={views}
								label="От"
								value={from}
								onChange={(value) => {
									props.setFrom(value);
									console.log(value)
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</FormControl>
				</Grid>

				<Grid item md={6} xs={6} lg={6}>
					<FormControl>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								views={views}
								label="До"
								value={to}
								onChange={(value) => {
									props.setTo(value);
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	);
};

export default observer(TimePeriod);
