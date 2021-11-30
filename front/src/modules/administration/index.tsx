import React, {useState} from "react";
import {
	CardActions,
	Button,
	Card,
	CardContent,
	Typography,
	Grid,
	MenuItem,
	Select,
	SelectChangeEvent, FormControl, Alert, IconButton, Collapse
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const AdministrationPage = ({weatherStore}) => {
	const [period, setPeriod] = useState('');
	const [open, setOpen] = useState(false);
	const [label, setLabel] = useState('');
	const [selectedFile, setSelectedFile] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setPeriod(event.target.value);
	};

	const handleInputChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmit = () => {
		const data = new FormData();
		data.append('file', selectedFile);

		if(period === 'region'){
			weatherStore.importRegionsData(data).then(() => {
				setLabel('Файл загрузился');
				setOpen(true);
			});
		}else if(period === 'daily' || period === 'monthly' || period === 'seasonly' || period === 'annual'){
			weatherStore.importWeatherData(period, data).then(()=>{
				setLabel('Файл загрузился');
				setOpen(true);
			});
		}
	};

	const handleExport = () => {
		setLabel('Файл скачивается');
		setOpen(true);
		weatherStore.exportData();
	};

	return (
		<>
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit"/>
						</IconButton>
					}
					sx={{mb: 2}}
				>
					{label}
				</Alert>
			</Collapse>
			<Grid container
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={8}
						style={{marginTop: 100}}
			>
				<Grid item>
					<Card sx={{minWidth: 300, minHeight: 200}} style={{textAlign: 'center'}}>
						<CardContent>
							<Typography variant="h6">
								Скачать базу данных
							</Typography>
						</CardContent>
						<CardActions style={{display: "flex", justifyContent: 'center'}}>
							<Button variant="contained" onClick={handleExport}>Скачать</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item>
					<Card sx={{minWidth: 300, minHeight: 200}} style={{textAlign: 'center'}}>
						<CardContent>
							<Typography variant="h6">
								Загрузить базу данных
							</Typography>
							<Typography variant="body1">
								Формат файла .json
							</Typography>
							<input
								accept="application/JSON"
								type="file"
								style={{marginTop: 10}}
								onChange={handleInputChange}
							/>
							<div style={{marginTop: 10}}>
								<FormControl variant="standard" sx={{minWidth: 200}}>
									<Select
										labelId="demo-simple-select-standard-label"
										id="demo-simple-select-standard"
										value={period}
										onChange={handleChange}
										label="Данные"
									>
										<MenuItem key="1" value="daily">Данные по дням</MenuItem>
										<MenuItem key="2" value="monthly">Данные по месяцам</MenuItem>
										<MenuItem key="3" value="seasonly">Данные по сезонам</MenuItem>
										<MenuItem key="4" value="annual">Данные по годам</MenuItem>
										<MenuItem key="4" value="region">Данные регионов</MenuItem>
									</Select>
								</FormControl>
							</div>
						</CardContent>
						<CardActions style={{display: "flex", justifyContent: 'center', marginBottom: 10}}>
							<Button variant="contained" onClick={handleSubmit}>Загрузить</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default AdministrationPage;
