import axios from "axios";

export class LoginService {

    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;

    login(paramUser) {
        return axios.post(`${this.baseAPIUrl}/login`, paramUser);
    }

}