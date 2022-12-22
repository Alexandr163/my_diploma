import httpService from "./http.service";
import config from "../config.json";

const URL = config.apiEndpoint + "/categories";

export default {
    fetchCategories: async () => {
        const { data } = await httpService.get(URL);

        return data;
    },
    update: async (category) => {
        const { data } = await httpService.patch(
            URL + "/updateCategory",
            category
        );

        return data;
    },

    create: async (title) => {
        const { data } = await httpService.post(URL + "/createCategory", {
            title
        });

        return data;
    },
    delete: async (category) => {
        const { data } = await httpService.delete(
            URL + `/${category._id}`,
            category
        );

        return data;
    }
};
