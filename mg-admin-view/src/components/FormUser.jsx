import {
	Box,
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import useForm from '../hooks/useForm';
import { useGlobalContext, useUsersContext } from '../context';

export const initialForm = {
	name: '',
	email: '',
};

const FormUser = () => {
	const { form, handleInputChange, handleSubmit } = useForm(initialForm);
	const { setOpenModal } = useGlobalContext();
	const { setUserToEdit } = useUsersContext();

	const handleClose = () => {
		setOpenModal({ state: false, title: null, child: null });
		setUserToEdit(null);
	};

	const inputProps = [
		{
			id: 'idName',
			name: 'name',
			label: 'Nombre',
			type: 'text',
			icon: <PersonIcon />,
		},
		{
			id: 'idEmail',
			name: 'email',
			label: 'Email',
			type: 'text',
			icon: <EmailIcon />,
		},
	];

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit}
			sx={{ mt: 1, gap: 4 }}
		>
			{inputProps.map((item, i) => (
				<FormControl key={i} sx={{ width: { md: 320 } }} variant='outlined'>
					<InputLabel htmlFor={item.id}>{item.label}</InputLabel>
					<OutlinedInput
						id={item.id}
						name={item.name}
						value={form[item.name]}
						type={'text'}
						startAdornment={
							<InputAdornment position='start'>{item.icon}</InputAdornment>
						}
						label={item.label}
						onChange={handleInputChange}
					/>
				</FormControl>
			))}
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button
					sx={{ width: 100 }}
					variant='outlined'
					color='warning'
					onClick={handleClose}
				>
					Cerrar
				</Button>
				<Button
					sx={{ width: 100 }}
					variant='outlined'
					type='submit'
					color='success'
				>
					Enviar
				</Button>
			</Box>
		</Stack>
	);
};

export default FormUser;
