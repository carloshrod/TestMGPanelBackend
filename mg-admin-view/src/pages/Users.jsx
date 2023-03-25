import { Grid } from '@mui/material';
import { DataTable } from '../components';
import { useUsersContext } from '../context';

const Users = () => {
	const { users } = useUsersContext();

	return (
		<Grid item xs={12}>
			<DataTable users={users} />
		</Grid>
	);
};

export default Users;
