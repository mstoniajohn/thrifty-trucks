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

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

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
	const [startTime, setStartTime] = React.useState(dayjs().hour(start_time));
	const [endTime, setEndTime] = React.useState(dayjs().hour(end_time));

	const [open, setOpen] = React.useState(false);
	const [openConfirm, setOpenConfirm] = React.useState(false);

	const handleClickOpenConfirm = () => {
		setOpenConfirm(true);
	};

	const handleCloseConfirm = () => {
		setOpenConfirm(false);
	};

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
		handleCloseConfirm();
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
		dispatch(fetchUsersRentals(currentUser?.email));
		setOpen(false);
	};

	return (
		<div>
			<Button sx={{ mr: 1 }} variant="outlined" onClick={handleClickOpen}>
				edit
			</Button>
			<Button color="error" variant="outlined" onClick={handleClickOpenConfirm}>
				delete
			</Button>
			<Dialog
				open={openConfirm}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseConfirm}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{"Use Google's location service?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Are you sure you want to cancel this booking?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDelete}>Yes</Button>
					<Button onClick={handleCloseConfirm}>No</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update </DialogTitle>
				<DialogContent>
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
											ampm={false}
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
											ampm={false}
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

						<DialogActions>
							<Button type="submit">Submit</Button>
						</DialogActions>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
						</DialogActions>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
