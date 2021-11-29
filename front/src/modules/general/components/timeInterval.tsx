import React, {useEffect, useState} from "react";
import {Typography, ToggleButtonGroup, ToggleButton} from "@mui/material";
import {observer} from "mobx-react";
import {TimeIntervalType} from "../../../services/model";

interface TimeIntervalProps {
	setTimeInterval: (timeInterval: TimeIntervalType) => void;
	timeInterval: TimeIntervalType;
}

const TimeInterval = (props:  TimeIntervalProps) => {
	const {timeInterval} = props;
	const [alignment, setAlignment] = useState('');

	useEffect(() => {
		if(timeInterval === TimeIntervalType.daily){
			setAlignment('left');
		}else if(timeInterval === TimeIntervalType.monthly){
			setAlignment('center');
		}else if(timeInterval === TimeIntervalType.seasonly){
			setAlignment('right');
		}else if(timeInterval === TimeIntervalType.annual){
			setAlignment('justify');
		}
	}, [timeInterval]);

	const handleAlignment = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		if(newAlignment === 'left'){
			props.setTimeInterval(TimeIntervalType.daily);
		}else if(newAlignment === 'center'){
			props.setTimeInterval(TimeIntervalType.monthly);
		}else if(newAlignment === 'right'){
			props.setTimeInterval(TimeIntervalType.seasonly);
		}else if(newAlignment === 'justify'){
			props.setTimeInterval(TimeIntervalType.annual);
		}
		setAlignment(newAlignment);
	};


	return (
		<div>
			<Typography variant="body1" style={{marginBottom: 10}}>
				Промежуток времени*
			</Typography>
			<ToggleButtonGroup
				value={alignment}
				exclusive
				onChange={handleAlignment}
				aria-label="text alignment"
				style={{maxHeight: 50}}
			>
				<ToggleButton value="left" aria-label="left aligned">
					<p>{TimeIntervalType.daily}</p>
				</ToggleButton>
				<ToggleButton value="center" aria-label="centered">
					<p>{TimeIntervalType.monthly}</p>
				</ToggleButton>
				<ToggleButton value="right" aria-label="right aligned">
					<p>{TimeIntervalType.seasonly}</p>
				</ToggleButton>
				<ToggleButton value="justify" aria-label="justified">
					<p>{TimeIntervalType.annual}</p>
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
};

export default observer(TimeInterval);
