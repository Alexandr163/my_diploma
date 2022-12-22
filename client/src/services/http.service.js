import axios from "axios";

const http = axios.create();

export default {
    get: http.get,
    post: http.post,
    patch: http.patch,
    put: http.put,
    delete: http.delete
};
