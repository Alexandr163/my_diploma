import httpService from "./http.service";

export default {
    fetchProducts: async () => {
        const { data } = await httpService.get(
            "http://localhost:3001/products"
        );

        return data;
    }
};
