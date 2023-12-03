import React, { ChangeEvent, useState } from "react";
import Style from "./sort.module.scss";
import { SORT_NAMES } from "../../constants";

export const Sort: React.FC<ISortProps> = ({
  listFoundItems,
  setListOfFoundProducts,
  ...rest
}) => {
  const [sortType, setSortType] = useState("");

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);

    let sortedResults = [...listFoundItems];
    if (selectedSortType === "nameDesc") {
      sortedResults.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (selectedSortType === "nameAsc") {
      sortedResults.sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (selectedSortType === "priceDesc") {
      sortedResults.sort((a, b) =>
        a.price && b.price ? a.price - b.price : 0
      );
    } else if (selectedSortType === "priceAsc") {
      sortedResults.sort((a, b) =>
        a.price && b.price ? b.price - a.price : 0
      );
    }
    setListOfFoundProducts(sortedResults);
  };
  return (
    <select
      value={sortType}
      onChange={handleSortChange}
      className={Style.sort}
      {...rest}
    >
      <option value="">Сортування</option>
      {SORT_NAMES.map((obj) => (
        <option key={obj.id} value={obj.value}>
          {obj.name}
        </option>
      ))}
    </select>
  );
};
