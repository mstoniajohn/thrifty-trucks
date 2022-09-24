import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const initialState = {
	currentUser: null,
	currentUserInfo: null,
	isAuthenticated: false,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
};

// Sign in user and store in redux to send to backend
export const signInUserWithGoogle = createAsyncThunk('user/login', async () => {
	// catch errors if they occur during login
	try {
		const response = await signInWithPopup(auth, provider);
		const cred = GoogleAuthProvider.credentialFromResult(response);
		const user = response.user;
		// add user to BE??
		console.log(user, cred);

		const userObject = {
			id: user?.uid,
			email: user?.email,
			phone: user?.phone,
			photo: user?.photoURL,
			displayName: user?.displayName,
		};

		// If i wanna use firebase instead
		// const addUser = await setDoc(
		// 	doc(db, 'users', user?.uid),
		// 	{
		// 		name: user?.displayName,
		// 		email: user?.email,
		// 		photo: user.photoURL,
		// 		id: user.uid,
		// 	},
		// 	{ merge: true }
		// );
		return userObject;
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData?.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);

		return { errorMessage };
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
	},
});

export default userSlice.reducer;
