import axios from "axios";

export class ElectionService {
    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;
    electionApiUrl = `${this.baseAPIUrl}/elections`;
    
    loadElections() {
        return axios.get(this.electionApiUrl, {headers: {'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    deleteElection(paramId) {
        return axios.delete(`${this.electionApiUrl}?id=${paramId}`, {headers: {'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
}