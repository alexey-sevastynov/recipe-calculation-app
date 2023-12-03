import React, { useEffect, useRef } from "react";
import Styles from "./item-product.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";
import { useAppDispatch } from "../../redux/hook";
import {
  deleteProduct,
  setProductFormState,
  showButtonEdit,
} from "../../redux/productsSlice";

export const ItemProduct: React.FC<ItemProductProps> = ({
  id,
  productName,
  netWeight,
  price,
  weightUnit,
  noButtons,
  listItems,
  setIngredients,
  ingredients,
  setFocusFieldNameProduct,
}) => {
  const dispatch = useAppDispatch();
  const editButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      const formElement = document.getElementById("form-product");
      if (
        editButtonRef.current &&
        !editButtonRef.current.contains(clickedElement) &&
        (!formElement || !formElement.contains(clickedElement))
      ) {
        // If the click was made outside the "edit" button area, call dispatch
        dispatch(showButtonEdit(false));
      }
    };

    // Add a click event handler to the entire document
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Removing an event handler when a component is unmounted
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);

  const deleteItem = () => {
    dispatch(deleteProduct(id));

    if (setIngredients) {
      if (Array.isArray(listItems) && !ingredients) {
        setIngredients(listItems.filter((item) => item.id !== id));
      } else {
        const updatedListItems: RecipeWithSteps = {};
        for (const key in ingredients) {
          updatedListItems[key] = ingredients[key].filter(
            (item) => item.id !== id
          );
        }
        setIngredients(updatedListItems);
      }
    }
  };

  const editItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(showButtonEdit(true));
    setFocusFieldNameProduct();

    dispatch(
      setProductFormState({ id, productName, netWeight, price, weightUnit })
    );
  };
  return (
    <div className={Styles.itemProducts}>
      <p className={Styles.itemProductName}>{productName}</p>
      <div className={Styles.blockValues}>
        <div className={Styles.blockValue}>
          <p>{netWeight}</p>
          <p>{weightUnit}</p>
        </div>
        {price && (
          <div className={Styles.blockValue}>
            <p>{price}</p>
            <p>грн</p>
          </div>
        )}
      </div>

      {!noButtons && (
        <div className={Styles.btns}>
          <button
            ref={editButtonRef}
            type="button"
            className={Styles.edit}
            onClick={editItem}
          >
            <img src={getIconUrl("edit.svg")} alt="edit" />
          </button>
          <button type="button" className={Styles.delete} onClick={deleteItem}>
            <img src={getIconUrl("delete.svg")} alt="delete" />
          </button>
        </div>
      )}
    </div>
  );
};
