import { parse } from 'papaparse';

export default async function parseCSV(url, setter) {
	parse(url, {
		download: true,
		header: true,
		skipEmptyLines: true,
		error: error => {
			console.log(error);
		},
		complete: result => {
			setter(result.data);
		},
	});
}
