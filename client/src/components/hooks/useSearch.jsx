import { useState } from "react";

const useSearch = (productsList) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    function filterProduct(productList, valueSearch) {
        let foundProductList = [];
        if (valueSearch) {
            foundProductList = productList.filter((item) => {
                const searchRegExp = new RegExp(`${valueSearch}`, "i");
                const isFoundeInTitle = item.title.search(searchRegExp) !== -1;
                const isFoundeInBody =
                    item.description.search(searchRegExp) !== -1;

                return isFoundeInTitle || isFoundeInBody;
            });
        }

        return foundProductList;
    }

    const newProducts = filterProduct(productsList, searchValue);

    return { handleSearch, newProducts };
};

export default useSearch;
