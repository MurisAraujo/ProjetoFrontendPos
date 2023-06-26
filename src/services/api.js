import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    header: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    }
})

export default api;