import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';
import {Space} from "../../general/components/Space";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";

const FilterTable = ({weatherStore, table, getFilteredData, getStats}) => {
	const [open, setOpen] = useState(false);
	const [title1, setTitle1] = useState('');
	const [title2, setTitle2] = useState('');
	const [title3, setTitle3] = useState('');
	const [title4, setTitle4] = useState('');

	const [from1, setFrom1] = useState('');
	const [from2, setFrom2] = useState('');
	const [from3, setFrom3] = useState('');
	const [from4, setFrom4] = useState('');

	const [to1, setTo1] = useState('');
	const [to2, setTo2] = useState('');
	const [to3, setTo3] = useState('');
	const [to4, setTo4] = useState('');

	useEffect( () => {
		if (table === '1') {
			setTitle1('Минимальная температура, °C');
			setTitle2('Максимальная температура, °C');
			setTitle3('Осадки, мм');
		} else if (table === '2') {
			setTitle1('Cредняя температура, °C');
			setTitle2('Cолнечноe сияниe, часы');
			setTitle3('Cкорость ветра, узлы');
			setTitle4('Давление на уровне моря, hPa');
		} else if (table === '3') {
			setTitle1('Влажность воздуха, %');
			setTitle2('Давление пара, hPa');
			setTitle3('Мин. температура травы меньше 0 °C, дни');
			setTitle4('Больше 50% земли покрыто снегом, дни');
		}
	}, [table]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const clear = () => {
		setFrom1('');
		setFrom2('');
		setFrom3('');
		setFrom4('');
		setTo1('');
		setTo2('');
		setTo3('');
		setTo4('');
	};

	const handleClose = () => {
		weatherStore.getStats().then(() => setOpen(false));
		clear()
	};

	const makeFilter = (from, to) => {
		if(Number(from) && Number(to)){
			return {"$gte": Number(from), "$lte": Number(to)}
		}else if(Number(from)){
			return {"$gte": Number(from) }
		}else if(Number(to)){
			return {"$lte": Number(to) }
		}else{
			return null;
		}
	};

	const handleSubmit = () => {
		let filters = {};

		const scope1 = makeFilter(from1, to1);
		const scope2 = makeFilter(from2, to2);
		const scope3 = makeFilter(from3, to3);

		if (table === '1') {
			filters = {
				'tasmin': scope1,
				'tasmax': scope2,
				'rainfall': scope3
			};

		} else if (table === '2') {
			const scope4 = makeFilter(from4, to4);
			filters = {
				'tas': scope1,
				'sun': scope2,
				'sfcWind': scope3,
				'psl': scope4
			};

		} else if (table === '3') {
			const scope4 = makeFilter(from4, to4);
			filters = {
				'hurs': scope1,
				'pv': scope2,
				'groundfrost': scope3,
				'snowLying': scope4
			};
		}

		const finalFilters = Object.keys(filters)
			.filter((k) => filters[k] != null)
			.reduce((a, k) => ({ ...a, [k]: filters[k] }), {});

		getFilteredData(finalFilters).then(() => setOpen(false));
		clear()
	};

	return (
		<div>
			<Button variant="contained" onClick={handleClickOpen}>
				Фильтр
			</Button>
			<Dialog open={open}
							onClose={handleClose}
							fullWidth={true}
							maxWidth={"sm"}
			>
				<DialogTitle>Фильтры</DialogTitle>
				<DialogContent>
					<Space size={5}/>
					<Typography variant="body1">
						{title1}
					</Typography>
					<Space size={5}/>
					<Grid container spacing={5}>
						<Grid item>
							<TextField
								id="outlined-number"
								label="От"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={from1}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFrom1(event.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								id="outlined-number"
								label="До"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={to1}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTo1(event.target.value)}
							/>
						</Grid>
					</Grid>
					<Space size={5}/>
					<Typography variant="body1">
						{title2}
					</Typography>
					<Space size={5}/>
					<Grid container spacing={5}>
						<Grid item>
							<TextField
								id="outlined-number"
								label="От"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={from2}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFrom2(event.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								id="outlined-number"
								label="До"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={to2}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTo2(event.target.value)}
							/>
						</Grid>
					</Grid>
					<Space size={5}/>
					<Typography variant="body1">
						{title3}
					</Typography>
					<Space size={5}/>
					<Grid container spacing={5}>
						<Grid item>
							<TextField
								id="outlined-number"
								label="От"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={from3}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFrom3(event.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								id="outlined-number"
								label="До"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								value={to3}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTo3(event.target.value)}
							/>
						</Grid>

						{table !== '1' &&
						<div style={{marginLeft: 40}}>
						<Space size={5}/>
							<Typography variant="body1">
								{title4}
							</Typography>
							<Space size={5}/>
							<Grid container spacing={5}>
								<Grid item>
									<TextField
										id="outlined-number"
										label="От"
										type="number"
										InputLabelProps={{
											shrink: true,
										}}
										value={from4}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFrom4(event.target.value)}
									/>
								</Grid>
								<Grid item>
									<TextField
										id="outlined-number"
										label="До"
										type="number"
										InputLabelProps={{
											shrink: true,
										}}
										value={to4}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTo4(event.target.value)}
									/>
								</Grid>
							</Grid>
						</div>
						}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} style={{color: 'black'}}>Сбросить</Button>
					<Button onClick={handleSubmit}>Сохранить</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default observer(FilterTable);
