import axios from "axios";
import {
	setProducts,
	setProduct,
	setLoading,
	setError,
	productReviewed,
	resetError,
} from "../slices/products";

export const getProducts = () => async (dispatch) => {
	dispatch(setLoading());
	try {
		const {data} = await axios.get("/api/products");
		dispatch(setProducts(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data
					: error.message
					? error.message
					: "An unexpected error has occured. Please try again later."
			)
		);
	}
};

export const getProduct = (id) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const {data} = await axios.get(`/api/products/${id}`);
		dispatch(setProduct(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data
					: error.message
					? error.message
					: "An unexpected error has occured. Please try again later."
			)
		);
	}
};

export const createProductReview =
	(productId, userId, comment, rating, title) => async (dispatch, getState) => {
		dispatch(setLoading());

		const {
			user: {userInfo},
		} = getState();

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
					"Content-Type": "application/json",
				},
			};

			await axios.post(
				`/api/products/${productId}/reviews`,
				{comment, userId, rating, title},
				config
			);

			dispatch(productReviewed());
		} catch (error) {
			dispatch(
				setError(
					error.response && error.response.data
						? error.response.data
						: error.message
						? error.message
						: "An unexpected error has occured. Please try again later."
				)
			);
		}
	};

export const resetProductError = () => async (dispatch) => {
	dispatch(resetError());
};