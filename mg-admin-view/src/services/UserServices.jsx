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
			toast.error(error.response?.data?.msg || error.message);
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
				if (pathname !== '/') fetchUser(userId);
				toast.success('Usuario actualizado con éxito!');
				return;
			}
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.msg || error.message);
		}
	};

	const deleteUser = async userId => {
		try {
			const resConfirm = await Swal.fire({
				icon: 'warning',
				html: `¿Estás seguro de que quieres eliminar este usuario de forma permanente? <br> <br> <b>¡No podrás revertir esta acción!</b>`,
				showCancelButton: true,
				confirmButtonColor: '#20cb84',
				confirmButtonText: 'Aceptar',
				cancelButtonColor: '#dc4035',
				cancelButtonText: 'Cancelar',
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
					navigate('/');
					return;
				}
			}
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.msg || error.message);
		}
	};

	const unsubscribeUser = async userId => {
		try {
			const resConfirm = await Swal.fire({
				icon: 'warning',
				html: `¿Estás seguro que quieres cancelar la subscripción de este usuario?`,
				showCancelButton: true,
				confirmButtonColor: '#20cb84',
				confirmButtonText: 'Aceptar',
				cancelButtonColor: '#dc4035',
				cancelButtonText: 'Cancelar',
				width: '24em',
			});
			if (resConfirm.isConfirmed) {
				const res = await axios.patch(
					`http://localhost:7124/api/v1/users/${userId}`,
					options
				);
				if (res.status === 200) {
					fetchUsers();
					if (pathname !== '/') fetchUser(userId);
					toast.success('Subscripción cancelada con éxito!');
					return;
				}
			}
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.msg || error.message);
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
