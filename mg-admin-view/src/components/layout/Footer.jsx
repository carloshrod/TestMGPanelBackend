import { Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<Box className='footer' sx={{ display: 'flex', alignItems: 'center' }}>
			<Typography component='div'>Developed by</Typography>
			<Link
				to='https://github.com/carloshrod'
				target='_blank'
				rel='noopener noreferrer'
			>
				<span>CHRod</span> <GitHubIcon />
			</Link>
		</Box>
	);
};

export default Footer;
