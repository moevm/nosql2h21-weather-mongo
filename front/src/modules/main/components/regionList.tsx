import React from "react";
import {Typography, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent} from "@mui/material";
import {observer} from "mobx-react";

const RegionList = ({setRegion, region, regions}) => {

	const handleChange = (event: SelectChangeEvent) => {
		setRegion(event.target.value);
	};

	return (
		<div>
			<Typography variant="body1">
				Регион*
			</Typography>
			<FormControl variant="standard" sx={{minWidth: 250}}>
				<InputLabel id="demo-simple-select-standard-label">Регион</InputLabel>
				<Select
					labelId="demo-simple-select-standard-label"
					id="demo-simple-select-standard"
					value={region}
					onChange={handleChange}
					label="Регион"
				>
					{
						regions.map((reg) => <MenuItem key={reg.region} value={reg}>{reg.name}</MenuItem>)
					}
				</Select>
			</FormControl>
		</div>
	);
};

export default observer(RegionList);
