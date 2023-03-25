import { Button, Toolbar, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../context';
import FormUser from '../FormUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const DataTableToolbar = () => {
	const { setOpenModal } = useGlobalContext();

	const handleOpen = () => {
		setOpenModal({ state: true, title: 'Registrar', child: <FormUser /> });
	};

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography
				sx={{ flex: '1 1 50%' }}
				variant='h6'
				id='tableTitle'
				component='div'
			>
				Filter
			</Typography>
			<Tooltip title='Agregar usuario' arrow>
				<Button
					sx={{ width: '100px', fontSize: { xs: 12, sm: 14 } }}
					variant='outlined'
					color='success'
					onClick={handleOpen}
				>
					<PersonAddIcon />
				</Button>
			</Tooltip>
		</Toolbar>
	);
};

DataTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default DataTableToolbar;
