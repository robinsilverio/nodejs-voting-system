import { HandleDatabaseService } from "./handleDatabaseService.js";


const handleDatabaseService = new HandleDatabaseService('participating_candidates');

export const performInsertParticipatingCandidate = async(paramCandidateId, paramElectionId)  => {
    const requestBody = {
        id: null,
        candidate_id: paramCandidateId,
        election_id: paramElectionId
    }
    return await handleDatabaseService.create(requestBody);
}