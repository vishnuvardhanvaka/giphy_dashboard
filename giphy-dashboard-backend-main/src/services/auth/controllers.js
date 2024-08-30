const databases = require('./databases');
const filtrations = require('./filtrations');
const { sendRes } = require('@/middlewares');

module.exports.signup = async (req, res) => {
	sendRes(res, async () => {
		return await databases.signup(filtrations.signup(req));
	});
};

module.exports.signin = async (req, res) => {
	sendRes(res, async () => {
		return await databases.signin(filtrations.signin(req));
	});
};
