import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import AdminProductSlice from"./admin/products-slice"
import shoppingProductSlice from "./shop/Products-slice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminproducts:AdminProductSlice,
    shopProducts:shoppingProductSlice,
  },
});
export default store;
