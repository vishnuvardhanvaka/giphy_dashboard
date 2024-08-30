const db = require('@/prisma/db');

module.exports.getContents = async email => {
	const user = await db.user.findUnique({ where: { email } });
	return await db.content.findMany({ where: { userId: user.id } });
};
