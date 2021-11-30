import React from 'react';
import MainPage from "./modules/main/index";
import AdministrationPage from "./modules/administration";
import StatsPage from "./modules/stats";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Bar} from './modules/general/layout/Bar';
import './App.css';
import WeatherStore from './modules/store';

function App() {
	const weatherStore = new WeatherStore();
	return (
		<div className="App">
			<Router>
				<Bar>
					<Routes>
						<Route path="/" element={<MainPage weatherStore={weatherStore}/>}/>
						<Route path="/admin" element={<AdministrationPage weatherStore={weatherStore}/>}/>
						<Route path="/stats" element={<StatsPage weatherStore={weatherStore}/>}/>
					</Routes>
				</Bar>
			</Router>
		</div>
	)
		;
}

export default App;
