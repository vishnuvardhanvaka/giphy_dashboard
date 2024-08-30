const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const iv = process.env.ENCRYPT_IV;
const key = process.env.ENCRYPT_KEY;

module.exports.encrypt = password => {
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let crypted = cipher.update(password, 'utf8');
	return Buffer.concat([crypted, cipher.final()]).toString('hex');
};

module.exports.decrypt = password => {
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(password, 'hex');
	return Buffer.concat([decrypted, decipher.final()]).toString('utf8');
};
