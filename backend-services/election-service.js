import { HandleDatabaseService } from "./handleDatabaseService.js";

const handleDatabaseService = new HandleDatabaseService("election");

export const performRetrieveElections = async() => {
    return await handleDatabaseService.retrieve();
}

export const performRetrieveElectionsByParticipatingCandidate = async(paramId) => {
    const joinInformation = {
        selectedColumns: ['id', 'election_name'],
        joinTable: 'participating_candidates',
        on: 'id',
        referenceColumn: 'election_id',
        whereCondition: { candidate_id: paramId },
    }
    
    return await handleDatabaseService.retrieveByJoin(joinInformation);
}

export const performCreateElection = async(paramRequestBody) => {
    return await handleDatabaseService.create(paramRequestBody);
}

export const performUpdateElection = async(paramRequestBody) => {
    return handleDatabaseService.update(paramRequestBody);
}

export const performDeleteElection = async (paramId) => {
    return handleDatabaseService.delete(paramId);
}