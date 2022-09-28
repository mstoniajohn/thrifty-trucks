import Layout from '@components/layout/Layout';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google';
import { signInUserWithGoogle } from '@features/users/userSlice';

const Login = () => {
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	if (currentUser) {
		router.push('/');
	}
	const dispatch = useDispatch();
	const logIn = () => {
		dispatch(signInUserWithGoogle());
	};

	return (
		<Layout>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					flexDirection: 'column',
				}}
			>
				<Typography variant="h5">Welcome to Thrifty Trucks.</Typography>
				<Typography sx={{ mb: 2 }}>
					Sign in to book or view your rentals
				</Typography>

				<Button
					sx={{ color: 'white' }}
					variant="contained"
					endIcon={<GoogleIcon sx={{ color: 'white' }} />}
					onClick={logIn}
				>
					Sign In With Google
				</Button>
			</Box>
		</Layout>
	);
};

export default Login;
