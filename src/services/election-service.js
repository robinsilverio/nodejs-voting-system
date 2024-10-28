import axios from "axios";

export class ElectionService {
    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;
    electionApiUrl = `${this.baseAPIUrl}/elections`;
    
    load() {
        return axios.get(this.electionApiUrl, {headers: {'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    create(paramData) {
        return axios.post(this.electionApiUrl, paramData, {headers: {'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    update(paramData) {
        return axios.put(this.electionApiUrl, paramData, {headers: {'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    delete(paramId) {
        return axios.delete(`${this.electionApiUrl}?id=${paramId}`, {headers: {'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
}