import { performCreateCandidate, performRetrieveCandidates } from "../backend-services/candidate-service.js";

export function createCandidate(paramReq, paramRes) {
    return performCreateCandidate(paramReq, paramRes);
}

export function retrieveCandidates(paramReq, paramRes) {
    return performRetrieveCandidates(paramReq, paramRes);
}

export function updateCandidate(paramReq, paramRes) {
    return performUpdateCandidate(paramReq, paramRes);
}

export function deleteCandidate(paramReq, paramRes) {
    return performDeleteCandidate(paramReq, paramRes);
}