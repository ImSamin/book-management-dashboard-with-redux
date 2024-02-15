import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import productsReducer from "./feature/products/productSlice";
import historySalesReducer from "./feature/SaleHistory/saleHistorySlice";
import loginReducer from "./feature/auth/loginSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    historySales: historySalesReducer,
    login: loginReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
