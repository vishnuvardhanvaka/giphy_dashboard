const fs = require('fs');
const { parse } = require('papaparse');

module.exports = async file =>
	new Promise(async (resolve, reject) => {
		parse(fs.readFileSync(file).toString('utf8'), {
			header: true,
			encoding: 'utf8',
			skipEmptyLines: true,
			error: error => reject(error),
			complete: result => resolve(result.data),
		});
	});
