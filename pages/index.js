import Layout from '../components/layout/Layout';
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import TruckForm from '../components/TruckForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsersRentals } from '@features/rentals/rentalSlice';
import { useRouter } from 'next/router';
import { getTruckImage, getTruckSize } from 'utils/helpers';
import dayjs from 'dayjs';
import UpdateForm from '@components/UpdateForm';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Home() {
	const { currentUser } = useSelector((state) => state.user);
	const { userRentals, currentRental } = useSelector((state) => state.rental);
	console.log(userRentals);

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
			<Grid container spacing={4} sx={{ padding: 1, mt: 2 }}>
				<Grid item xs={12} md={6}>
					<Typography variant="h5" align="center">
						Book a Truck
					</Typography>

					<Box>
						<TruckForm />
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					{/* get rentals for current user */}
					<Typography variant="h5" align="center">
						{userRentals?.length === 0
							? 'No Rentals Yet'
							: 'Upcoming Truck Rentals'}
					</Typography>
					{userRentals?.map(
						({
							id,
							date,
							truck,
							rate,
							time_end,
							time_start,
							start_time,
							end_time,
						}) => (
							<Box key={id}>
								<Card sx={{ display: 'flex', mb: 1 }}>
									<Box sx={{ display: 'flex', flexDirection: 'column' }}>
										<CardContent sx={{ flex: '1 0 auto' }}>
											<Typography component="div" variant="h6">
												{getTruckSize(truck)}
											</Typography>
											<Typography
												variant="caption"
												color="text.secondary"
												component="div"
											>
												when: {dayjs(date).format('dddd, MMM D')}
											</Typography>
											<Typography
												variant="caption"
												color="text.secondary"
												component="div"
											>
												at: {time_start} - {time_end}
											</Typography>
											<Typography
												variant="caption"
												color="text.secondary"
												component="div"
											>
												cost: ${rate}
											</Typography>
										</CardContent>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												pl: 1,
												pb: 1,
											}}
										>
											<UpdateForm
												id={id}
												date={date}
												rate={rate}
												time_end={time_end}
												time_start={time_start}
												truck={truck}
												start_time={start_time}
												end_time={end_time}
											/>
										</Box>
									</Box>
									<CardMedia
										component="img"
										sx={{
											width: '100%',
											maxWidth: '120px',
											height: 'auto',
											alignSelf: 'center',
										}}
										image={getTruckImage(truck)}
										alt="Live from space album cover"
									/>
								</Card>
							</Box>
						)
					)}
				</Grid>
			</Grid>
		</Layout>
	);
}
