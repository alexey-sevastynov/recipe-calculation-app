import React, { ChangeEvent, useState } from "react";
import Style from "./search.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";

export const Search: React.FC<ISearchProps> = ({
  listItems,
  setListOfFoundItems,
  placeholder = "Пошук...",
  ...rest
}) => {
  const [searchValue, setSearchValue] = useState("");

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const foundOfProducts = listItems.filter((product) =>
      product.productName.toLowerCase().includes(value)
    );

    setListOfFoundItems(foundOfProducts);
  };

  return (
    <div className={Style.search}>
      <img src={getIconUrl("search.svg")} alt="search" />

      <input
        type="text"
        value={searchValue}
        onChange={searchOnChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};
