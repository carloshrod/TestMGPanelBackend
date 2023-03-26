import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MyContainer = ({ children }) => {
	const { pathname } = useLocation();

	const title =
		pathname === '/' ? 'Administrar Usuarios' : 'Detalles del Usuario';

	return (
		<Box sx={{ height: '100%', px: { xs: 4, sm: 6, md: 8, lg: 10 }, py: 6 }}>
			<Grid container spacing={3} py={2}>
				<Typography
					sx={{ pl: { xs: 3 }, fontSize: { xs: 24, sm: 34 } }}
					variant='h4'
				>
					{title}
				</Typography>

				{children}
			</Grid>
		</Box>
	);
};

export default MyContainer;
