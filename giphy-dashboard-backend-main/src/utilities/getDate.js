module.exports = (date = Date.now()) => {
	const temp = new Date(date);
	const day = temp.toLocaleDateString('en-US', { day: '2-digit' });
	const month = temp.toLocaleDateString('en-US', { month: '2-digit' });
	return `${temp.getFullYear()}-${month}-${day}`;
};
