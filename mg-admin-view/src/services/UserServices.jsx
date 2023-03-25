import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useUsersContext } from '../context';

const options = {
	headers: { 'Content-Type': 'application/json' },
};

const UserServices = () => {
	const { users, setUsers, fetchUsers, fetchUser } = useUsersContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const createUser = async data => {
		try {
			const res = await axios.post(
				'http://localhost:7124/api/v1/users',
				data,
				options
			);
			if (res.status === 201) {
				setUsers([...users, res.data]);
				toast.success('Usuario registrado con éxito!');
				return;
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	const updateUser = async (data, userId) => {
		try {
			const res = await axios.put(
				`http://localhost:7124/api/v1/users/${userId}`,
				data,
				options
			);
			if (res.status === 200) {
				const newData = users.map(user =>
					user._id === res.data._id ? res.data : user
				);
				setUsers(newData);
				toast.success('Usuario actualizado con éxito!');
				fetchUser(userId);
				return;
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	const deleteUser = async userId => {
		try {
			const resConfirm = await Swal.fire({
				icon: 'warning',
				html: `¿Estás seguro de que quieres eliminar este usuario de forma permanente? <br> <br> <b>¡No podrás revertir esta acción!</b>`,
				showCancelButton: true,
				confirmButtonColor: '#20cb84',
				cancelButtonColor: '#dc4035',
				confirmButtonText: 'Accept',
				width: '24em',
			});
			if (resConfirm.isConfirmed) {
				const res = await axios.delete(
					`http://localhost:7124/api/v1/users/${userId}`,
					options
				);
				if (res.status === 200) {
					const newData = users.filter(user => user._id !== userId);
					setUsers(newData);
					toast.success('Usuario eliminado con éxito!');
					if (pathname !== '/') navigate('/');
					return;
				}
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	const unsubscribeUser = async userId => {
		try {
			const resConfirm = await Swal.fire({
				icon: 'warning',
				html: `¿Estás seguro que quieres cancelar la subscripción de este usuario?`,
				showCancelButton: true,
				confirmButtonColor: '#20cb84',
				cancelButtonColor: '#dc4035',
				confirmButtonText: 'Accept',
				width: '24em',
			});
			if (resConfirm.isConfirmed) {
				const res = await axios.patch(
					`http://localhost:7124/api/v1/users/${userId}`,
					options
				);
				if (res.status === 200) {
					if (pathname === '/') {
						fetchUsers();
					} else {
						fetchUser(userId);
					}
					toast.success('Subscripción cancelada con éxito!');
					return;
				}
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	return {
		createUser,
		updateUser,
		deleteUser,
		unsubscribeUser,
	};
};

export default UserServices;
