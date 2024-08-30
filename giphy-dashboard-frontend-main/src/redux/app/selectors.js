import getMenuById from '@/utilities/getMenuById';
import getMenuHeights from '@/utilities/getMenuHeights';

export function selectMenuById(id) {
	return store => getMenuById(store.app.sidebar, id);
}

export function selectHeightById(id) {
	return store => getMenuHeights([getMenuById(store.app.sidebar, id)]);
}
