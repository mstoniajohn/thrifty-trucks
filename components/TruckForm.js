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

const TruckForm = () => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [date, setDate] = React.useState(null);
	const [truck, setTruck] = React.useState('');
	const [startTime, setStartTime] = React.useState(null);
	const [endTime, setEndTime] = React.useState(null);
	const [totalHours, setTotalHours] = React.useState(0);
	const rates = {
		'Extra Small': 20,
		Small: 30,
	};
	const calculatRate =
		startTime && endTime
			? `$${
					rates[truck] * (dayjs(endTime).hour() - dayjs(startTime).hour())
			  }.00`
			: `$0.00`;

	const handleChange = (event) => {
		setTruck(event.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setTotalHours((endTime - startTime) % 24);

		const reservation = {
			date: moment(date).format('YYYY-MM-DD'),
			start_time: dayjs(startTime).hour(),
			end_time: dayjs(endTime).hour(),
			truck,
			hours: dayjs(endTime).hour() - dayjs(startTime).hour(),
			rate: null,
			email: currentUser ? currentUser.email : 'me',
			time_end: '09:00',
			time_start: '11:00',
			user: currentUser ? currentUser.id : 1,
			// time_end: dayjs(endTime),
			// time_start: dayjs(startTime),
		};
		fetch('http://127.0.0.1:8000/api/v1/reservation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reservation),
		})
			.then((res) => {
				console.log(res.json());
			})
			.catch((err) => {
				console.log(err);
			});

		console.log(reservation);
		dispatch(newRental(reservation));
		// Maybe submit date and and hours -> then save in redux state for current users
		// Then show rates on new screen

		//  Allow for changeing hours and date and teuck to calculate rates befor moving forward
		// load spinner for moving forward
		// After submit move to next screen for rates
	};

	return (
		<Container>
			<Box sx={{ maxWidth: 410 }} component="form" onSubmit={onSubmit}>
				{/* Add form mid width */}
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Trucks</InputLabel>
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
						{/* <MenuItem value="Full-size">Medium</MenuItem>
						<MenuItem value="Heavy Duty">Large</MenuItem>
						<MenuItem value="Heavy Duty">Extra Large</MenuItem> */}
					</Select>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Date"
							value={date}
							onChange={(newValue) => {
								setDate(newValue);
							}}
							renderInput={(params) => <TextField {...params} sx={{ mb: 1 }} />}
						/>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<TimePicker
									label="StartTime"
									value={startTime}
									views={['hours']}
									onChange={(newValue) => {
										setStartTime(newValue);
									}}
									renderInput={(params) => (
										<TextField {...params} sx={{ maxWidth: 200 }} />
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TimePicker
									label="End Time"
									value={endTime}
									onChange={(newValue) => {
										setEndTime(newValue);
									}}
									minTime={startTime ? startTime.add(1, 'hour') : 0}
									views={['hours']}
									renderInput={(params) => (
										<TextField {...params} sx={{ maxWidth: 200 }} />
									)}
								/>
							</Grid>
						</Grid>
					</LocalizationProvider>
				</FormControl>
				<Typography>
					Current Rate:{' '}
					{truck !== '' ? calculatRate : 'Select truck size or time'}
				</Typography>
				<Button type="submit">Submit</Button>
			</Box>
		</Container>
	);
};

export default TruckForm;
