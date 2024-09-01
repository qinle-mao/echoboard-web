import { baseUrl } from "./env"
import axios from "axios"

const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})

service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        if(response.status == 200) {
            return response.data
        } else {
            Promise.reject()
        }
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default service