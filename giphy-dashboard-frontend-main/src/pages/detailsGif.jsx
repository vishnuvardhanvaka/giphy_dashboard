import Loader from './loader';
import getSize from 'pretty-bytes';
import toDate from '@/utilities/toDate';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import separateNumber from '@/utilities/separateNumber';
import { useGetContentQuery } from '@/redux/contents/enhancers';
import { selectGifChartsChart, selectTopGifsTableById } from '@/redux/csv/selectors';

export default function DetailsGif() {
	const { id } = useParams();
	const gif = useSelector(selectTopGifsTableById(id));
	const gifRaw = useSelector(selectGifChartsChart(id));
	const { data, isLoading } = useGetContentQuery(id, { skip: !id });

	return (
		<div className='topgifs'>
			{isLoading ? <Loader /> : null}
			<h1 className='title'>{data?.data?.title}</h1>
			<div className='content'>
				<img src={data?.data?.images?.original?.url} alt={data?.data?.title} />
				<div className='meta-info'>
					<div className='infos'>
						<p className='info'>
							<strong>Total Views: </strong>
							{separateNumber(gif?.views?.total || 0)}
						</p>
						<p className='info'>
							<strong>Highest Views: </strong>
							{separateNumber(gif?.views?.value || 0)} ({toDate(gif?.views?.date)})
						</p>
						<p className='info'>
							<strong>Dimensions: </strong>
							{data?.data?.images?.original?.width} X {data?.data?.images?.original?.height} Pixels
						</p>
						<p className='info'>
							<strong>Upload Date: </strong>
							{toDate(data?.data?.import_datetime)}
						</p>
						<p className='info'>
							<strong>Size: </strong>
							{getSize(Number(data?.data?.images?.original?.size) || 0)}
						</p>
						<p className='info'>
							<strong>Frames: </strong>
							{data?.data?.images?.original?.frames}
						</p>
						<p className='info'>
							<strong>Rating: </strong>
							{data?.data?.rating}
						</p>
					</div>
					<div className='tags'>
						{Object.keys(gifRaw?.engages).map((tag, index) => (
							<span key={`${tag}-${index}`}>#{tag}</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
