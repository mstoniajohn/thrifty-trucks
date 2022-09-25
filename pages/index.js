import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Switch from '@mui/material/Switch';
import Layout from '../components/layout/Layout';
import { Box, Typography } from '@mui/material';
import TruckForm from '../components/TruckForm';
import { useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Home({ sizes, trucks }) {
	// list truck sizes with prices per hour
	const { currentUser } = useSelector((state) => state.user);
	console.log(currentUser, trucks, sizes);
	return (
		<Layout>
			<Typography variant="h1">Homepage</Typography>
			<Box>
				<TruckForm />
			</Box>
			{/* Show past rentals for current user if any */}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch('http://127.0.0.1:8000/api/');
	const trucks = await res.json();

	const ress = await fetch('http://127.0.0.1:8000/api/size/');
	const sizes = await ress.json();

	return {
		props: {
			trucks,
			sizes,
		},
	};
}
