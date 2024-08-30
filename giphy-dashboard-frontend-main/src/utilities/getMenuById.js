export default function getMenuById(menuList, id) {
	for (let item of menuList) {
		if (item.id === id) return item;
		else if (item.menu) {
			const result = getMenuById(item.menu, id);
			if (result) return result;
		}
	}
	return null;
}
