import Style from "./prices-products.module.scss";

import { Link } from "react-router-dom";
import { getIconUrl } from "../../../../helpers/getIconUrl";
import { useAppSelector } from "../../../../redux/hook";
import { ListProducts } from "../../../ListProducts/ListProducts";
import { MESSAGE_PRODUCT_LIST_EMPTY } from "../../../../constants";
import { InfoText } from "../../../InfoText/InfoText";

export const PricesProducts = () => {
  const listProducts = useAppSelector((item) => item.products.listProducts);
  const isProductListNotEmpty = listProducts.length === 0;

  return (
    <section className={Style.pricesProducts}>
      <h5>Ціна товару в магазині:</h5>

      <Link to={"/add-products"}>
        <button className={Style.edit}>
          <img src={getIconUrl("edit.svg")} alt="edit" />
        </button>
      </Link>

      {isProductListNotEmpty ? (
        <InfoText
          textMessage={MESSAGE_PRODUCT_LIST_EMPTY}
          imageName="sad.svg"
        />
      ) : (
        <ListProducts listItems={listProducts} noButtons />
      )}
    </section>
  );
};
