import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ISale {
  id: string;
  buyerName: string;
  productName: string;
  quantity: number;
  saleDate: string;
}

interface ISalesState {
  saleHistory: ISale[];
  startDate: string | undefined;
}

const initialState: ISalesState = {
  saleHistory: [],
  startDate: undefined,
};

const historySlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addSale(state, action: PayloadAction<ISale[]>) {
      state.saleHistory = action.payload;
    },
    AddStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
  },
});

export const { addSale, AddStartDate } = historySlice.actions;

export default historySlice.reducer;
