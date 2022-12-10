import React from "react";
// import { useSelector } from "react-redux";
// import { getPoducts } from "../store/product";

const Main = () => {
    // const products = useSelector(getPoducts());
    // const [searchQuery, setSearchQuery] = useState("");

    // const handleSearchQuery = ({ target }) => {
    //     setSearchQuery(target.value);
    // };

    // function filterProducts(data) {
    //     if (!data) {
    //         return null;
    //     }
    //     return data.filter(
    //         (product) =>
    //             product.title.toLowerCase().indexOf(searchQuery()) !== -1
    //     );
    // }

    return (
        <>
            <h1 className="text-center">Main Page</h1>
            <div className="input-group mb-3 w-50 mx-auto">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Найти..."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    // onChange={handleSearchQuery}
                    // value={searchQuery}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                >
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </>
    );
};

export default Main;
