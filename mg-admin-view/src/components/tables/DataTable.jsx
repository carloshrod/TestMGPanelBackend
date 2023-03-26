import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import DataTableHead from './DataTableHead';
import DataTableToolbar from './DataTableToolbar';
import DataTableBody from './DataTableBody';
import { useTable } from '../../hooks';

export default function DataTable({ users }) {
	const rows = users;

	const {
		selected,
		setSelected,
		order,
		orderBy,
		page,
		rowsPerPage,
		handleSelectAllClick,
		handleRequestSort,
		handleChangePage,
		handleChangeRowsPerPage,
		handleClick,
	} = useTable(rows);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2, px: 2, py: 1 }}>
				<DataTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
						<DataTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<DataTableBody
							rows={rows}
							order={order}
							orderBy={orderBy}
							selected={selected}
							setSelected={setSelected}
							page={page}
							rowsPerPage={rowsPerPage}
							handleClick={handleClick}
						/>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					labelRowsPerPage={'Usuarios por página:'}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
