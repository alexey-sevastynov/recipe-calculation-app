interface ItemProductProps extends TypeItemProduct {
  noButtons?: boolean;
  listItems?: TypeItemProduct[] | TypeItemRecipe[] | undefined;
  setIngredients?: (
    ingredients: TypeItemProduct[] | TypeItemRecipe[] | RecipeWithSteps | null
  ) => void;
  nameRecipe?: string | undefined;
  ingredients?: RecipeWithSteps;
}
