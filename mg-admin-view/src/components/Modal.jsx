import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useGlobalContext, useUsersContext } from '../context';

const Modal = () => {
	const { openModal, setOpenModal } = useGlobalContext();
	const { setUserToEdit } = useUsersContext();

	const handleClose = () => {
		setOpenModal({ state: false, title: null, child: null });
		setUserToEdit(null);
	};

	if (!openModal.child) return null;

	return (
		<Dialog open={openModal.state} onClose={handleClose}>
			<DialogTitle>{openModal.title} usuario</DialogTitle>
			<DialogContent>{openModal.child}</DialogContent>
		</Dialog>
	);
};

export default Modal;
