import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setProduct: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.product = payload;
    },
    setError: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {setLoading, setProducts, setProduct, setError} = productsSlice.actions;

export default productsSlice.reducer;

export const productsSelector = (state) => state.products;

