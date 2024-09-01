module.exports.signup = req => {
	const { name, image, email, password } = req.body;
	if (!name) throw new Error('Please provide a Name');
	// if (!image) throw new Error('Please provide an image URL');
	if (!email) throw new Error('Please provide an Email ID');
	if (!password) throw new Error('Please provide a Password');
	return { name, email, password };
};

module.exports.signin = req => {
	const { email, password } = req.body;
	if (!email) throw new Error('Please provide Email ID');
	if (!password) throw new Error('Please provide Password');
	return { email, password };
};
