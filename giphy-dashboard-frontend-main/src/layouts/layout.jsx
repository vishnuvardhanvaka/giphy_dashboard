import { Suspense } from 'react';
import Loader from '@/pages/loader';
import Header from '@/components/header';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import useViewport from '@/hooks/useViewport';

export default function Layout() {
	const { isMobile } = useViewport();

	return (
		<main className='layout'>
			{!isMobile ? <Sidebar /> : null}
			<article className='content'>
				<Header />
				<section className='section'>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</section>
			</article>
		</main>
	);
}
