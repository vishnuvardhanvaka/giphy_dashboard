module.exports = async (res, callback) => {
	try {
		const result = await callback();
		res.status(200).send({
			status: 'Success',
			message: 'Performed the action!',
			data: result,
		});
	} catch (error) {
		res.status(400).send({
			status: 'Failed',
			message: 'Something went wrong!',
			error: error?.message,
		});
	}
};
