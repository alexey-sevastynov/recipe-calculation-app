import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  listRecipes: Recipe;
  listDescripeRecipes: TypeItemRecipeDescripe[];
  recipeNameToEdit: string;
  isEditRecipe: boolean;
}

const initialState: IInitialState = {
  listRecipes: {},
  listDescripeRecipes: [],
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
        describe?: string;
        image?: string[];
      }>
    ) => {
      const { nameRecipe, value, describe, image } = action.payload;

      const isUniqueName = !Object.keys(state.listRecipes).some(
        (keyNameRecipe) => {
          console.log("keyNameRecipe: ", keyNameRecipe);
          console.log("nameRecipe: ", nameRecipe);

          return keyNameRecipe === nameRecipe;
        }
      );

      const isArray = Array.isArray(value);
      if (isArray) {
        state.listRecipes = { [nameRecipe]: value, ...state.listRecipes };
      } else {
        state.listRecipes = {
          [nameRecipe]: value,
          ...state.listRecipes,
        };
      }

      if (value && isUniqueName) {
        const currentDescribe = describe ? describe : "-";

        const objDescribe = {
          keyTitleRecipe: nameRecipe,
          describe: currentDescribe,
          image,
        };

        state.listDescripeRecipes = [objDescribe, ...state.listDescripeRecipes];
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
        describe?: string;
        image?: string[];
      }>
    ) => {
      const { nameRecipe, value, describe, image } = action.payload;

      const isArray = Array.isArray(value);

      if (isArray) {
        state.listRecipes = { ...state.listRecipes, [nameRecipe]: value };
      } else {
        state.listRecipes = {
          ...state.listRecipes,
          [nameRecipe]: value,
        };
      }

      if (describe) {
        console.log(describe);
        state.listDescripeRecipes = state.listDescripeRecipes.map((obj) => {
          console.log(
            "obj.keyTitleRecipe === nameRecipe:",
            obj.keyTitleRecipe === nameRecipe
          );

          return obj.keyTitleRecipe === nameRecipe ? { ...obj, describe } : obj;
        });
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
