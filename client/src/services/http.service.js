import axios from "axios";

const http = axios.create();

export default {
    get: http.get
};
