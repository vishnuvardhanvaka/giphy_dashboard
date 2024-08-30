import NotFound from './notFound';
import toDate from '@/utilities/toDate';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AreaChart from '@/components/areaChart';
import toDayMonth from '@/utilities/toDayMonth';
import compactNumber from '@/utilities/compactNumber';
import separateNumber from '@/utilities/separateNumber';
import { selectGifChartsChart } from '@/redux/csv/selectors';

export default function DetailsChart() {
	const { id } = useParams();
	const data = useSelector(selectGifChartsChart(id));

	if (!data?.id) return <NotFound overlay='inner' />;

	const colors = [
		'#ff7f50',
		'#6495ed',
		'#008b8b',
		'#556b2f',
		'#ff8c00',
		'#9932cc',
		'#1e90ff',
		'#ffd700',
		'#00dd00',
		'#ff69b4',
		'#4b0082',
		'#bdb76b',
		'#f08080',
		'#9370db',
		'#808000',
		'#ffa500',
		'#ff4500',
		'#8fbc8f',
		'#7b68ee',
		'#2f4f4f',
		'#008080',
		'#ff6347',
		'#8a2be2',
	];

	function sortByDate(prev, next) {
		return new Date(prev.date).getTime() - new Date(next.date).getTime();
	}

	// function getEngagesAverage() {
	// 	const temp = Object.keys(data?.engages).map(tag => [...data.engages[tag]].sort(sortByDate).at(-1));
	// 	console.log(temp);
	// 	return [];
	// }

	return (
		<div className='details'>
			<div className='chart'>
				<h1 className='chart-title'>View Count</h1>
				<AreaChart
					data={[...(data?.views || [])].sort(sortByDate)}
					xKey='date'
					yKey='value'
					color={colors.at(-1)}
					xFormat={{ axis: toDayMonth, tooltip: toDate }}
					yFormat={{ axis: compactNumber, tooltip: separateNumber }}
				/>
			</div>
			{/* <div className='chart'>
				<h1 className='chart-title'>Engagement Rate (Average)</h1>
				<AreaChart
					data={getEngagesAverage()}
					xKey='date'
					yKey='rate'
					color='rgb(255, 100, 70)'
					xFormat={{ axis: toDayMonth, tooltip: toDate }}
					yFormat={{ axis: compactNumber, tooltip: separateNumber }}
				/>
			</div> */}
			{Object.keys(data?.engages).map((tag, index) => (
				<div key={`${tag}-${index}`} className='chart'>
					<h1 className='chart-title'>Engagement Rate ({tag})</h1>
					<AreaChart
						data={[...(data?.engages[tag] || [])].sort(sortByDate)}
						xKey='date'
						yKey='value'
						color={colors[index]}
						xFormat={{ axis: toDayMonth, tooltip: toDate }}
						yFormat={{ axis: compactNumber, tooltip: separateNumber }}
					/>
				</div>
			))}
		</div>
	);
}
