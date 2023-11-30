import React from "react";
import Styles from "./add-recipe-form.module.scss";
import { Btn } from "../../../Btn/Btn";

import { FAKE_LIST } from "../../../../constants";

export const AddRecipeForm: React.FC<AddRecipeFormProps> = ({}) => {
  return (
    <form className={Styles.addRecipeForm}>
      <div className={Styles.title}>
        <input type="text" placeholder="Заголовок рецепта..." />
      </div>
      <div className={Styles.step}>
        <input type="text" placeholder="Додати крок..." />
        <Btn type="button">add</Btn>
      </div>

      <div className={Styles.addProduct}>
        <select>
          <option value="">Выберите продукт</option>
          {FAKE_LIST.map((product) => (
            <option key={product.productName} value={product.productName}>
              {product.productName}
            </option>
          ))}
        </select>
        <input type="number" placeholder="Масса..." />
        <p>{"100(test)"}</p>

        {false ? <Btn type="submit">edit</Btn> : <Btn type="submit">add</Btn>}
      </div>
    </form>
  );
};
