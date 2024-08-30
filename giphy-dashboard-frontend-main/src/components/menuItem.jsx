import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarState } from '@/redux/app/reducers';
import { selectHeightById } from '@/redux/app/selectors';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MenuItem({ children, id, path, icon, name }) {
	const subMenu = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const height = useSelector(selectHeightById(id));

	function handleClick() {
		if (children) setIsOpen(prev => !prev);
		else if (path !== pathname) navigate(path);
	}

	function getStyle(isOpen) {
		if (isOpen) return { '--height': `${height}px` };
		return { '--height': '0px' };
	}

	useEffect(() => {
		dispatch(setSidebarState({ id, isOpen }));
	}, [id, isOpen]);

	useEffect(() => {
		if (subMenu.current) dispatch(setSidebarState({ id, height: subMenu.current.clientHeight }));
	}, [id, subMenu]);

	return (
		<div className='menu-list'>
			<button className={`menu-item ${pathname === path ? 'active' : ''}`} onClick={handleClick}>
				<p className='text-area'>
					{icon ? <Icon icon={icon} /> : null}
					{name}
				</p>
				{children ? (
					<Icon icon='fluent:chevron-right-24-filled' className={`chevron ${isOpen ? 'active' : ''}`} />
				) : (
					<span className='indicator'></span>
				)}
			</button>
			{children ? (
				<div className='sub-menu-window' style={getStyle(isOpen)}>
					<div className='sub-menu-list' ref={subMenu}>
						{children}
					</div>
				</div>
			) : null}
		</div>
	);
}
