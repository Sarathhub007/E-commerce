import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import AdminProductSlice from"./admin/products-slice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminproducts:AdminProductSlice,
  },
});
export default store;
