interface AddRecipeFormProps {
  register: any;
  setIngredients: (ingredients: RecipeWithSteps | TypeItemRecipe[]) => void;
  ingredients: RecipeWithSteps | TypeItemRecipe[] | null;
  focusInputStepName: boolean;
  setFocusInputStepName: (focusInputStepName: boolean) => void;
  stepName: string;
  setStepName: (stepName: string) => void;
  isEditStepName: boolean;
  setIsEditStepName: (isEditStepName: boolean) => void;
  selectedStep: string;
  setSelectedStep: (selectedStep: string) => void;
}
