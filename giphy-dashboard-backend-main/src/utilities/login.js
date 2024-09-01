const { By, until } = require('selenium-webdriver');
const { timeout } = require('@/configs/automation');

module.exports = async (driver, email, pass, signUp = false) => {
	await driver.get('https://giphy.com/dashboard');
	await driver.findElement(By.css('input[type="email"]')).sendKeys(email);
	await driver.findElement(By.css('input[type="password"]')).sendKeys(pass);
	await driver.findElement(By.css('button[type="submit"]')).click();
	let foundModel=true;
	try {
		const modal = await driver.wait(
			until.elementLocated(By.css('div[class*=ModalWindow] div[class*=CloseButton]')),
			timeout
		);
		await driver.wait(until.elementIsVisible(modal), timeout);
		await modal.click();
		console.log('Modal closed successfully.');
	} catch (error) {
		foundModel=false;
		console.log('Modal not found or failed to close, trying to click the save button.',error);

		try {
			const saveButton = await driver.wait(
				until.elementLocated(By.css('button[data-tid="user-settings__save"]')),
				timeout
			);
			await driver.wait(until.elementIsVisible(saveButton), timeout);
			await saveButton.click();
			console.log('Save button clicked successfully.');
		} catch (saveButtonError) {
			console.error('Failed to find or click the save button:', saveButtonError.message);
		}
	}

	if (signUp) {
		try {
			const containerDiv = await driver.wait(
				until.elementLocated(By.css('div.Container-sc-1b6pimp.ehJsLu')),
				timeout
			);
			const imgElement = await containerDiv.findElement(By.css('img[src*="avatars"]'));
			const imgSrc = await imgElement.getAttribute('src');
			console.log('Image src found:', imgSrc);
			return {'avatarUrl':imgSrc,'activeAccount':foundModel};
		} catch (error) {
			console.error('Failed to locate the image with avatars in the src:', error.message);
			return null;
		}
	}
};
