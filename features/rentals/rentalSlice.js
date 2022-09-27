import { API_URL } from '@config/index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const initialState = {
	currentRental: null,
	rentals: {},
	userRentals: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
};

// Sign in user and store in redux to send to backend
export const newRental = createAsyncThunk(
	'rentals/add',
	async (reservation) => {
		// catch errors if they occur during login

		try {
			const res = await fetch(`${API_URL}/api/v1/reservation`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reservation),
			});
			const data = await res.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);

export const fetchUsersRentals = createAsyncThunk(
	'rentals/user',
	async (email) => {
		// catch errors if they occur during login
		try {
			const res = await fetch(
				`${API_URL}/api/v1/reservation?user__email=${email}`
			);
			const userRentals = res.json();

			return userRentals;
		} catch (error) {
			console.log(error);
			return { error: error.message };
		}
	}
);

/*
{
	date: '',
'truck': ',
slots:'start-end'
}
*/

// sign out user and update BE?
export const rentalSlice = createSlice({
	name: 'rental',
	initialState,
	reducers: {},
	extraReducers: {
		[newRental.pending]: (state, action) => {
			state.isLoading = true;
		},
		[newRental.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.currentRental = action.payload;
		},
		[newRental.rejected]: (state, action) => {
			state.isError = true;
			state.message = action.payload;
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
		},
	},
});

export default rentalSlice.reducer;
