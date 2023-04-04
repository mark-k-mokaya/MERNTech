import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
	loading: false,
	error: null,
	userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
	updateSuccess: false,
	orders: []
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		userLogin: (state, {payload}) => {
			state.loading = false;
			state.error = null;
			state.userInfo = payload;
		},
		userLogout: (state) => {
			state.loading = false;
			state.error = null;
			state.userInfo = null;
		},
		setError: (state, {payload}) => {
			state.loading = false;
			state.error = payload;
		},
		updateUserProfile: (state, {payload}) => {
			state.loading = false;
			state.userInfo = payload;
			state.updateSuccess = true;
			state.error = null;
		},
		resetUpdate: (state) => {
			state.updateSuccess = false;
		},
		setUserOrders: (state, {payload}) => {
			state.error = null;
			state.loading = false;
			state.orders = payload;
		},
	},
});

export const {
	setLoading,
	setError,
	userLogin,
	userLogout,
	updateUserProfile,
	resetUpdate,
	setUserOrders
} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;
