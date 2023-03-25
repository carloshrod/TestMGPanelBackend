import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [userToEdit, setUserToEdit] = useState(null);
	const [userLoaded, setUserLoaded] = useState(false);

	const fetchUsers = async () => {
		try {
			const res = await axios.get('http://localhost:7124/api/v1/users');
			if (res.status === 200 && res.data.length > 0) {
				return setUsers(res.data);
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUser = async userId => {
		try {
			setUserLoaded(false);
			const res = await axios.get(
				`http://localhost:7124/api/v1/users/${userId}`
			);
			if (res.status === 200) {
				return setUser(res.data);
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		} finally {
			setTimeout(() => {
				setUserLoaded(true);
			}, 1000);
		}
	};

	const data = {
		users,
		setUsers,
		fetchUsers,
		user,
		fetchUser,
		userToEdit,
		setUserToEdit,
		userLoaded,
	};

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

const useUsersContext = () => useContext(UsersContext);

export { UsersProvider, useUsersContext };
