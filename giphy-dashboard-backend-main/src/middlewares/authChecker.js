const jwt = require('jsonwebtoken');

module.exports = (req, res, nex) => {
	const token = req.headers?.authorization?.split(' ')?.[1];
	if (!token) {
		return res.status(401).send({
			status: 'Failed',
			message: 'Something went wrong!',
			error: 'Please provide your authentication token!',
		});
	}
	try {
		const { email } = jwt.verify(token, process.env.JWT_SECRET);
		req.email = email;
		nex();
	} catch (error) {
		return res.status(401).send({
			status: 'Failed',
			message: 'Something went wrong!',
			error: 'You have invalid authentication token!',
		});
	}
};
