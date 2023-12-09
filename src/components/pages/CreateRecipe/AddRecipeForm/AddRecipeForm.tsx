import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Styles from "./add-recipe-form.module.scss";
import { Btn } from "../../../Btn/Btn";

import { useAppSelector } from "../../../../redux/hook";
import { getUnitsValueForItemRecipe } from "../../../../helpers/getUnitsValueForItemRecipe";

export const AddRecipeForm: React.FC<AddRecipeFormProps> = ({
  register,
  setIngredients,
  ingredients,
  focusInputStepName,
  setFocusInputStepName,
  stepName,
  setStepName,
  isEditStepName,
  setIsEditStepName,
  selectedStep,
  setSelectedStep,
}) => {
  const listProducts = useAppSelector((state) => state.products.listProducts);
  const listRecipes = useAppSelector((state) => state.recipes.listRecipes);

  const refStepName = useRef<HTMLInputElement | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<string>("");

  const [netWeight, setNetWeight] = useState<number | undefined>(0); // leave empty field for placeholder
  const [weightUnit, setWeightUnit] = useState("");

  const isIngredientsTypeArray = Array.isArray(ingredients);
  const isIngredientsTypeObject = typeof ingredients === "object";
  const isValidIngredients = ingredients
    ? Object.keys(ingredients).length !== 0
    : false;

  const hasNonEmptySteps =
    isIngredientsTypeObject && !isIngredientsTypeArray && isValidIngredients;

  const currentProduct = listProducts.find(
    (product) => product.productName === selectedProduct
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "stepName") {
      setStepName(value);
    } else if (name === "selectedProduct") {
      setSelectedProduct(value);
    } else if (name === "selectedRecipe") {
      setSelectedRecipe(value);
    } else if (name === "netWeight") {
      // Parse the input value to a number
      const weight = parseFloat(value);
      setNetWeight(isNaN(weight) ? undefined : weight);
    } else if (name === "weightUnit") {
      // Assuming weightUnit is also a string value
      setWeightUnit(value as UnitsType);
    } else if (name === "selectedStep") {
      setSelectedStep(value);
    }
  };

  const addStep = () => {
    if (stepName.length !== 0) {
      setIngredients({ [stepName]: [], ...ingredients });
    }
  };

  const addRecipe = () => {
    if (selectedRecipe && listRecipes) {
      const updatedIngredients: { [key: string]: any } = { ...ingredients };
      updatedIngredients[selectedRecipe] = listRecipes[selectedRecipe];
      setIngredients(updatedIngredients);
      // setIngredients({
      //   ...ingredients,
      //   [selectedRecipe]: listRecipes[selectedRecipe],
      // });
    }
  };

  const addItem = () => {
    const id = Math.random() * 10;
    const isRequireField = selectedProduct && netWeight && weightUnit;
    const addItemToArray = (items: any[]) => [
      { id, productName: selectedProduct, netWeight, weightUnit },
      ...items,
    ];

    if (!ingredients && isRequireField) {
      setIngredients([
        //@ts-ignore
        { id, productName: selectedProduct, netWeight, weightUnit },
      ]);
    }

    if (isIngredientsTypeArray && isRequireField) {
      setIngredients(addItemToArray(ingredients));
    }

    if (
      !Array.isArray(ingredients) &&
      isRequireField &&
      selectedStep &&
      ingredients
    ) {
      const updatedIngredients = {
        ...ingredients,
        [selectedStep]: addItemToArray(ingredients[selectedStep] || []),
      };
      setIngredients(updatedIngredients);
    }
  };

  const editStep = () => {
    if (selectedStep && stepName.length > 0) {
      const updatedIngredients: Record<string, any> = { ...ingredients };
      console.log(updatedIngredients);

      if (updatedIngredients[selectedStep] && stepName) {
        updatedIngredients[stepName] = updatedIngredients[selectedStep];
        delete updatedIngredients[selectedStep];

        setIngredients(updatedIngredients);
        setSelectedStep(stepName);
        setStepName("");
        setIsEditStepName(false);
      }
    }
  };

  useEffect(() => {
    if (currentProduct && selectedProduct) {
      setWeightUnit(getUnitsValueForItemRecipe(currentProduct)[0]);
    }
  }, [selectedProduct]);

  const handleBlur = () => {
    setFocusInputStepName(false);
  };

  useEffect(() => {
    if (focusInputStepName && refStepName.current) {
      refStepName.current.focus();
    }
  }, [focusInputStepName]);

  return (
    <div className={Styles.addRecipeForm}>
      <div className={Styles.title}>
        <input
          type="text"
          placeholder="Заголовок рецепта..."
          {...register("nameRecipe", { required: true })}
        />
      </div>
      {!isIngredientsTypeArray && (
        <div className={Styles.step}>
          <input
            type="text"
            ref={refStepName}
            onBlur={handleBlur}
            placeholder="Додати крок..."
            name="stepName"
            onChange={handleInputChange}
            value={stepName}
          />
          {isEditStepName ? (
            <>
              <Btn type="button" onClick={editStep}>
                edit
              </Btn>

              <button onClick={() => setIsEditStepName(false)}>cancel</button>
            </>
          ) : (
            <>
              <Btn type="button" onClick={addStep}>
                add
              </Btn>
              <Btn type="button" onClick={addRecipe}>
                Look at
              </Btn>
              <select
                name="selectedRecipe"
                value={selectedRecipe}
                onChange={handleInputChange}
              >
                <option value="">Выберите Recipe</option>
                {Object.keys(listRecipes).map((stepName) => {
                  if (Array.isArray(listRecipes[stepName])) {
                    return (
                      <option key={stepName} value={stepName}>
                        {stepName}
                      </option>
                    );
                  }
                })}
              </select>
            </>
          )}
        </div>
      )}

      <div className={Styles.addProduct}>
        {hasNonEmptySteps && (
          <select
            name="selectedStep"
            value={selectedStep}
            onChange={handleInputChange}
          >
            <option value="">Выберите этап</option>
            {ingredients &&
              Object.keys(ingredients).map((stepName) => (
                <option key={stepName} value={stepName}>
                  {stepName}
                </option>
              ))}
          </select>
        )}
        <select
          name="selectedProduct"
          value={selectedProduct}
          onChange={handleInputChange}
        >
          <option value="">Выберите продукт</option>
          {listProducts.map((product) => (
            <option key={product.productName} value={product.productName}>
              {product.productName}
            </option>
          ))}
        </select>
        <input
          type="number"
          step={0.1}
          placeholder="Масса..."
          name="netWeight"
          value={netWeight}
          onChange={handleInputChange}
        />
        {selectedProduct && currentProduct && (
          <select
            name="weightUnit"
            value={weightUnit}
            onChange={handleInputChange}
          >
            {getUnitsValueForItemRecipe(currentProduct).map((units) => (
              <option key={units} value={units}>
                {units}
              </option>
            ))}
          </select>
        )}

        {false ? (
          <Btn type="button">edit</Btn>
        ) : (
          <Btn type="button" onClick={addItem}>
            add
          </Btn>
        )}
      </div>
    </div>
  );
};
