import Loader from '@/pages/loader';
import Layout from '@/layouts/layout';
import NotFound from '@/pages/notFound';
import { useDispatch } from 'react-redux';
import AuthRoute from '@/components/authRoute';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useGetMeQuery } from '@/redux/auth/enhancers';
import { useGetContentsQuery } from '@/redux/contents/enhancers';
import { setGifChartsChart, setGifChartsTable, setTopGifsTable } from '@/redux/csv/reducers';

const Home = lazy(() => import('@/pages/home'));
const Auth = lazy(() => import('@/pages/auth'));
const About = lazy(() => import('@/pages/about'));
const TopGifs = lazy(() => import('@/pages/topGifs'));
const DetailsGif = lazy(() => import('@/pages/detailsGif'));
const DetailsChart = lazy(() => import('@/pages/detailsChart'));

export default function App() {
	const dispatch = useDispatch();
	const { data: user, isLoading: userIsLoading } = useGetMeQuery();
	const {
		data: contents,
		refetch,
		isLoading: contentsIsLoading,
	} = useGetContentsQuery(undefined, {
		skip: !user?.data?.email,
	});

	function sortByDate(prev, next) {
		return new Date(prev.date).getTime() - new Date(next.date).getTime();
	}

	function getEngages(engages) {
		const keys = Object.keys(engages);
		if (!keys.length) return (0).toFixed(2);
		const rate = keys.reduce((rate, key) => rate + engages[key].at(-1).value, 0);
		return rate > 0 ? (rate / keys.length).toFixed(2) : rate.toFixed(2);
	}

	function getHighViews(views) {
		let result = {};
		let maxView = 0;
		for (let i = 1; i < views.length; i++) {
			const diff = views[i].value - views[i - 1].value;
			if (diff >= maxView) {
				maxView = diff;
				result.date = views[i].date;
				result.value = maxView;
				result.total = views.at(-1).value;
			}
		}
		return result;
	}

	useEffect(() => {
		if (user?.data?.email) refetch();
	}, [user?.data]);

	useEffect(() => {
		if (contents?.data?.length) {
			dispatch(setGifChartsChart(contents.data));
			dispatch(
				setGifChartsTable(
					contents.data.map(item => ({
						...item,
						views: item.views[0].value,
						engages: getEngages(item.engages),
					}))
				)
			);
			dispatch(
				setTopGifsTable(
					contents.data.map(item => ({
						...item,
						views: getHighViews([...item.views].sort(sortByDate)),
						engages: getEngages(item.engages),
					}))
				)
			);
		}
	}, [contents]);

	return (
		<Suspense fallback={<Loader />}>
			{userIsLoading || contentsIsLoading ? <Loader /> : null}
			<Routes>
				<Route path='/' element={<AuthRoute user={user?.data} page={<Layout />} />}>
					<Route index element={<Home />} />
					<Route path='about-us' element={<About />} />
					<Route path='top-gifs' element={<TopGifs />} />
					<Route path='top-gifs/:id' element={<DetailsGif />} />
					<Route path=':id' element={<DetailsChart />} />
				</Route>
				<Route path='/signup' element={<Auth type='signup' user={user?.data} />} />
				<Route path='/signin' element={<Auth type='signin' user={user?.data} />} />
				<Route path='*' element={<NotFound overlay='outer' />} />
			</Routes>
			<ToastContainer
				position='bottom-left'
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</Suspense>
	);
}
