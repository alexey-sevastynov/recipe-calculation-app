import React, { useEffect } from "react";
import Styles from "./add-products-form.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { UNITS } from "../../../../constants";
import { Btn } from "../../../Btn/Btn";
import { InputsAddProductsForm } from "./InputsAddProductForm";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import {
  addProduct,
  editProduct,
  setProductFormState,
} from "../../../../redux/productsSlice";

export const AddProductForm: React.FC<AddProductFormProps> = ({
  focusOnInput,
}) => {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector((state) => state.products.isEdit);
  const productFormState = useAppSelector(
    (state) => state.products.productFormState
  );

  const { register, handleSubmit, setValue, setFocus } =
    useForm<InputsAddProductsForm>();

  const onSubmit: SubmitHandler<InputsAddProductsForm> = (data) => {
    const { netWeight, price, productName, weightUnit } = data;
    if (isEdit) {
      dispatch(
        editProduct({
          id: productFormState.id,
          productName,
          price,
          netWeight,
          weightUnit,
        })
      );
      dispatch(
        setProductFormState({
          id: null,
          productName: "",
          netWeight: null,
          weightUnit: "гр",
          price: null,
        })
      );
    } else {
      const id = Math.random() * 10;
      const netWeightTypeNumber = +netWeight;
      const priceTypeNumber = price ? +price : 0;

      dispatch(
        addProduct({
          id,
          productName,
          netWeight: netWeightTypeNumber,
          price: priceTypeNumber,
          weightUnit,
        })
      );
    }
  };

  useEffect(() => {
    if (productFormState.netWeight && productFormState.price) {
      setValue("productName", productFormState.productName);
      setValue("netWeight", productFormState.netWeight);
      setValue("weightUnit", productFormState.weightUnit);
      setValue("price", productFormState.price);
    }
  }, [productFormState]);

  useEffect(() => {
    if (focusOnInput) {
      setFocus("productName");
    }
  }, [focusOnInput, productFormState]);

  return (
    <form
      className={`${Styles.AddProductFrom} ${isEdit ? Styles.editForm : ""}`}
      onSubmit={handleSubmit(onSubmit)}
      id="form-product"
    >
      <input
        type="text"
        placeholder="НАЗВА ТОВАРУ ..."
        {...register("productName", { required: true })}
      />
      <input
        type="number"
        step={0.1}
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
        step={0.01}
        placeholder="СКІЛЬКИ КОШТУЄ ..."
        {...register("price", { required: true })}
      />
      <p>грн</p>

      {isEdit ? <Btn type="submit">edit</Btn> : <Btn type="submit">add</Btn>}
    </form>
  );
};
