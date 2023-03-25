import { Card, CardMedia, Grid, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader, UserActions, UserInfo } from '../components';
import { useUsersContext } from '../context';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserDetails = () => {
	const { fetchUser, userLoaded } = useUsersContext();
	const { userId } = useParams();

	useEffect(() => {
		fetchUser(userId);
	}, []);

	if (!userLoaded)
		return (
			<Grid item xs={12}>
				<Loader />
			</Grid>
		);

	return (
		<Grid item xs={12}>
			<Card
				sx={{
					position: 'relative',
					backgroundColor: '#1a1c23',
					color: '#e7f6f2',
				}}
			>
				<CardMedia
					component='img'
					height='300'
					image='/src/assets/bg-user-info.jpg'
					alt='header image'
					sx={{ bgcolor: 'azure' }}
				/>
				<Link to={-1}>
					<IconButton
						sx={{
							position: 'relative',
							top: '-290px',
							left: '10px',
							backgroundColor: '#24262d',
						}}
					>
						<ArrowBackIcon />
					</IconButton>
				</Link>
				<UserActions />
				<UserInfo />
			</Card>
		</Grid>
	);
};

export default UserDetails;
