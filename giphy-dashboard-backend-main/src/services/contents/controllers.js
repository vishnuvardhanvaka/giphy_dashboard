const databases = require('./databases');
const { sendRes } = require('@/middlewares');

module.exports.getContents = async (req, res) => {
	sendRes(res, async () => {
		return await databases.getContents(req.email);
	});
};
