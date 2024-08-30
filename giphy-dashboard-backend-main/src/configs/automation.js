const { resolve } = require('path');

module.exports = {
	timeout: 10000,
	path: (...paths) => resolve(__dirname, '../../downloads', ...paths),
};
