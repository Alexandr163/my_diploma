import httpService from "./http.service";
import config from "../config.json";

const URL = config.apiEndpoint + "/auth";

const authService = {
    async signIn(email, password) {
        const { data } = await httpService.post(URL + "/signInWithPassword", {
            email,
            password
        });

        return data;
    },
    async signUp(user) {
        try {
            const { data } = await httpService.post(URL + "/signUp", user);

            return data;
        } catch (error) {
            throw new Error(error.response.data.error.message);
        }
    }
};

export default authService;
