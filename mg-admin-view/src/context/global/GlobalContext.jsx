import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const [openModal, setOpenModal] = useState({
		state: false,
		title: null,
		child: null,
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	const data = {
		openModal,
		setOpenModal,
		isLoading,
		setIsLoading,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
