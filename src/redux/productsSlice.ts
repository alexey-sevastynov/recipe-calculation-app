import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  listProducts: TypeItemProduct[];
  isEdit: boolean;
  productFormState: TypeItemProduct;
}

const initialState: IInitialState = {
  listProducts: [],
  isEdit: false,
  productFormState: {
    id: null,
    productName: "",
    netWeight: 0,
    weightUnit: "гр",
    price: 0,
  },
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

    editProduct: (state, action: PayloadAction<TypeItemProduct>) => {
      state.listProducts = state.listProducts.map((item) => {
        const id = action.payload.id;
        if (item.id === id) {
          console.log("edited", action.payload);
          return action.payload;
        }
        console.log("NOTedited", item.id, id);
        return item;
      });
    },

    showButtonEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },

    setProductFormState: (state, action: PayloadAction<TypeItemProduct>) => {
      state.productFormState = action.payload;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  editProduct,
  showButtonEdit,
  setProductFormState,
} = productsSlice.actions;

export default productsSlice.reducer;
