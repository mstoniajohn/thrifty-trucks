import React from 'react';
import Head from 'next/head';
import { Container } from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
	return (
		<div style={{ padding: ' 0 2rem' }}>
			<Head>
				<title>Thrifty Trucks</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />

			<Container
				component="main"
				sx={{
					minHeight: '100vh',
					display: 'flex',
					flex: 1,

					flexDirection: 'column',
					padding: '4rem 0',
				}}
			>
				{children}
			</Container>

			<Container
				component="footer"
				sx={{ display: 'flex', flex: 1, padding: '2rem 0' }}
			>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					{/* <span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span> */}
				</a>
			</Container>
		</div>
	);
};

export default Layout;
