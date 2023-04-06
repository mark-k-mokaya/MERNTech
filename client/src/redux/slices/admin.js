import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
	error: null,
	userList: null,
	loading: false,
	userRemoval: false,
	orders: null,
	orderRemoval: false,
	deliveredFlag: false,
};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setError: (state, {payload}) => {
			state.loading = false;
			state.error = payload;
		},
		getUsers: (state, {payload}) => {
			state.userList = payload;
			state.error = null;
			state.loading = false;
		},
		getOrders: (state, {payload}) => {
			state.orders = payload;
			state.error = null;
			state.loading = false;
		},
		userDelete: (state) => {
			state.error = null;
			state.loading = false;
			state.userRemoval = true;
		},
		orderDelete: (state) => {
			state.error = null;
			state.loading = false;
			state.orderRemoval = true;
		},
		resetError: (state) => {
			state.error = null;
			state.loading = false;
			state.userRemoval = false;
			state.orderRemoval = false;
			state.deliveredFlag = false;
		},
		setDeliveredFlag: (state) => {
			state.deliveredFlag = true;
			state.loading = false;	
		},
	},
});

export const {setLoading, setError, getUsers, userDelete, resetError, getOrders, orderDelete, setDeliveredFlag} =
	adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
