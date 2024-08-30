export default function getMenuHeights(menuList) {
	return menuList.reduce((height, item) => height + (item.isOpen ? item.height : 0) + getMenuHeights(item.menu), 0);
}
