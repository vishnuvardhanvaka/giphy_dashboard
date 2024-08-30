const getDate = require('./getDate');

module.exports = (engages, views) => {
	function getEngages(id) {
		const items = engages.filter(item => item.content_id === id);
		return items.reduce((result, item) => {
			result[item.term] = [{ date: getDate(), value: Number(item['engagement rate']) }];
			return result;
		}, {});
	}

	return views.map(item => ({
		id: item.content_id,
		type: item.content_type,
		url: item.content_url,
		views: [{ date: getDate(), value: Number(item.view_count) }],
		engages: getEngages(item.content_id),
	}));
};
