import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MyContainer = ({ children }) => {
	const { pathname } = useLocation();

	const TITLES = {
		'/': 'Administrar Usuarios',
	};

	return (
		<Box className='myContainer'>
			<Typography
				sx={{ pl: { sm: 3 }, fontSize: { xs: 24, sm: 34 } }}
				variant='h4'
			>
				{TITLES[pathname]}
			</Typography>
			<Grid container spacing={3} py={2}>
				{children}
			</Grid>
		</Box>
	);
};

export default MyContainer;
