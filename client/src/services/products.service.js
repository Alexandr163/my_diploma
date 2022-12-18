import httpService from "./http.service";
import config from "../config.json";

const URL = config.apiEndpoint + "/products";

export default {
    fetchProducts: async () => {
        const { data } = await httpService.get(URL);

        return data;
    },
    async create(product) {
        const { data } = await httpService.post(
            URL + "/createProduct",
            product
        );

        return data;
    },
    async update(product) {
        const { data } = await httpService.patch(
            URL + `/${product._id}`,
            product
        );

        return data;
    },
    async delete(product) {
        const { data } = await httpService.delete(URL + `/${product._id}`);

        return data;
    }
};
