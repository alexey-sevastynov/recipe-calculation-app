interface ListProductProps {
  listItems: TypeItemProduct[] | TypeItemRecipe[];
  ingredients?: RecipeWithSteps;
  setIngredients?: (
    ingredients: TypeItemProduct[] | TypeItemRecipe[] | RecipeWithSteps | null
  ) => void;
  noButtons?: boolean;
  nameRecipe?: string;
}
