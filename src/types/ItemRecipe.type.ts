type TypeItemRecipe = {
  id: number;
  productName: string;
  netWeight: number;
  weightUnit: string;
};

type RecipeWithSteps = {
  [stage: string]: TypeItemRecipe[];
};

type Recipe = {
  [recipeName: string]: RecipeWithSteps | TypeItemRecipe[];
};
