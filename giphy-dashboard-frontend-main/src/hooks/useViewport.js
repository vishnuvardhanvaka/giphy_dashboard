import { useEffect, useState } from 'react';

export default function useViewport() {
	const [state, setState] = useState({
		width: 0,
		height: 0,
		isMobile: false,
		isTablet: false,
		isLaptop: false,
		isDesktop: false,
	});

	function getDevice(w) {
		if (w > 1750) return 'desktop';
		else if (w > 1250) return 'laptop';
		else if (w > 750) return 'tablet';
		return 'mobile';
	}

	function handleState(w, h) {
		setState({
			width: w,
			height: h,
			isMobile: getDevice(w) === 'mobile',
			isTablet: getDevice(w) === 'tablet',
			isLaptop: getDevice(w) === 'laptop',
			isDesktop: getDevice(w) === 'desktop',
		});
	}

	function handleResize(event) {
		handleState(event.target.innerWidth, event.target.innerHeight);
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleState(window.innerWidth, window.innerHeight);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return state;
}
