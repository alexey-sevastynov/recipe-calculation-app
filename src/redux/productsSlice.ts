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
  reducers: {
    addProduct: (state, action: PayloadAction<TypeItemProduct>) => {
      const productName = action.payload.productName;

      const isNameUnique = state.listProducts.some(
        (item) => item.productName === productName
      );

      if (!isNameUnique) {
        state.listProducts = [action.payload, ...state.listProducts];
      }
    },
    deleteProduct: (state, action: PayloadAction<number | null>) => {
      state.listProducts = state.listProducts.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
