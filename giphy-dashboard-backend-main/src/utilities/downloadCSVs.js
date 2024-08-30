const fs = require('fs');
const { until, By } = require('selenium-webdriver');
const { timeout } = require('@/configs/automation');

module.exports = async (driver, path) => {
	const csvBtn = await driver.wait(until.elementLocated(By.css('button[class*=CsvButton]')), timeout);
	await driver.wait(until.elementIsVisible(csvBtn), timeout);
	await csvBtn.click();

	const viewsBtn = await driver.wait(
		until.elementLocated(By.xpath("//button[contains(span, 'View Count CSV')]")),
		timeout
	);
	await driver.wait(until.elementIsVisible(viewsBtn), timeout);
	await viewsBtn.click();

	const engagesBtn = await driver.wait(
		until.elementLocated(By.xpath("//button[contains(span, 'Engagement Rate CSV')]")),
		timeout
	);
	await driver.wait(until.elementIsVisible(engagesBtn), timeout);
	await engagesBtn.click();

	await driver.wait(async () => {
		const files = await fs.promises.readdir(path);
		return files.length >= 2;
	}, timeout);
};
