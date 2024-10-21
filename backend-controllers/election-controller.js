import { 
    performCreateElection, 
    performDeleteElection, 
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

export function deleteElection(paramReq, paramRes) {
    // Check if the query is set
    if (!paramReq.query || !paramReq.query.id) {
        return paramRes.status(400).json({ error: 'ID parameter is required.' });
    }

    const id = paramReq.query.id;

    // Validate the ID (for example, check if it's a valid number)
    if (isNaN(id) || id <= 0) {
        return paramRes.status(400).json({ error: 'Invalid ID parameter.' });
    }

    return performDeleteElection(paramReq, paramRes);
}