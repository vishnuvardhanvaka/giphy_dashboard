const fs = require('fs');
const { until, By } = require('selenium-webdriver');
const path = require('path');
// const { timeout } = require('@/configs/automation');
// const timeout=20000

module.exports = async (driver, downloadPath) => {
	try {
		// Get the list of files in the directory before starting the download
		const initialFiles = await fs.promises.readdir(downloadPath);

		// Locate and click the CSV buttons
		const csvBtn = await driver.wait(until.elementLocated(By.css('button[class*=CsvButton]')));
		await driver.wait(until.elementIsVisible(csvBtn));
		await csvBtn.click();

		const viewsBtn = await driver.wait(
			until.elementLocated(By.xpath("//button[contains(span, 'View Count CSV')]"))
		);
		await driver.wait(until.elementIsVisible(viewsBtn));
		await viewsBtn.click();

		const engagesBtn = await driver.wait(
			until.elementLocated(By.xpath("//button[contains(span, 'Engagement Rate CSV')]")),
		);
		await driver.wait(until.elementIsVisible(engagesBtn));
		await engagesBtn.click();

		// Wait until the new files are downloaded (no time restriction)
		await new Promise((resolve, reject) => {
			const interval = setInterval(async () => {
				const currentFiles = await fs.promises.readdir(downloadPath);
				const newFiles = currentFiles.filter(file => !initialFiles.includes(file));
				if (newFiles.length >= 2) {
					clearInterval(interval);
					resolve();
				}
			}, 1000); // Check every second

			// If you want to add an optional max timeout (like 30 minutes), you can include this:
			// setTimeout(() => {
			//     clearInterval(interval);
			//     reject(new Error("File download timed out"));
			// }, 30 * 60 * 1000);
		});

		console.log("CSV files downloaded successfully.");
	} catch (error) {
		console.error("An error occurred:", error);
		throw error;
	}
};