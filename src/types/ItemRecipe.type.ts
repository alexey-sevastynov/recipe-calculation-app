type TypeItemRecipe = {
  id: number;
  productName: string;
  netWeight: number;
  weightUnit: UnitsType;
  price?: number;
};

type RecipeWithSteps = {
  [stage: string]: TypeItemRecipe[];
};

type Recipe = {
  [recipeName: string]: RecipeWithSteps | TypeItemRecipe[];
};
