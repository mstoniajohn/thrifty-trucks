import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Switch from '@mui/material/Switch';
import Layout from '../components/layout/Layout';
import { Box, Grid, Typography } from '@mui/material';
import TruckForm from '../components/TruckForm';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '@config/index';
import { useEffect } from 'react';
import { fetchUsersRentals } from '@features/rentals/rentalSlice';
import { useRouter } from 'next/router';
import moment from 'moment';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Home({ reservations, trucks }) {
	// list truck sizes with prices per hour
	const { currentUser } = useSelector((state) => state.user);
	const { userRentals, currentRental } = useSelector((state) => state.rental);

	const dispatch = useDispatch();
	const router = useRouter();
	if (currentUser === null) {
		router.push('/login');
	}

	useEffect(() => {
		dispatch(fetchUsersRentals(currentUser?.email));
	}, [currentUser, currentRental]);

	return (
		<Layout>
			<Grid container spacing={4} sx={{ padding: 1 }}>
				<Grid item xs={12} md={6}>
					<Typography variant="h6">Homepage</Typography>
					<Box>
						<TruckForm />
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					{/* get rentals for current user */}
					{userRentals?.map(({ id, date, truck, rate }) => (
						<Box key={id}>
							<Typography>{moment(date).format('l')}</Typography>
							<Typography>{truck}</Typography>
						</Box>
					))}
				</Grid>
			</Grid>

			{/* Show past rentals for current user if any */}
		</Layout>
	);
}

// export async function getStaticProps() {
// 	const rentals =
// 	return {
// 		props: { rentals },
// 	};
// }
