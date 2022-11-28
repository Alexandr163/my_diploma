import httpService from "./http.service";

const URL = "http://localhost:3001/users";

const signIn = async (email, pass) => {
    const { data } = await httpService.get(URL);

    const authUser = data.find(
        (item) => item.email === email && item.password === pass
    );

    return authUser;
};

export default {
    signIn
};
