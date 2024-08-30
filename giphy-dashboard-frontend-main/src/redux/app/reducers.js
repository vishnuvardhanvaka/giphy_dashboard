import menuList from '@/data/menuList.json';
import { createSlice } from '@reduxjs/toolkit';
import getMenuById from '@/utilities/getMenuById';
import getSidebarHeights from '@/utilities/getSidebarHeights';

const initialState = {
	sidebar: getSidebarHeights(menuList),
};

const app = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setSidebarState: (state, action) => {
			const menu = getMenuById(state.sidebar, action.payload.id);
			if (action.payload.isOpen !== undefined) menu.isOpen = action.payload.isOpen;
			if (action.payload.height !== undefined) menu.height = action.payload.height;
		},
		signout: () => {
			sessionStorage.removeItem('token');
			window.location.reload();
		},
	},
});

export default app.reducer;
export const { setSidebarState, signout } = app.actions;
