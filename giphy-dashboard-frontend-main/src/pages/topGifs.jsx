import Table from '@/components/table';
import { useSelector } from 'react-redux';
import columns from '@/data/detailsTable';
import { selectTopGifsTable } from '@/redux/csv/selectors';

export default function TopGifs() {
	const rows = useSelector(selectTopGifsTable);
	return <Table title='GIF Details List' columns={columns} rows={rows} />;
}
