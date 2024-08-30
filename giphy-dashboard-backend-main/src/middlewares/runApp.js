const runScheduleSync = require('@/utilities/runScheduleSync');

module.exports = port => () => {
	console.log(`App is running on port: ${port}`.blue.bold);
	runScheduleSync();
};
