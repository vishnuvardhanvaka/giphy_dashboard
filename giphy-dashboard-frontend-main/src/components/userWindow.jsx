import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import menuList from '@/data/menuList.json';
import useViewport from '@/hooks/useViewport';
import { signout } from '@/redux/app/reducers';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserWindow({ user, isOpen, setIsOpen }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { isMobile } = useViewport();

	function handleSignout() {
		dispatch(signout());
	}

	function handlePath(path) {
		if (path !== pathname) navigate(path);
		setIsOpen(false);
	}

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<div className={`user-window ${isOpen ? 'active' : null}`}>
			<img className='userimage' src={user.image} alt={user.name} />
			<h3 className='username'>{user.name}</h3>
			<p className='useremail'>{user.email}</p>
			<div className='options'>
				{isMobile ? (
					<Fragment>
						{menuList.map(menu => (
							<p
								key={menu.id}
								className={`option ${menu.path === pathname ? 'active' : null}`}
								onClick={() => handlePath(menu.path)}>
								<Icon icon={menu.icon} />
								{menu.name}
							</p>
						))}
					</Fragment>
				) : null}
				{isMobile ? (
					<div className='line'>
						<span></span>
					</div>
				) : null}
				<p className='option' onClick={handleSignout}>
					<Icon icon='ci:log-out' />
					Sign out
				</p>
			</div>
		</div>
	);
}
