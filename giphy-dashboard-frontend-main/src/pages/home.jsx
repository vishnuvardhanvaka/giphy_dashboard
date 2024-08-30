import Table from '@/components/table';
import columns from '@/data/chartTable';
import { useSelector } from 'react-redux';
import { selectGifChartsTable } from '@/redux/csv/selectors';

export default function Home() {
	const rows = useSelector(selectGifChartsTable);
	return <Table title='GIF Chart List' columns={columns} rows={rows} />;
}
