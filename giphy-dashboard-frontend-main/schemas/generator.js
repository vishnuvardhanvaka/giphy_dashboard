import fs from 'fs';
import path from 'path';

const _ITEMS = 1;
const _DATES = 1;
const _TAB = 3;
const _MAXRATE = 100;
const _MAXVIEW = 20_000_000;

const _TAGS = [
	'savetheworld',
	'shelterhumanity',
	'cryptotrading',
	'sheltercoins',
	'sheltercrypto',
	'shelternft',
	'shelter',
	'humanity',
];

function getDate(index) {
	const date = new Date();
	const newDate = new Date(date);
	newDate.setDate(date.getDate() - index);
	const day = newDate.toLocaleDateString('en-US', { day: '2-digit' });
	const month = newDate.toLocaleDateString('en-US', { month: '2-digit' });
	const year = newDate.getFullYear();
	return `${year}-${month}-${day}`;
}

function getRand(limit) {
	return Math.floor(Math.random() * (limit + 1));
}

function writeExpandData(items, dates) {
	const engages = {};

	_TAGS.forEach(tag => {
		engages[tag] = [...Array(dates)]
			.map((dv, di) => ({
				date: getDate(di),
				value: getRand(_MAXRATE),
			}))
			.reverse();
	});

	const data = [...Array(items)].map((iv, ii) => ({
		id: `3WIZ165aIYNZ8yre${ii + 1}`,
		type: 'GIF',
		url: `https://giphy.com/gifs/3WIZ165aIYNZ8yre${ii + 1}`,
		views: [...Array(dates)]
			.map((dv, di) => ({
				date: getDate(di),
				value: getRand(_MAXVIEW),
			}))
			.reverse(),
		engages,
	}));

	fs.writeFile(path.resolve('./expand.json'), JSON.stringify(data, null, _TAB), () => {
		console.log('expand.json - Done!');
	});
}

function writeCompactData(items, dates) {
	const data = [...Array(items)].map((iv, ii) => ({
		id: `3WIZ165aIYNZ8yre${ii + 1}`,
		type: 'GIF',
		url: `https://giphy.com/gifs/3WIZ165aIYNZ8yre${ii + 1}`,
		stats: [...Array(dates)]
			.map((dv, di) => ({
				date: getDate(di),
				views: getRand(_MAXVIEW),
				engages: _TAGS.map(tag => ({ tag, rate: getRand(_MAXRATE) })),
			}))
			.reverse(),
	}));

	fs.writeFile(path.resolve('./compact.json'), JSON.stringify(data, null, _TAB), () => {
		console.log('compact.json - Done!');
	});
}

writeExpandData(_ITEMS, _DATES);
writeCompactData(_ITEMS, _DATES);
