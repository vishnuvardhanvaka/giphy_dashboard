const fs = require('fs');
const login = require('./login');
const db = require('@/prisma/db');
const getDriver = require('./getDriver');
const { decrypt } = require('./passwords');
const downloadCSVs = require('./downloadCSVs');
const { path } = require('@/configs/automation');
const updateCsvToDB = require('./updateCsvToDB');
const cleanDownloads = require('./cleanDownloads');
const parseNcombineCSVs = require('./parseNcombineCSVs');

module.exports.syncAllGiphy = async () => {
	const users = await db.user.findMany();
	let count = 0;
	for (const user of users) {
		if (!user.activeAccount) {
			continue
		}
		await db.user.update({
			where: { id: user.id },
			data: {
				syncingData: true
			},
		})
		count++;
		try {
			const driver = await getDriver(path(user.email));
			try {
				await login(driver, user.email, decrypt(user.password));
				cleanDownloads(path(user.email));
				await downloadCSVs(driver, path(user.email));
				let viewsPath;
				let engagesPath;
				for (const file of await fs.promises.readdir(path(user.email))) {
					if (file.includes('view_count')) viewsPath = path(user.email, file);
					else engagesPath = path(user.email, file);
				}
				const csvData = await parseNcombineCSVs(engagesPath, viewsPath);
				await updateCsvToDB(user.id, csvData);
				console.log(`${count} of ${users.length} Users [${user.email}] Data Synced`.yellow);
			} catch (error) {
				console.log(error.message);
			} finally {
				await driver.close();
			}
		} catch (error) {
			console.log(error.message);
		}
		await db.user.update({
			where: { id: user.id },
			data: {
				syncingData: false
			},
		})
	}
};

module.exports.syncOneGiphy = async user => {
	try {
		await db.user.update({
			where: { id: user.id },
			data: {
				syncingData: true
			},
		})
		const driver = await getDriver(path(user.email));
		try {
			await login(driver, user.email, decrypt(user.password));
			cleanDownloads(path(user.email));
			await downloadCSVs(driver, path(user.email));
			let viewsPath;
			let engagesPath;
			for (const file of await fs.promises.readdir(path(user.email))) {
				if (file.includes('view_count')) viewsPath = path(user.email, file);
				else engagesPath = path(user.email, file);
			}
			const csvData = await parseNcombineCSVs(engagesPath, viewsPath);
			await updateCsvToDB(user.id, csvData);
			console.log(`Last User [${user.email}] Data Synced`.yellow);
		} catch (error) {
			console.log('error:', error.message);
		} finally {
			await driver.close();
		}
	} catch (error) {
		console.log(error.message);
	} finally {
		await db.user.update({
			where: { id: user.id },
			data: {
				syncingData: false
			},
		})
	}
};
