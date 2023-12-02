import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  listRecipes: Recipe | {};
}

const initialState: IInitialState = {
  listRecipes: {},
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
  },
});

export const { addRecipe, deleteRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;