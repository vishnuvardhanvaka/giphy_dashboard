const cron = require('node-cron');
const { syncAllGiphy } = require('./syncGiphy');

async function runSync() {
	try {
		console.log('Giphy + Database Syncing Started'.yellow);
		await syncAllGiphy();
		console.log('Giphy + Database Syncing Finished'.yellow);
	} catch (error) {
		console.log('Error during sync:', error.message);
	}
}

module.exports = () => {
	// runSync();

	cron.schedule(
		'0 0 * * *',
		runSync,
		{ timezone: 'America/Los_Angeles' }
	);
};

