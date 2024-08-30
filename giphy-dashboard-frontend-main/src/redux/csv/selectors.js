export function selectGifChartsTable(store) {
	return store.csv.gifCharts.table;
}

export function selectGifChartsChart(id) {
	return store => store.csv.gifCharts.chart.find(item => item.id === id);
}

export function selectTopGifsTable(store) {
	return store.csv.topGifs.table;
}

export function selectTopGifsTableById(id) {
	return store => store.csv.topGifs.table.find(item => item.id === id);
}
