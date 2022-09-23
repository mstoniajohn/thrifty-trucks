import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Switch from '@mui/material/Switch';
import Layout from '../components/layout/Layout';
import { Box, Typography } from '@mui/material';
import TruckForm from '../components/TruckForm';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Home() {
	// list truck sizes with prices per hour
	return (
		<Layout>
			<Typography variant="h1">Homepage</Typography>
			<Box>
				<TruckForm />
			</Box>
		</Layout>
	);
}
