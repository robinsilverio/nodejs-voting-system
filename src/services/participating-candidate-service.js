import axios from "axios";

export class ParticipatingCandidateService {
    baseAPIUrl = process.env.VUE_APP_API_BASE_URL;
    electionApiUrl = `${this.baseAPIUrl}/elections/candidate`;
    
    load(paramId) {
        return axios.get(this.electionApiUrl + `/${paramId}`, {headers: {'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`}});
    }
}