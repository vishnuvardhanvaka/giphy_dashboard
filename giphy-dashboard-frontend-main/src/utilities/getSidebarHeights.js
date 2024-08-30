export default function getSidebarHeights(menuList) {
	return menuList.map(item => ({ id: item.id, isOpen: false, height: 0, menu: getSidebarHeights(item.menu) }));
}
