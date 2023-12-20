import React, { useEffect } from "react";
import Styles from "./add-products-form.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { COLORS, UNITS } from "../../../../constants";
import { Btn } from "../../../Btn/Btn";
import { InputsAddProductsForm } from "./InputsAddProductForm";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import {
  addProduct,
  editProduct,
  setProductFormState,
  showButtonEdit,
} from "../../../../redux/productsSlice";
import { Input } from "../../../Input/Input";

export const AddProductForm: React.FC<AddProductFormProps> = ({
  focusOnInput,
}) => {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector((state) => state.products.isEdit);
  const listProducts = useAppSelector((state) => state.products.listProducts);
  const productFormState = useAppSelector(
    (state) => state.products.productFormState
  );

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<InputsAddProductsForm>();

  const clearForm = () => {
    setValue("productName", undefined);
    setValue("netWeight", undefined);

    setValue("price", undefined);
  };

  const onSubmit: SubmitHandler<InputsAddProductsForm> = (data) => {
    const { netWeight, price, productName, weightUnit } = data;

    if (productName && netWeight && weightUnit) {
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

        clearForm();
        dispatch(showButtonEdit(false));
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
    }
  };

  const disableBtnAdd = listProducts.some(
    (item) => item.productName === watch("productName")
  );

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
      <Input
        iconName="dairy-products.png"
        textError={errors.productName?.message}
        type="text"
        placeholder="НАЗВА ТОВАРУ ..."
        clearInput={() => setValue("productName", undefined)}
        isEmptyField={
          watch("productName") !== undefined && watch("productName") !== ""
        }
        registerResult={register("productName", {
          required: "обовязкове поле для заповнення ",
        })}
        error={errors.productName}
        style={isEdit ? { backgroundColor: COLORS.edit } : {}}
      />

      <Input
        iconName="product.png"
        textError={errors.netWeight?.message}
        type="number"
        step={0.1}
        min={0}
        placeholder="МАСА НЕТТО ..."
        clearInput={() => setValue("netWeight", undefined)}
        isEmptyField={
          //@ts-ignore
          watch("netWeight") !== undefined && watch("netWeight") !== ""
        }
        registerResult={register("netWeight", {
          required: "обовязкове поле для заповнення ",
        })}
        error={errors.netWeight}
        style={isEdit ? { backgroundColor: COLORS.edit } : {}}
      />

      <select {...register("weightUnit", { required: true })}>
        {UNITS.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <Input
        iconName="price-tag.png"
        textError={errors.price?.message}
        type="number"
        step={0.1}
        min={0}
        placeholder="СКІЛЬКИ КОШТУЄ ..."
        clearInput={() => setValue("price", undefined)}
        //@ts-ignore
        isEmptyField={watch("price") !== undefined && watch("price") !== ""}
        registerResult={register("price", {
          required: "обовязкове поле для заповнення ",
        })}
        error={errors.price}
        style={isEdit ? { backgroundColor: COLORS.edit } : {}}
      />

      <p>грн</p>

      {isEdit ? (
        <Btn type="submit" noActive={disableBtnAdd}>
          Редагувати
        </Btn>
      ) : (
        <Btn type="submit" noActive={disableBtnAdd}>
          Додати
        </Btn>
      )}
      {!isEdit &&
        watch("productName") !== undefined &&
        watch("netWeight") !== undefined &&
        watch("price") !== undefined && (
          <Btn
            type="button"
            iconName="eraser-white.png"
            onClick={clearForm}
            style={{ backgroundColor: COLORS.red }}
          >
            Очистити
          </Btn>
        )}

      {isEdit && (
        <Btn
          type="button"
          iconName="eraser-black.png"
          style={{ backgroundColor: COLORS.yellow, color: COLORS.black }}
          onClick={() => {
            dispatch(showButtonEdit(false));
            clearForm();
          }}
        >
          Відмінити
        </Btn>
      )}
    </form>
  );
};
