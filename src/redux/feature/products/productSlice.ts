import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IProduct {
  id: string;
  addedBy: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  releaseDate: string;
  author: string;
  ISBN: string;
  genre: string;
  publisher: string;
  series?: string;
  language: string;
  format: string;
  pageCount: number;
}

interface ProductsState {
  products: IProduct[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.ISBN !== action.payload
      );
    },
    updateProduct(state, action: PayloadAction<IProduct>) {
      const index = state.products.findIndex(
        (product) => product.ISBN === action.payload.ISBN
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
