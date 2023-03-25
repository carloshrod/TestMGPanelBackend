import { CardActions, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGlobalContext, useUsersContext } from '../context';
import FormUser from './FormUser';
import UserServices from '../services/UserServices';

const UserActions = () => {
	const { setOpenModal } = useGlobalContext();
	const { user, setUserToEdit } = useUsersContext();
	const { deleteUser } = UserServices();

	const handleEdit = () => {
		setUserToEdit(user);
		setOpenModal({ state: true, title: 'Edit user', child: <FormUser /> });
	};

	const handleDelete = () => {
		deleteUser(user._id);
	};

	return (
		<CardActions
			className='userActions'
			sx={{ justifyContent: { xs: 'space-between', sm: 'end' }, p: 4 }}
		>
			<Tooltip title='Editar usuario' arrow>
				<IconButton aria-label='edit user' onClick={handleEdit}>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title='Eliminar usuario' arrow>
				<IconButton aria-label='delete user' onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</CardActions>
	);
};

export default UserActions;
