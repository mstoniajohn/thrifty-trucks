import Layout from '@components/layout/Layout';
import React from 'react';

const Login = () => {
	const { currentUser } = useSelector((state) => state.user);
	if (currentUser) {
		router.push('/');
	}

	return <Layout>L</Layout>;
};

export default Login;
