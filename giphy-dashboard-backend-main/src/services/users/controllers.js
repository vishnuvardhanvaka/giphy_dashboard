const databases = require('./databases');
const { sendRes } = require('@/middlewares');

module.exports.getUserMe = async (req, res) => {
	sendRes(res, async () => {
		return await databases.getUserMe(req.email);
	});
};
