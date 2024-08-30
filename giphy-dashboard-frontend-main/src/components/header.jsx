import { useState } from 'react';
import logo from '@/assets/logo.png';
import UserWindow from './userWindow';
import { ClickAwayListener } from '@mui/material';
import { useGetMeQuery } from '@/redux/auth/enhancers';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { data: user } = useGetMeQuery();
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		if (pathname !== '/') navigate('/');
	}

	return (
		<header className='header'>
			<h1 className='brand'>Analytics Dashboard</h1>
			<div className='mobile-brand' onClick={handleClick}>
				<img src={logo} alt='Giphy Studio' />
				<h1>Dashboard</h1>
			</div>
			<ClickAwayListener onClickAway={() => setIsOpen(false)}>
				<div className='header-window'>
					<p className='user-name'>{user?.data?.name}</p>
					<img
						className='header-user'
						src={user?.data?.image}
						alt={user?.data?.name}
						onClick={() => setIsOpen(prev => !prev)}
					/>
					<UserWindow user={user?.data} isOpen={isOpen} setIsOpen={setIsOpen} />
				</div>
			</ClickAwayListener>
		</header>
	);
}
