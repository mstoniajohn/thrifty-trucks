import * as React from 'react';
import {
	Alert,
	Box,
	Button,
	Collapse,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { newRental } from '../features/rentals/rentalSlice';
import { calculateRentalPrice, getTruckSize } from 'utils/helpers';
import { MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const TruckForm = () => {
	const { currentUser } = useSelector((state) => state.user);
	const { currentRental } = useSelector((state) => state.rental);

	const dispatch = useDispatch();

	const [date, setDate] = React.useState(dayjs());
	const [truck, setTruck] = React.useState(1);
	const [startTime, setStartTime] = React.useState(
		dayjs().hour(dayjs().format('H'))
	);
	const [endTime, setEndTime] = React.useState('');
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const [openError, setOpenError] = React.useState(false);

	console.log(
		dayjs().format('H'),
		endTime,
		startTime,
		dayjs(startTime).format('H'),
		dayjs(endTime).format('H'),
		currentRental?.error
	);

	const handleChange = (event) => {
		setTruck(event.target.value);
	};
	const calculateRate = calculateRentalPrice(truck, startTime, endTime);

	const onSubmit = (e) => {
		e.preventDefault();

		const reservation = {
			date: dayjs(date).format('YYYY-MM-DD'),
			start_time: dayjs(startTime).format('H'),
			end_time: dayjs(endTime).format('H'),
			truck,
			hours: null,
			rate: null,
			email: currentUser ? currentUser.email : 'me',
			time_end: dayjs(endTime).format('hh:mm:ss'),
			time_start: dayjs(startTime).format('hh:mm:ss'),
			user: currentUser?.id,
		};

		dispatch(newRental(reservation));
		if (!currentRental?.error) {
			setOpenSuccess(true);
		}
		if (currentRental?.error) {
			setOpenError(true);
		}
	};

	return (
		<Container>
			<Box sx={{ maxWidth: 410 }} component="form" onSubmit={onSubmit}>
				{currentRental?.error && (
					<Collapse in={openError}>
						<Alert
							severity="error"
							sx={{ m: 2 }}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setOpenError(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
						>
							No availabiliy. Choose a different Truck, Time or Date
						</Alert>
					</Collapse>
				)}
				<Collapse in={openSuccess}>
					<Alert
						severity="success"
						sx={{ m: 2 }}
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpenSuccess(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						Thank you for booking with Thrifty Trucks
					</Alert>
				</Collapse>
				<FormControl fullWidth color="primary">
					<InputLabel id="demo-simple-select-label">Truck Type</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={truck}
						label="Truck"
						onChange={handleChange}
						sx={{ mb: 1, input: { color: '#A39A9A' } }}
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
							sx={{
								'&label': {
									color: 'primary.main',
								},
							}}
						/>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<MobileTimePicker
									label="Start Time"
									ampm={false}
									value={startTime}
									onChange={(newValue) => {
										setStartTime(newValue);
									}}
									sx={{
										'&label': {
											color: 'primary.main',
										},
									}}
									views={['hours']}
									renderInput={(params) => <TextField {...params} />}
								/>
							</Grid>
							<Grid item xs={6}>
								<MobileTimePicker
									label="End Time"
									ampm={false}
									value={endTime}
									minTime={startTime}
									onChange={(newValue) => {
										setEndTime(newValue);
									}}
									sx={{
										'&label': {
											color: 'primary.main',
										},
									}}
									views={['hours']}
									renderInput={(params) => <TextField {...params} />}
									// disabled={startTime === dayjs().hour(dayjs().format('H'))}
								/>
							</Grid>
						</Grid>
					</LocalizationProvider>
				</FormControl>

				<Button
					disabled={endTime === ''}
					variant="contained"
					type="submit"
					sx={{
						mt: 1,
						color: 'white',
					}}
				>
					Book
				</Button>
			</Box>
		</Container>
	);
};

export default TruckForm;
