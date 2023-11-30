import React from "react";
import Styles from "./add-products-form.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { UNITS } from "../../../../constants";
import { Btn } from "../../../Btn/Btn";
import { InputsAddProductsForm } from "./InputsAddProductForm";
import { useAppDispatch } from "../../../../redux/hook";
import { addProduct } from "../../../../redux/productsSlice";

export const AddProductForm: React.FC<AddProductFormProps> = ({}) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsAddProductsForm>();

  const onSubmit: SubmitHandler<InputsAddProductsForm> = (data) => {
    console.log(data);
    const id = Math.random() * 10;
    dispatch(addProduct({ id, ...data }));
  };

  return (
    <form className={Styles.AddProductFrom} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="НАЗВА ТОВАРУ ..."
        {...register("productName", { required: true })}
      />
      <input
        type="number"
        placeholder="МАСА НЕТТО в упаковці ..."
        {...register("netWeight", { required: true })}
      />
      <select {...register("weightUnit", { required: true })}>
        {UNITS.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="СКІЛЬКИ КОШТУЄ ..."
        {...register("price", { required: true })}
      />
      <p>uah</p>

      {false ? <Btn type="submit">edit</Btn> : <Btn type="submit">add</Btn>}
    </form>
  );
};
