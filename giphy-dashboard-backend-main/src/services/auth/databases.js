const db = require('@/prisma/db');
const jwt = require('jsonwebtoken');
const login = require('@/utilities/login');
const getDriver = require('@/utilities/getDriver');
const { syncOneGiphy } = require('@/utilities/syncGiphy');
const { encrypt, decrypt } = require('@/utilities/passwords');

module.exports.signup = async user => {
	const driver = await getDriver();
	try {
		const prev = await db.user.findUnique({ where: { email: user.email } });
		console.log(prev,'this is the login user data')
		if (prev?.email) throw new Error('Already registered an account with this Email');
		const avatarUrl=await login(driver, user.email, user.password,signUp=true);
		console.log('login successfull')
		const { password, ...data } = await db.user.create({
			data: { ...user,image:avatarUrl, password: encrypt(user.password) },
		});
		syncOneGiphy({ ...data, password });
		console.log('syncOneGiphy is implemented...')
		return data;
	} catch (error) {
		throw new Error(error.message);
	} finally {
		await driver.close();
	}
};

module.exports.signin = async user => {
	const temp = await db.user.findUnique({ where: { email: user.email } });
	if (!temp?.email) throw new Error('No user found with this Email');
	const { password, ...data } = temp;
	if (user.password !== decrypt(password)) throw new Error("Your password didn't matched");

	return {
		...data,
		token: jwt.sign({ email: data.email }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		}),
	};
};
