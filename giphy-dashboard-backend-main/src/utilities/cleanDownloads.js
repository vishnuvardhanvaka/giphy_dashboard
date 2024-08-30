const fs = require('fs');

module.exports = path => {
	if (fs.existsSync(path)) fs.rmSync(path, { force: true, recursive: true });
	fs.mkdirSync(path, { recursive: true });
};
