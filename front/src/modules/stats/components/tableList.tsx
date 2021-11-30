import React from "react";
import {Typography, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent} from "@mui/material";
import {observer} from "mobx-react";

const TableList = ({weatherStore, table, setTable}) => {
	const handleChange = (event: SelectChangeEvent) => {
		weatherStore.getStats().then(() => {
			setTable(event.target.value);
		})
	};

	return (
		<div>
			<Typography variant="body1">
				<p>
					№1 – Минимальная температура, максимальная температура, осадки
				</p>
				<p>
					№2 – Cредняя температура, солнечноe сияниe, скорость ветра, давление на уровне моря
				</p>
				<p>
					№3 – Влажность воздуха, давление пара, мин. температура травы меньше 0 °C,
					больше 50% земли покрыто снегом
				</p>
			</Typography>
			<FormControl variant="standard" sx={{minWidth: 250}}>
				<InputLabel id="demo-simple-select-standard-label">Таблицы</InputLabel>
				<Select
					labelId="demo-simple-select-standard-label"
					id="demo-simple-select-standard"
					value={table}
					onChange={handleChange}
					label="Таблицы"
				>
					<MenuItem key="1" value="1">№1</MenuItem>
					<MenuItem key="2" value="2">№2</MenuItem>
					<MenuItem key="3" value="3">№3</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default observer(TableList);
