module.exports = port => (req, res) => {
	res.status(200).json({
		status: 200,
		message: 'App is running...',
		port,
	});
};
