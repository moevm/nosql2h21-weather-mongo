import React, {useEffect, useState} from "react";
import RegionList from "./components/regionList";
import {Card, CardContent, CardActions, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import TimeInterval from "../general/components/timeInterval";
import TimePeriod from "../general/components/timePeriod";
import {Space} from "../general/components/Space";
import {observer} from "mobx-react";

const MainPage = ({weatherStore}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(false)
		weatherStore.getRegions().then(() => setIsLoading(true));
	}, [weatherStore]);

	const handleSubmit = () => {
		weatherStore.getStats().then(() => navigate('/stats'));
	};

	if (!isLoading) {
		return (
			<p>...Loading</p>
		)
	} else {
		return (
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Card sx={{maxWidth: 500}} style={{marginTop: 100}}>
					<CardContent>
						<RegionList setRegion={weatherStore.setRegion} region={weatherStore.region} regions={weatherStore.regions}/>
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
					</CardContent>
					<CardActions style={{display: "flex", justifyContent: 'flex-end'}}>
						<Button variant="contained" onClick={handleSubmit} style={{marginBottom: 10}}>Подробная
							статистика</Button>
					</CardActions>
				</Card>
			</Grid>
		);
	}
};

export default observer(MainPage);
