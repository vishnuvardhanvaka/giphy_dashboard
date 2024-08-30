const parseCSV = require('./parseCSV');
const combineCSVs = require('./combineCSVs');

module.exports = async (engagesPath, viewsPath) => {
	return combineCSVs(await parseCSV(engagesPath), await parseCSV(viewsPath));
};
