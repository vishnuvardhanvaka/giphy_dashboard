require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const { Builder, Capabilities } = require('selenium-webdriver');

module.exports = async path => {
	const chromeOptions = new chrome.Options();

	chromeOptions.addArguments('--headless');
	chromeOptions.addArguments('--start-maximized');
	// chromeOptions.setChromeBinaryPath('/snap/bin/chromium');
	// chromeOptions.setChromeBinaryPath('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');

	chromeOptions.windowSize({ height: 1080, width: 1920 });

	chromeOptions.setUserPreferences({
		'download.default_directory': path,
		'download.prompt_for_download': false,
		'profile.default_content_setting_values.automatic_downloads': 1,
	});

	return await new Builder()
		.forBrowser('chrome')
		.withCapabilities(Capabilities.chrome())
		.setChromeOptions(chromeOptions)
		.build();
};
