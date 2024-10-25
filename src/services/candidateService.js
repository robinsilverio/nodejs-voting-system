import axios from "axios";

export class CandidateService {
    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;
    candidatesUrl = `${this.baseAPIUrl}/candidates`;

    loadCandidates() {
        return axios.get(this.candidatesUrl, { headers: { 'authorization': `Bearer  ${sessionStorage.getItem('authToken')}`} });
    }
}