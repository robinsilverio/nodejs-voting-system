import axios from "axios";

export class VoterRegisterService {

    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;

    registerVoter(paramVoterObject) {
        return axios.post(`${this.baseAPIUrl}/register-voter`, paramVoterObject);
    }
}