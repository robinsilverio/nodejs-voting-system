import axios from "axios";

export class ElectionService {
    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;
    electionAPIUrl = `${this.baseAPIUrl}/elections`;
    loadElections() {
        return axios.get(this.electionAPIUrl, {headers: {'authorization' : `Bearer  ${sessionStorage.getItem('authToken')}`}});
    }
}