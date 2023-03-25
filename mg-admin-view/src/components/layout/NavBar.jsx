import { Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<Box
			className='navbar'
			sx={{ flexGrow: 1, px: { xs: 2, sm: 2, md: 3, lg: 5 } }}
		>
			<Toolbar>
				<Link to='/'>
					<div className='navbar__logo'>
						<img src='wee.svg' alt='Logo Wee Logistics' />
						<Typography variant='h5' component='div'>
							<span>WEE</span> LOGISTICS
						</Typography>
					</div>
				</Link>
			</Toolbar>
		</Box>
	);
};

export default NavBar;
