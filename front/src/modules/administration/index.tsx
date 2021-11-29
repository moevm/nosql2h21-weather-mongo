import React from "react";
import {CardActions, Button, Card, CardContent, Typography, Grid} from "@mui/material";

const AdministrationPage = ({weatherStore}) => {
	return (
		<Grid container
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={8}
					style={{marginTop: 100}}
		>
			<Grid item>
				<Card sx={{ minWidth: 300, minHeight: 200}} style={{textAlign: 'center'}}>
					<CardContent>
						<Typography variant="h6">
							Скачать базу данных
						</Typography>
					</CardContent>
					<CardActions style={{display: "flex", justifyContent: 'center'}}>
						<Button variant="contained" onClick={() => {
						}}>Скачать</Button>
					</CardActions>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={{ minWidth: 300,  minHeight: 200 }} style={{textAlign: 'center'}}>
					<CardContent>
						<Typography variant="h6">
							Загрузить базу данных
						</Typography>
						<input
							accept="application/JSON"
							type="file"
							style={{marginTop: 20}}
						/>

					</CardContent>
					<CardActions style={{display: "flex", justifyContent: 'center'}}>
						<Button variant="contained" onClick={() => {
						}}>Загрузить</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
};

export default AdministrationPage;
