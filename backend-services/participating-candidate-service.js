import { HandleDatabaseService } from "./handleDatabaseService.js";


const handleDatabaseService = new HandleDatabaseService('participating_candidates');

export const performRetrieveCandidatesByElection = async(paramId) => {
    const joinInformation = {
        selectedColumns: {
            maintableColumns: ['id'],
            joinTableColumns: ['candidate_name', 'party_filiation', 'runs_for'],
        },
        joinTable: 'candidate',
        on: 'candidate_id',
        referenceColumn: 'id',
        whereCondition: { election_id: paramId },
    }
    return await handleDatabaseService.retrieveByJoin(joinInformation);
}

export const performInsertParticipatingCandidate = async(paramCandidateId, paramElectionId)  => {
    const requestBody = {
        id: null,
        candidate_id: paramCandidateId,
        election_id: paramElectionId
    }
    return await handleDatabaseService.create(requestBody);
}

export const performDeleteParticipatingCandidate = async(paramElectionId)  => {
    return await handleDatabaseService.delete({ election_id: paramElectionId });
}