const db = require('@/prisma/db');

module.exports.getUserMe = async email => {
	const user = await db.user.findUnique({ where: { email } });
	const { password, ...data } = user;
	return data;
};
