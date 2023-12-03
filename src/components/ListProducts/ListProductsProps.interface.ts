interface ListProductProps {
  listItems: TypeItemProduct[] | TypeItemRecipe[];
  ingredients?: RecipeWithSteps;
  // setIngredients?: (
  //   ingredients: TypeItemProduct[] | TypeItemRecipe[] | RecipeWithSteps | null
  // ) => void;
  setIngredients?: (ingredients: any) => void;
  noButtons?: boolean;
  nameRecipe?: string;
  setFocusFieldNameProduct?: (() => void) | undefined;
}
