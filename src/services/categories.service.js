import httpService from "./http.service";

export default {
    fetchCategories: async () => {
        const { data } = await httpService.get(
            "http://localhost:3001/categories"
        );

        return data;
    }
};
