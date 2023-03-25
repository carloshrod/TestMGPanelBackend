import {
	Chip,
	IconButton,
	TableBody,
	TableCell,
	TableRow,
	Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useTable } from '../../hooks';
import { useGlobalContext, useUsersContext } from '../../context';
import FormUser from '../FormUser';
import UserServices from '../../services/UserServices';

const DataTableBody = ({
	rows,
	order,
	orderBy,
	selected,
	page,
	rowsPerPage,
}) => {
	const { stableSort, getComparator } = useTable(rows);
	const { setOpenModal } = useGlobalContext();
	const { setUserToEdit } = useUsersContext();
	const { deleteUser, unsubscribeUser } = UserServices();
	const navigate = useNavigate();

	const isSelected = id => selected.indexOf(id) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleEdit = row => {
		setUserToEdit(row);
		setOpenModal({ state: true, title: 'Editar', child: <FormUser /> });
	};

	const handleDetails = userId => {
		navigate(`/${userId}`);
	};

	const handleDelete = userId => {
		deleteUser(userId);
	};

	const handleSubs = userId => {
		unsubscribeUser(userId);
	};

	return (
		<TableBody>
			{rows?.length > 0 ? (
				<>
					{stableSort(rows, getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, index) => {
							const isItemSelected = isSelected(row._id);
							const labelId = `enhanced-table-checkbox-${index}`;
							const isSubs = row.subscribed;

							return (
								<TableRow
									hover
									role='checkbox'
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={row._id}
									selected={isItemSelected}
								>
									<TableCell
										component='th'
										id={labelId}
										scope='row'
										padding='normal'
									>
										{row.name}
									</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>
										<Tooltip
											title={isSubs ? 'Cancelar subscripción' : ''}
											arrow
										>
											<Chip
												sx={{
													cursor: `${isSubs ? 'pointer' : 'not-allowed'}`,
												}}
												label={isSubs ? <CheckIcon /> : <CloseIcon />}
												color={`${isSubs ? 'success' : 'warning'}`}
												onClick={isSubs ? () => handleSubs(row._id) : null}
											/>
										</Tooltip>
									</TableCell>
									<TableCell align='center'>
										<Tooltip title='Editar usuario' arrow>
											<IconButton onClick={() => handleEdit(row)}>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Ver detalles' arrow>
											<IconButton onClick={() => handleDetails(row._id)}>
												<ZoomInIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Eliminar usuario' arrow>
											<IconButton onClick={() => handleDelete(row._id)}>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							);
						})}
				</>
			) : (
				<TableRow>
					<TableCell sx={{ fontSize: 30 }} align='center' colSpan={4}>
						¡No data!
					</TableCell>
				</TableRow>
			)}
			{emptyRows > 0 && (
				<TableRow>
					<TableCell colSpan={4} />
				</TableRow>
			)}
		</TableBody>
	);
};

export default DataTableBody;
