export const calculateTotalCost = (
  ingredients: any,
  listProducts: TypeItemProduct[],
  isArrayIngredients: boolean
): number => {
  return isArrayIngredients
    ? ingredients.reduce((total: number, item: TypeItemProduct) => {
        const { netWeight, productName, weightUnit } = item;
        const product: TypeItemProduct | undefined = listProducts.find(
          (product) => product.productName === productName
        );

        const unitProduct = product?.weightUnit;
        const priceProduct = product?.price;
        const netWeightProduct = product?.netWeight;

        if (priceProduct && netWeightProduct && netWeight) {
          if (unitProduct === weightUnit) {
            const pricePerUnit = priceProduct / netWeightProduct;
            const itemCost = netWeight * pricePerUnit;
            return total + itemCost;
          }
          if (unitProduct === weightUnit && weightUnit === "шт") {
            const itemCost = netWeight * priceProduct + 10;
            return total + itemCost;
          }
          if (
            unitProduct !== weightUnit &&
            (weightUnit === "гр" || weightUnit === "мл")
          ) {
            const priceOneUnit = priceProduct / (netWeightProduct * 1000);
            const itemCost = netWeight * priceOneUnit;
            return total + itemCost;
          }
          if (
            unitProduct !== weightUnit &&
            (weightUnit === "кг" || weightUnit === "л")
          ) {
            const priceOneUnit = priceProduct / (netWeightProduct / 1000);
            const itemCost = netWeight * priceOneUnit;
            return total + itemCost;
          }
        }
        return total;
      }, 0)
    : Object.keys(ingredients).reduce((total, recipeStep) => {
        const currentIngredients = ingredients[recipeStep];

        if (Array.isArray(currentIngredients)) {
          total += currentIngredients.reduce(
            (subTotal, item: TypeItemProduct) => {
              const { netWeight, productName, weightUnit } = item;
              const product: TypeItemProduct | undefined = listProducts.find(
                (product) => product.productName === productName
              );

              const unitProduct = product?.weightUnit;
              const priceProduct = product?.price;
              const netWeightProduct = product?.netWeight;

              if (priceProduct && netWeightProduct && netWeight) {
                if (unitProduct === weightUnit) {
                  const pricePerUnit = priceProduct / netWeightProduct;
                  const itemCost = netWeight * pricePerUnit;
                  return subTotal + itemCost;
                }
                if (unitProduct === weightUnit && weightUnit === "шт") {
                  const itemCost = netWeight * priceProduct + 10;
                  return subTotal + itemCost;
                }
                if (
                  unitProduct !== weightUnit &&
                  (weightUnit === "гр" || weightUnit === "мл")
                ) {
                  const priceOneUnit = priceProduct / (netWeightProduct * 1000);
                  const itemCost = netWeight * priceOneUnit;
                  return subTotal + itemCost;
                }
                if (
                  unitProduct !== weightUnit &&
                  (weightUnit === "кг" || weightUnit === "л")
                ) {
                  const priceOneUnit = priceProduct / (netWeightProduct / 1000);
                  const itemCost = netWeight * priceOneUnit;
                  return subTotal + itemCost;
                }
              }
              return subTotal;
            },
            0
          );
        }
        return total;
      }, 0);
};
