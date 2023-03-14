import axios from "axios";
import {addCartItem, setLoading, setError, removeCartItem} from "../slices/cart";

export const addToCart = (id, qty) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(`/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    };
    dispatch(addCartItem(itemToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(removeCartItem(id));
}
