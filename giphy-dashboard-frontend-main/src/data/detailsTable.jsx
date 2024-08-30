import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import separateNumber from '@/utilities/separateNumber';

export default [
	{
		id: 'id',
		name: '',
		canSort: false,
		canFilter: false,
		wrapper: value => (
			<img className='gif-preview' src={`https://media3.giphy.com/media/${value}/giphy.gif`} alt='Gif Preview' />
		),
	},
	{
		id: 'id',
		name: 'Content ID',
		canSort: true,
		canFilter: true,
		wrapper: value => (
			<Link to={`/top-gifs/${value}`} className='table-link text-para'>
				{value}
			</Link>
		),
	},
	{
		id: 'type',
		name: 'Type',
		canSort: true,
		canFilter: true,
	},
	{
		id: 'engages',
		name: 'Rate',
		canSort: true,
		canFilter: true,
	},
	{
		id: 'views.value',
		name: 'Views (1d)',
		canSort: true,
		canFilter: true,
		wrapper: separateNumber,
	},
	{
		id: 'url',
		name: 'Content URL',
		canSort: false,
		canFilter: false,
		wrapper: value => (
			<a href={value} className='table-link' target='_blank' rel='noreferrer'>
				Open <Icon icon='tabler:external-link' />
			</a>
		),
	},
];
