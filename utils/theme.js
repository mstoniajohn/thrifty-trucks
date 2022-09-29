import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'light',

		primary: {
			main: '#fcba03',
		},
		text: {
			primary: '#A39A9A',
		},
	},
	typography: {
		color: '#A39A9A',
		caption: {
			color: '#A39A9A',
		},
		h5: {
			color: '#A39A9A',
		},
		body1: {},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					'&.Mui-disabled': {
						backgroundColor: '#ffef62',
					},
				},
			},
		},

		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: '#eee',
					'& .MuiOutlinedInput-notchedOutline': {
						border: 'none',
					},
					'&.Mui-focused': {
						'& .MuiOutlinedInput-notchedOutline': {
							border: 'none',
						},
					},
					'& .MuiOutlinedInput-input': {
						color: '#A39A9A',
					},
				},
			},
		},
	},
});
