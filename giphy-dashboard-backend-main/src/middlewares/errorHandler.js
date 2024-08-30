module.exports = (err, req, res) => {
	console.log(err);
	res.status(500).json({
		status: 'Failed',
		message: 'Something went Wrong!',
		error: err,
	});
};
