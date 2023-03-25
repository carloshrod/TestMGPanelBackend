import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#a5c9ca',
		},
		secondary: {
			main: '#395b64',
		},
		success: {
			main: '#11cb5f',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#db2a34',
		},
	},
	typography: {
		fontFamily: ['Montserrat', 'Roboto', 'sans-serif'].join(','),
	},
});
