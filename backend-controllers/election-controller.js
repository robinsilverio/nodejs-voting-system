import { 
    performCreateElection, 
    performRetrieveElections, 
    performUpdateElection 
} from "../backend-services/election-service.js";

export function retrieveElections(paramReq,  paramRes) {
    performRetrieveElections(paramReq, paramRes);
}

export function createElection(paramReq, paramRes) {
    return performCreateElection(paramReq, paramRes);
}

export function updateElection(paramReq, paramRes) {
    return performUpdateElection(paramReq, paramRes);
}