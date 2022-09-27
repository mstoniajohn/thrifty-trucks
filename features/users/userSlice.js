import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	signInWithRedirect,
} from 'firebase/auth';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';
import { API_URL } from '@config/index';

const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const initialState = {
	currentUser: null,
	currentUserInfo: null,
	isAuthenticated: false,
	customer: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
};

// Sign in user and store in redux to send to backend
export const signInUserWithGoogle = createAsyncThunk(
	'user/loginGoogle',
	async () => {
		// catch errors if they occur during login
		try {
			// const response = await signInWithRedirect(auth, provider);
			// const results = await getRedirectResult(auth);
			// const credential = GoogleAuthProvider.credentialFromResult(results);
			// const user = results.user;
			const response = await signInWithPopup(auth, provider);
			// const cred = GoogleAuthProvider.credentialFromResult(response);
			const user = response.user;
			// add user to BE??

			const res = await fetch(`${API_URL}/api/v1/customers`);
			const cust = await res.json();
			const cust_id = cust.filter((u) => u.email === user?.email);
			const userObject = {
				id: '',
				email: user?.email,
				phone: user?.phone,
				photo: user?.photoURL,
				displayName: user?.displayName,
			};
			if (cust_id.length === 0) {
				// create a new customer
				const res = await fetch(`${API_URL}/api/v1/customers`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: user?.email,
						display_name: user?.displayName,
					}),
				});
				const cust = await res.json();
				userObject['id'] = cust.id;
			} else {
				userObject['id'] = cust_id.id;
			}

			return userObject;
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			// const email = error.customData?.email;
			// // The AuthCredential type that was used.
			// const credential = GoogleAuthProvider.credentialFromError(error);

			return { errorMessage };
		}
	}
);

export const signOutUser = createAsyncThunk('user/logout', async () => {
	try {
		const res = await signOut(auth);
		console.log(res);
	} catch (error) {
		console.error(error);
	}
});
// sign out user and update BE?
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[signInUserWithGoogle.pending]: (state, action) => {
			state.isLoading = true;
		},
		[signInUserWithGoogle.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isAuthenticated = true;
			state.isSuccess = true;
			state.currentUser = action.payload;
		},
		[signInUserWithGoogle.rejected]: (state, action) => {
			state.currentUser = null;
			state.isError = true;
			state.message = action.payload;
			state.isSuccess = false;
			state.isLoading = false;
			state.isAuthenticated = false;
		},
		[signOutUser.pending]: (state, action) => {
			state.isLoading = true;
		},
		[signOutUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isAuthenticated = false;
			state.isSuccess = true;
			state.currentUser = null;
		},
		[signOutUser.rejected]: (state, action) => {
			state.isError = true;
			state.message = action.payload;
			state.isSuccess = false;
			state.isLoading = false;
		},
	},
});

export default userSlice.reducer;
