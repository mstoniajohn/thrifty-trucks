import { API_URL } from '@config/index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const initialState = {
	currentRental: null,
	rentals: {},
	userRentals: null,
	edittedRental: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Sign in user and store in redux to send to backend
export const newRental = createAsyncThunk(
	'rentals/add',
	async (reservation) => {
		// catch errors if they occur during login

		try {
			const res = await axios.post(
				`${API_URL}/api/v1/reservation`,
				reservation
			);
			const data = await res.data;
			return data;
		} catch (error) {
			console.log(error);

			return error.message;
		}
	}
);
export const updateRental = createAsyncThunk(
	'rentals/update',
	async (reservation) => {
		// catch errors if they occur during login

		try {
			const res = await axios.put(
				`${API_URL}/api/v1/reservation/${reservation?.id}`,
				reservation
			);
			const data = await res.data;
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);
export const deleteRental = createAsyncThunk('rentals/delete', async (id) => {
	try {
		const res = await axios.delete(`${API_URL}/api/v1/reservation/${id}`);
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchUsersRentals = createAsyncThunk(
	'rentals/user',
	async (email) => {
		// catch errors if they occur during login
		try {
			const res = await axios.get(
				`${API_URL}/api/v1/reservation?user__email=${email}`
			);
			const userRentals = await res.data;

			return userRentals;
		} catch (error) {
			console.log(error);
		}
	}
);

// sign out user and update BE?
export const rentalSlice = createSlice({
	name: 'rental',
	initialState,
	reducers: {},
	extraReducers: {
		[newRental.pending]: (state, action) => {
			state.isLoading = true;
			state.message = '';
			state.currentRental = null;
		},
		[newRental.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.currentRental = action.payload;
			state.message =
				action.payload === 'Request failed with status code 500'
					? action.payload
					: '';
		},
		[newRental.rejected]: (state, action) => {
			state.isError = true;
			state.message = action.payload;
			state.currentRental = null;
			state.isSuccess = false;
		},
		[fetchUsersRentals.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchUsersRentals.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.userRentals = action.payload;
		},
		[fetchUsersRentals.rejected]: (state, action) => {
			state.isError = true;
			state.message = action.payload;
			state.isSuccess = false;

			state.userRentals = null;
		},
		[updateRental.pending]: (state, action) => {
			state.isLoading = true;
		},
		[updateRental.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.currentRental = action.payload;
		},
		[updateRental.rejected]: (state, action) => {
			state.isError = true;
			state.message = action.payload;
			state.currentRental = null;
		},
		// [deleteRental.pending]: (state, action) => {
		// 	state.isLoading = true;
		// },
		// [deleteRental.fulfilled]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// },
		// [deleteRental.rejected]: (state, action) => {
		// 	state.isError = true;
		// 	state.message = action.payload;
		// },
	},
});

export default rentalSlice.reducer;
