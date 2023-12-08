interface ItemRecipeProps {
  title: string;
  ingredients: RecipeWithSteps | TypeItemProduct[] | TypeItemRecipe[];
  onDelete: (title: string) => void;
}
