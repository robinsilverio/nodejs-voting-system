import axios from "axios";

export class CandidateService {
    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;
    candidatesApiUrl = `${this.baseAPIUrl}/candidates`;

    load() {
        return axios.get(this.candidatesApiUrl, { headers: { 'authorization': `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    create(paramData) {
        return axios.post(this.candidatesApiUrl, paramData, { headers: { 'authorization': `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    update(paramData) {
        return axios.put(this.candidatesApiUrl, paramData, { headers: { 'authorization': `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    delete(paramId) {
        return axios.delete(`${this.candidatesApiUrl}?id=${paramId}`, { headers: { 'authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}})
    }
}