const _ = require('lodash');
const db = require('@/prisma/db');

module.exports = async (userId, csvData) => {
	try {
		await Promise.all(
			csvData.map(
				item =>
					new Promise(async (resolve, reject) => {
						try {
							const prev = await db.content.findUnique({ where: { id: item.id } });
							resolve(
								await db.content.update({
									where: { id: item.id },
									data: {
										...prev,
										views: _.unionBy(item.views, prev.views, 'date'),
										engages: _.mergeWith(prev.engages, item.engages, (p, c) => _.unionBy(c, p, 'date')),
									},
								})
							);
						} catch (error) {
							reject(error);
						}
					})
			)
		);
	} catch (error) {
		await db.content.createMany({
			data: csvData.map(item => ({ ...item, userId })),
			skipDuplicates: true,
		});
	}
};
