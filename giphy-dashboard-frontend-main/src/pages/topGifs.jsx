import Table from '@/components/table';
import { useSelector } from 'react-redux';
import columns from '@/data/detailsTable';
import { selectTopGifsTable } from '@/redux/csv/selectors';
import { useGetMeQuery } from '@/redux/auth/enhancers';

export default function TopGifs() {
	const rows = useSelector(selectTopGifsTable);
	const { data: user } = useGetMeQuery();
	if(!user.data.activeAccount){return <div className='text-center h-full'>Inactive account.</div>}
	else if(user.data.syncingData){return <div className='text-center h-full'>We&apos;re just fetching your Giphy data, which might take a minute. Please hang tight—your content will be ready shortly!</div>}
	return <Table title='GIF Details List' columns={columns} rows={rows} />;
}
