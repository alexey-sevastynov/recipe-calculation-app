import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  listProducts: TypeItemProduct[];
}

const initialState: IInitialState = {
  listProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
