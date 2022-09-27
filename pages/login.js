import Layout from '@components/layout/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const Login = () => {
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	if (currentUser) {
		router.push('/');
	}

	return <Layout>L</Layout>;
};

export default Login;
