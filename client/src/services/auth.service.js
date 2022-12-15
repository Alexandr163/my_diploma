import httpService from "./http.service";
import config from "../config.json";

const URL = config.apiEndpoint + "/auth";

const authService = {
    async signIn(email, pass) {
        const { data } = await httpService.get(URL + "/signIn", {
            email,
            pass
        });

        const authUser = data.find(
            (item) => item.email === email && item.password === pass
        );

        return authUser;
    },
    async signUp(user) {
        try {
            const { data } = await httpService.post(URL + "/signUp", user);
            console.log("---data---authService-----signUp", data);

            return data;
        } catch (error) {
            console.log("-----error", error);
            throw new Error(error.response.data.error.message);
        }
    }
};

export default authService;
