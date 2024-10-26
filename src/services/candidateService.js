import axios from "axios";

export class CandidateService {
    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;
    candidatesApiUrl = `${this.baseAPIUrl}/candidates`;

    loadCandidates() {
        return axios.get(this.candidatesApiUrl, { headers: { 'authorization': `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
    deleteCandidate(paramId) {
        return axios.delete(`${this.candidatesApiUrl}?id=${paramId}`, { headers: { 'authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}})
    }
}