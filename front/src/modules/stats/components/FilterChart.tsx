import React, {useState} from "react";
import {FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup} from "@mui/material";
import {observer} from "mobx-react";


const FilterChart =  ({setObservation}) => {
	const [selectedValue, setSelectedValue] = useState("tasmax");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
		setObservation(event.target.value);
	};

	return (
		<Paper>
			<FormControl component="fieldset">
				<FormLabel component="legend" style={{marginLeft: 10, marginTop: 10}}>Погодное наблюдение</FormLabel>
				<RadioGroup
					aria-label="weather"
					defaultValue={selectedValue}
					name="radio-buttons-group"
					style={{marginLeft: 10}}
				>
					<FormControlLabel value="tasmax" control={<Radio onChange={handleChange}/>} label="Макс. температура, °C" />
					<FormControlLabel value="tasmin" control={<Radio onChange={handleChange}/>} label="Мин. температура, °C" />
					<FormControlLabel value="tas" control={<Radio onChange={handleChange}/>} label="Cр. температура, °C" />
					<FormControlLabel value="groundfrost" control={<Radio onChange={handleChange}/>} label="Мин. температура травы < 0 °C, дни" />
					<FormControlLabel value="snowLying" control={<Radio onChange={handleChange}/>} label="> 50% земли покрыто снегом, дни" />
					<FormControlLabel value="hurs" control={<Radio onChange={handleChange}/>} label="Влажность воздуха, %" />
					<FormControlLabel value="psl" control={<Radio onChange={handleChange}/>} label="Давление на уровне моря, hPa" />
					<FormControlLabel value="pv" control={<Radio onChange={handleChange}/>} label="Давление пара, hPa" />
					<FormControlLabel value="sun" control={<Radio onChange={handleChange}/>} label="Cолнечноe сияниe, часы" />
					<FormControlLabel value="rainfall" control={<Radio onChange={handleChange}/>} label="Осадки, мм" />
					<FormControlLabel value="sfcWind" control={<Radio onChange={handleChange}/>} label="Cкорость ветра, узлы" />
				</RadioGroup>
			</FormControl>
		</Paper>
	)
};

export default observer(FilterChart);
