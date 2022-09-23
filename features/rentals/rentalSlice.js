import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const initialState = {
	currentRental: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
};

// Sign in user and store in redux to send to backend
export const newRental = createAsyncThunk('rentals/add', async (rental) => {
	// catch errors if they occur during login
	console.log(rental);
	return rental;
});

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
	},
});

export default rentalSlice.reducer;
