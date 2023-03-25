import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import NavBar from './components/layout/NavBar';
import { Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import { Footer, Loader, Modal, MyContainer } from './components';
import UserDetails from './pages/UserDetails';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from './context';

function App() {
	const { isLoading } = useGlobalContext();

	if (isLoading) return <Loader />;

	return (
		<ThemeProvider theme={theme}>
			<NavBar />
			<MyContainer>
				<Routes>
					<Route exact path='/' element={<Users />} />
					<Route path='/:userId' element={<UserDetails />} />
				</Routes>
			</MyContainer>
			<Footer />
			<Modal />
			<ToastContainer
				position='bottom-right'
				theme='dark'
				newestOnTop
				transition={Flip}
			/>
		</ThemeProvider>
	);
}

export default App;
