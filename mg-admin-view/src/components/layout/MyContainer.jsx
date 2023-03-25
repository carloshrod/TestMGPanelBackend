import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MyContainer = ({ children }) => {
	const { pathname } = useLocation();

	const title =
		pathname === '/' ? 'Administrar Usuarios' : 'Detalles del Usuario';

	return (
		<Box className='myContainer'>
			<Typography
				sx={{ pl: { sm: 3 }, fontSize: { xs: 24, sm: 34 } }}
				variant='h4'
			>
				{title}
			</Typography>
			<Grid container spacing={3} py={2}>
				{children}
			</Grid>
		</Box>
	);
};

export default MyContainer;
