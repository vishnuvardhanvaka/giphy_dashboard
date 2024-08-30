import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	gifCharts: {
		chart: [],
		table: [],
	},
	topGifs: {
		table: [],
	},
};

const csv = createSlice({
	name: 'csv',
	initialState,
	reducers: {
		setGifChartsChart: (state, action) => {
			state.gifCharts.chart = action.payload;
		},
		setGifChartsTable: (state, action) => {
			state.gifCharts.table = action.payload;
		},
		setTopGifsTable: (state, action) => {
			state.topGifs.table = action.payload;
		},
	},
});

export default csv.reducer;
export const { setGifChartsChart, setGifChartsTable, setTopGifsTable } = csv.actions;
