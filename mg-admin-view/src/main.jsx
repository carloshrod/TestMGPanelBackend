import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { GlobalProvider, UsersProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<GlobalProvider>
			<UsersProvider>
				<App />
			</UsersProvider>
		</GlobalProvider>
	</Router>
);
