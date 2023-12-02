export const getUnitsValueForItemRecipe = (product: TypeItemProduct) => {
  const { weightUnit } = product;

  switch (weightUnit) {
    case "шт":
      return ["шт"];
    case "гр":
      return ["гр", "кг"];
    case "кг":
      return ["кг", "гр"];
    case "л":
      return ["л", "мл"];
    case "мл":
      return ["мл", "л"];
  }
};
