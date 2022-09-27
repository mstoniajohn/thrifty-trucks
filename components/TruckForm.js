import * as React from 'react';
import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { newRental } from '../features/rentals/rentalSlice';
import { API_URL } from '@config/index';
import { calculateRentalPrice } from 'utils/helpers';
import { MobileTimePicker } from '@mui/x-date-pickers';

const TruckForm = () => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [date, setDate] = React.useState(null);
	const [truck, setTruck] = React.useState(null);
	const [startTime, setStartTime] = React.useState(null);
	const [endTime, setEndTime] = React.useState(null);
	const [totalHours, setTotalHours] = React.useState(0);
	const hours = dayjs(endTime).hour() - dayjs(startTime).hour();

	const handleChange = (event) => {
		setTruck(event.target.value);
	};
	const calculateRate = calculateRentalPrice(truck, startTime, endTime);

	const onSubmit = (e) => {
		e.preventDefault();
		setTotalHours((endTime - startTime) % 24);

		console.log(totalHours);
		const reservation = {
			date: moment(date).format('YYYY-MM-DD'),
			start_time: dayjs(startTime).hour(),
			end_time: dayjs(endTime).hour(),
			truck,
			hours: hours % 24,
			rate: null,
			email: currentUser ? currentUser.email : 'me',
			time_end: dayjs(endTime).format('hh:mm:ss'),
			time_start: dayjs(startTime).format('hh:mm:ss'),
			user: currentUser ? currentUser.id : 1,
		};

		dispatch(newRental(reservation));
	};

	return (
		<Container>
			<Box sx={{ maxWidth: 410 }} component="form" onSubmit={onSubmit}>
				{/* Add form mid width */}
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Truck Type</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={truck}
						label="Truck"
						onChange={handleChange}
						sx={{ mb: 1 }}
					>
						<MenuItem value={1}>Extra Small</MenuItem>
						<MenuItem value={2}>Small</MenuItem>
						<MenuItem value={3}>Medium</MenuItem>
						<MenuItem value={4}>Large</MenuItem>
						<MenuItem value={5}>Extra Large</MenuItem>
					</Select>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							disablePast
							label="Date"
							value={date}
							onChange={(newValue) => {
								setDate(newValue);
							}}
							renderInput={(params) => <TextField {...params} sx={{ mb: 1 }} />}
						/>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<MobileTimePicker
									label="Start Time"
									ampm
									value={startTime}
									onChange={(newValue) => {
										setStartTime(newValue);
									}}
									views={['hours']}
									renderInput={(params) => <TextField {...params} />}
								/>
							</Grid>
							<Grid item xs={6}>
								<MobileTimePicker
									label="End Time"
									ampm
									value={endTime}
									minTime={startTime?.add(1, 'hour')}
									onChange={(newValue) => {
										setEndTime(newValue);
									}}
									views={['hours']}
									renderInput={(params) => <TextField {...params} />}
									disabled={startTime === null}
								/>
							</Grid>
						</Grid>
					</LocalizationProvider>
				</FormControl>
				<Typography>
					Current Rate:{' '}
					{truck !== null ? calculateRate : 'Select truck size or time'}
				</Typography>
				<Button type="submit">Submit</Button>
			</Box>
		</Container>
	);
};

export default TruckForm;
