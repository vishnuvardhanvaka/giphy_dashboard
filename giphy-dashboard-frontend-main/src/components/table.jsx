import { uniqBy } from 'lodash';
import { Icon } from '@iconify/react';
import prefixZero from '@/utilities/prefixZero';
import { ClickAwayListener } from '@mui/material';
import { useEffect, useState, Fragment } from 'react';

export default function Table({ title, columns, rows }) {
	const [page, setPage] = useState(0);
	const [sort, setSort] = useState({});
	const [search, setSearch] = useState('');
	const [filters, setFilters] = useState([]);
	const perPageOptions = [10, 25, 50, 75, 100];
	const [openedFilter, setOpenedFilter] = useState('');
	const [perPage, setPerPage] = useState(perPageOptions[0]);

	function handleSetSort(id) {
		setSort(prev => {
			if (prev.key === id) return { key: id, order: prev.order === 'asc' ? 'desc' : 'asc' };
			return { key: id, order: 'asc' };
		});
	}

	function handleSort(prev, next) {
		let left = prev;
		let right = next;
		sort.key?.split('.').forEach(id => {
			left = left[id];
			right = right[id];
		});
		if (!isNaN(left)) {
			left = Number(left);
			right = Number(right);
		}
		if (left > right) return sort.order === 'asc' ? 1 : -1;
		else if (left < right) return sort.order === 'asc' ? -1 : 1;
		return 0;
	}

	// function getSerial(index) {
	// 	const pad = Math.ceil(Math.log10(rows.length));
	// 	return String(index + 1 + page * perPage).padStart(pad, '0');
	// }

	function handleSelectAll(column) {
		setFilters(prev => ({
			...prev,
			[column]: prev[column].map(item => ({ ...item, isSelected: true })),
		}));
	}

	function handleUnSelectAll(column) {
		setFilters(prev => ({
			...prev,
			[column]: prev[column].map(item => ({ ...item, isSelected: false })),
		}));
	}

	function isAllSelected(column) {
		return filters[column].every(item => item.isSelected);
	}

	function handleItemSelect(column, value, isSelected) {
		setFilters(prev => ({
			...prev,
			[column]: prev[column].map(i => {
				if (i.value === value) return { ...i, isSelected };
				return i;
			}),
		}));
	}

	function getFilteredRows() {
		const arrs = [rows];
		for (let column in filters) {
			const values = filters[column].filter(item => item.isSelected).map(item => item.value);
			arrs.push(arrs.at(-1).filter(item => values.includes(item[column])));
		}
		return arrs.at(-1).filter(handleSearch);
	}

	function handleSearch(row) {
		if (!search.trim()) return true;
		for (const key in row) {
			if (String(row[key]).toLowerCase().includes(search.toLowerCase())) return true;
		}
		return false;
	}

	function getColumnValue(item, columnId) {
		const splitted = columnId.split('.');
		if (splitted.length === 1) return item[columnId];
		let result = item;
		splitted.forEach(id => {
			result = result[id];
		});
		return result;
	}

	useEffect(() => {
		setSort({ key: columns[4].id, order: 'desc' });
	}, [columns]);

	useEffect(() => {
		if (rows.length) {
			const temp = {};
			columns.forEach(col => {
				temp[col.id] = uniqBy(
					rows.map(row => ({
						value: row[col.id],
						isSelected: true,
					})),
					'value'
				).sort((prev, next) => {
					let left = prev.value;
					let right = next.value;
					if (!isNaN(left)) {
						left = Number(left);
						right = Number(right);
					}
					if (left > right) return 1;
					else if (left < right) return -1;
					return 0;
				});
			});
			setFilters(temp);
		}
	}, [rows]);

	return (
		<Fragment>
			<div className='table-header'>
				<h1 className='table-title'>{title}</h1>
				<div className='table-search'>
					<Icon icon='fluent:search-24-filled' />
					<input type='text' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
				</div>
			</div>
			<div className='table-container'>
				<table className='table'>
					<thead className='table-thead'>
						<tr className='table-tr'>
							{/* <th className='table-th'>
							<div className='table-data'>Serial</div>
						</th> */}
							{columns.map(column => (
								<th key={`${column.id}/${column.name}`} className='table-th' colSpan={column.colSpan}>
									<div className='table-data' onClick={() => column.canSort && handleSetSort(column.id)}>
										<p className='texts'>
											{column.name}{' '}
											{column.canSort ? (
												<Icon
													icon='fluent:arrow-down-24-filled'
													className={`${sort.key === column.id ? 'active' : ''} ${
														sort.order === 'asc' ? 'down' : 'up'
													}`}
												/>
											) : null}
										</p>
										{column.canFilter ? (
											<ClickAwayListener onClickAway={() => setOpenedFilter('')}>
												<div
													className='icons'
													onClick={e => {
														e.stopPropagation();
														setOpenedFilter(prev => (prev === column.id ? '' : column.id));
													}}>
													<Icon icon='jam:filter' />
													{openedFilter === column.id ? (
														<div className='filter-window' onClick={e => e.stopPropagation()}>
															<div className='filter-items'>
																{filters[column.id].map(filter => (
																	<label key={filter.value} className='filter-item'>
																		<input
																			type='checkbox'
																			checked={filter.isSelected}
																			onChange={e =>
																				handleItemSelect(column.id, filter.value, e.target.checked)
																			}
																		/>
																		<p>{filter.value}</p>
																	</label>
																))}
															</div>
															<button
																className='filter-button'
																onClick={() => {
																	if (isAllSelected(column.id)) handleUnSelectAll(column.id);
																	else handleSelectAll(column.id);
																}}>
																{isAllSelected(column.id) ? 'Unselect All' : 'Select All'}
															</button>
														</div>
													) : null}
												</div>
											</ClickAwayListener>
										) : null}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody className='table-tbody'>
						{getFilteredRows()
							.sort(handleSort)
							.slice(page * perPage, page * perPage + perPage)
							.map((item, index) => (
								<tr key={`row-${index}`} className='table-tr'>
									{/* <td className='table-td'>
									<div className='table-data'>{getSerial(index)}</div>
								</td> */}
									{columns.map(column => (
										<td key={`${column.id}/${column.name}`} className='table-td' colSpan={column.colSpan}>
											<div className='table-data'>
												{column.wrapper
													? column.wrapper(getColumnValue(item, column.id))
													: getColumnValue(item, column.id)}
											</div>
										</td>
									))}
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<Pagination
				page={page}
				setPage={setPage}
				perPage={perPage}
				setPerPage={setPerPage}
				options={perPageOptions}
				total={getFilteredRows().length}
			/>
		</Fragment>
	);
}

export function Pagination({ options, total, page, setPage, perPage, setPerPage }) {
	const [isOpen, setIsOpen] = useState(false);
	const [disabled, setDisabled] = useState([]);

	function handleOpen() {
		setIsOpen(prev => !prev);
	}

	function getItemsRange() {
		const start = page * perPage + 1;
		const end = start + perPage - 1;
		return `${prefixZero(start)}–${prefixZero(end > total ? total : end)}`;
	}

	function handleLeftLine() {
		if (!disabled.includes('leftLine')) setPage(0);
	}

	function handleLeft() {
		if (!disabled.includes('left')) setPage(prev => (prev > 0 ? prev - 1 : prev));
	}

	function handleRight() {
		const pages = Math.ceil(total / perPage) - 1;
		if (!disabled.includes('right')) setPage(prev => (prev < pages ? prev + 1 : prev));
	}

	function handleRightLine() {
		if (!disabled.includes('rightLine')) setPage(Math.ceil(total / perPage) - 1);
	}

	useEffect(() => {
		const temp = [];
		const pages = Math.ceil(total / perPage) - 1;
		if (page === 0) temp.push('left', 'leftLine');
		if (page === pages) temp.push('right', 'rightLine');
		setDisabled(temp);
	}, [perPage, total, page]);

	return (
		<div className='pagination'>
			<p className='left-text'>
				Showing {getItemsRange()} of {prefixZero(total)} items
			</p>
			<div className='right-icons'>
				Per Page:
				<ClickAwayListener onClickAway={() => setIsOpen(false)}>
					<div className={`items-count ${isOpen ? 'active' : ''}`} onClick={handleOpen}>
						{perPage}
						<div className='items-count-window'>
							{options.map((item, index) => (
								<p
									key={`${item}-${index}`}
									className={`items-count-number ${perPage === item ? 'active' : ''}`}
									onClick={() => {
										setPage(0);
										setPerPage(item);
									}}>
									{item}
								</p>
							))}
						</div>
					</div>
				</ClickAwayListener>
				<button className='arrow-button' onClick={handleLeftLine} disabled={disabled.includes('leftLine')}>
					<Icon icon='lucide:arrow-left-to-line' />
				</button>
				<button className='arrow-button' onClick={handleLeft} disabled={disabled.includes('left')}>
					<Icon icon='lucide:arrow-left' />
				</button>
				<button className='arrow-button' onClick={handleRight} disabled={disabled.includes('right')}>
					<Icon icon='lucide:arrow-right' />
				</button>
				<button className='arrow-button' onClick={handleRightLine} disabled={disabled.includes('rightLine')}>
					<Icon icon='lucide:arrow-right-to-line' />
				</button>
			</div>
		</div>
	);
}
