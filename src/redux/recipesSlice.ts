import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  listRecipes: Recipe;
  recipeNameToEdit: string;
  isEditRecipe: boolean;
}

const initialState: IInitialState = {
  listRecipes: {},
  recipeNameToEdit: "",
  isEditRecipe: false,
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (
      state,
      action: PayloadAction<{
        nameRecipe: string;
        value: RecipeWithSteps | TypeItemRecipe[];
      }>
    ) => {
      const { nameRecipe, value } = action.payload;

      const isArray = Array.isArray(value);
      if (isArray) {
        state.listRecipes = { [nameRecipe]: value, ...state.listRecipes };
      } else {
        state.listRecipes = {
          [nameRecipe]: value,
          ...state.listRecipes,
        };
      }
    },

    deleteRecipe: (state, action: PayloadAction<string>) => {
      const recipeNameToDelete = action.payload;
      const listRecipe = state.listRecipes as Recipe;

      if (recipeNameToDelete in listRecipe) {
        delete listRecipe[recipeNameToDelete];
      }
    },

    editRecipe: (
      state,
      action: PayloadAction<{
        nameRecipe: string;
        value: RecipeWithSteps | TypeItemRecipe[];
      }>
    ) => {
      const { nameRecipe, value } = action.payload;

      const isArray = Array.isArray(value);

      if (isArray) {
        state.listRecipes = { ...state.listRecipes, [nameRecipe]: value };
      } else {
        state.listRecipes = {
          ...state.listRecipes,
          [nameRecipe]: value,
        };
      }
    },

    setRecipeNameToEdit: (state, action: PayloadAction<string>) => {
      state.recipeNameToEdit = action.payload;
    },
    setIsEditRecipe: (state, action: PayloadAction<boolean>) => {
      state.isEditRecipe = action.payload;
    },
  },
});

export const {
  addRecipe,
  deleteRecipe,
  editRecipe,
  setRecipeNameToEdit,
  setIsEditRecipe,
} = recipesSlice.actions;

export default recipesSlice.reducer;
