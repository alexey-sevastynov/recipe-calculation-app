import React from "react";
import Styles from "./add-products-form.module.scss";
import { UNITS } from "../../../../constants";
import { Btn } from "../../../Btn/Btn";

export const AddProductForm: React.FC<AddProductFormProps> = ({}) => {
  return (
    <form className={Styles.AddProductFrom}>
      <input type="text" placeholder="НАЗВА ТОВАРУ ..." />
      <input type="number" placeholder="МАСА НЕТТО в упаковці ..." />
      <select name="weightUnit">
        {UNITS.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <input type="number" placeholder="СКІЛЬКИ КОШТУЄ ..." />
      <p>uah</p>

      {false ? <Btn type="submit">edit</Btn> : <Btn type="submit">add</Btn>}
    </form>
  );
};
