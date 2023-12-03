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
    const textValue = e.target.value.toLowerCase();

    if (Array.isArray(listItems)) {
      setSearchValue(textValue);

      const foundOfProducts = listItems.filter((product) =>
        product.productName.toLowerCase().includes(textValue)
      );

      setListOfFoundItems(foundOfProducts);
    } else {
      const textValue = e.target.value.toLowerCase();
      setSearchValue(textValue);

      if (textValue === "") {
        setListOfFoundItems(listItems);
      } else {
        const filteredRecipes = Object.keys(listItems).filter((recipeKey) =>
          recipeKey.toLowerCase().includes(textValue)
        );

        const sortedRecipes: Recipe = {};

        filteredRecipes.forEach((recipeName: string) => {
          if (listItems[recipeName]) {
            sortedRecipes[recipeName] = listItems[recipeName];
          }
        });

        setListOfFoundItems(sortedRecipes);
      }
    }
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
