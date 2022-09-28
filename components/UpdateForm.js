import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
	DatePicker,
	LocalizationProvider,
	MobileTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
	deleteRental,
	fetchUsersRentals,
	updateRental,
} from '@features/rentals/rentalSlice';

export default function UpdateForm({
	id,
	rate,
	time_start,
	time_end,
	start_time,
	end_time,
	truck,
	date,
}) {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [oldDate, setOldDate] = React.useState(date);
	const [newTruck, setNewTruck] = React.useState(truck);
	const [startTime, setStartTime] = React.useState(dayjs(start_time));
	const [endTime, setEndTime] = React.useState(dayjs(end_time));

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleChange = (event) => {
		setNewTruck(event.target.value);
	};
	const handleDelete = () => {
		dispatch(deleteRental(id));
		dispatch(fetchUsersRentals(currentUser.email));
	};
	const onSubmit = (e) => {
		e.preventDefault();

		const reservation = {
			date: dayjs(oldDate).format('YYYY-MM-DD'),
			start_time: dayjs(startTime).format('H'),
			end_time: dayjs(endTime).format('H'),
			newTruck,
			hours: null,
			rate: null,
			email: currentUser ? currentUser.email : 'me',
			time_end: dayjs(endTime).format('hh:mm:ss'),
			time_start: dayjs(startTime).format('hh:mm:ss'),
			user: currentUser.id,
		};

		dispatch(updateRental(id, reservation));
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				edit
			</Button>
			<Button color="error" variant="outlined" onClick={handleDelete}>
				delete
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update </DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<Box component="form" onSubmit={onSubmit}>
						<FormControl fullWidth color="primary">
							<InputLabel id="demo-simple-select-label">Truck Type</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={newTruck}
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
									value={oldDate}
									onChange={(newValue) => {
										setOldDate(newValue);
									}}
									renderInput={(params) => (
										<TextField {...params} sx={{ mb: 1 }} />
									)}
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
											onChange={(newValue) => {
												setEndTime(newValue);
											}}
											views={['hours']}
											renderInput={(params) => <TextField {...params} />}
										/>
									</Grid>
								</Grid>
							</LocalizationProvider>
						</FormControl>
						<Button type="submit">Submit</Button>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
