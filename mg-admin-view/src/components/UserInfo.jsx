import {
	Avatar,
	Box,
	CardContent,
	Chip,
	Grid,
	Tooltip,
	Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useUsersContext } from '../context';
import UserServices from '../services/UserServices';

const UserInfo = () => {
	const { user } = useUsersContext();
	const { unsubscribeUser } = UserServices();

	const isSubs = user.subscribed;

	const handleSubs = userId => {
		unsubscribeUser(userId);
	};

	return (
		<CardContent sx={{ p: 3 }}>
			<Grid container className='userInfo'>
				<Grid
					item
					xs={12}
					sm={5}
					sx={{ textAlign: 'center', mt: { xs: -11, sm: -13 } }}
				>
					<Avatar
						alt='Superadmin'
						src='src/assets/my-avatar.png'
						sx={{
							width: { xs: 120, sm: 150 },
							height: { xs: 120, sm: 150 },
							m: 'auto',
							mb: 1,
						}}
					/>
					<Box mb={2}>
						<Typography variant='h5'>{user.name}</Typography>
					</Box>
					<Typography className='email'>
						<EmailIcon />
						{user.email}
					</Typography>
					<Tooltip title='Cancelar subscripción' arrow>
						<Chip
							sx={{
								cursor: `${isSubs ? 'pointer' : 'not-allowed'}`,
							}}
							label={isSubs ? <CheckIcon /> : <CloseIcon />}
							color={`${isSubs ? 'success' : 'warning'}`}
							onClick={isSubs ? () => handleSubs(user._id) : null}
						/>
					</Tooltip>
				</Grid>
				<Grid
					item
					xs={12}
					sm={7}
					sx={{ alignSelf: 'center', textAlign: 'justify' }}
				>
					<Typography element={'p'} mx={2}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
						natus excepturi, voluptatem inventore, sint, vel placeat dolor enim
						quod assumenda animi quae quasi labore.
					</Typography>
				</Grid>
			</Grid>
		</CardContent>
	);
};

export default UserInfo;
