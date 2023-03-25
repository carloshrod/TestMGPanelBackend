import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext, useUsersContext } from '../context';
import UserServices from '../services/UserServices';

const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const { setOpenModal } = useGlobalContext();
	const { userToEdit, setUserToEdit } = useUsersContext();
	const { createUser, updateUser } = UserServices();

	useEffect(() => {
		if (userToEdit?._id) {
			setForm(userToEdit);
		} else {
			setForm(initialForm);
		}
	}, [userToEdit, initialForm]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!form.name || !form.email) {
			return toast.error('Todos los campos son requeridos!');
		}

		if (!regexEmail.test(form.email)) {
			return toast.error('Ingresa un email válido!');
		}

		try {
			if (!userToEdit) {
				await createUser(form);
			} else {
				await updateUser(form, userToEdit._id);
				setUserToEdit(null);
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setOpenModal({ status: false, title: null, child: null });
		}
	};

	return {
		form,
		setForm,
		handleInputChange,
		handleSubmit,
	};
};

export default useForm;
