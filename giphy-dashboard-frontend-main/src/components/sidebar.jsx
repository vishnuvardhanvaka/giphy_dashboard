import MenuItem from './menuItem';
import logo from '@/assets/logo.png';
import menuList from '@/data/menuList.json';

export default function Sidebar() {
	function renderMenus(menuList) {
		return menuList.map(item => (
			<MenuItem key={item.id} {...item}>
				{item.menu.length ? renderMenus(item.menu) : null}
			</MenuItem>
		));
	}

	return (
		<nav className='sidebar'>
			<main className='content'>
				<div className='logo-area'>
					<img src={logo} alt='Logo' />
					<h1>Giphy</h1>
				</div>
				<nav className='links-area'>{renderMenus(menuList)}</nav>
			</main>
		</nav>
	);
}
