import { performCreateCandidate, performDeleteCandidate, performRetrieveCandidates, performUpdateCandidate } from "../backend-services/candidate-service.js";

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
    // Check if the query is set
    if (!paramReq.query || !paramReq.query.id) {
        return paramRes.status(400).json({ error: 'ID parameter is required.' });
    }

    const id = paramReq.query.id;

    // Validate the ID (for example, check if it's a valid number)
    if (isNaN(id) || id <= 0) {
        return paramRes.status(400).json({ error: 'Invalid ID parameter.' });
    }
    return performDeleteCandidate(paramReq, paramRes);
}