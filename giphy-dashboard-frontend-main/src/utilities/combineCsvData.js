export default function combineCsvData(engages, views) {
	function getEngages(id) {
		const items = engages.filter(item => item.content_id === id);
		return items.reduce((result, item) => {
			result[item.term] = [{ date: new Date().toLocaleDateString('en-CA'), value: Number(item['engagement rate']) }];
			return result;
		}, {});
	}

	return views.map(item => ({
		id: item.content_id,
		type: item.content_type,
		url: item.content_url,
		views: [{ date: new Date().toLocaleDateString('en-CA'), value: Number(item.view_count) }],
		engages: getEngages(item.content_id),
	}));
}
