import { getRequestBody, isValidId, sendResponse } from "../server-routes.js";
import { performCreateCandidate, performDeleteCandidate, performRetrieveCandidates, performUpdateCandidate } from "../backend-services/candidate-service.js";
import { statusCodes } from "../src/enums/status-codes.js";
import { existsInDatabase } from "../dbclient.js";
import { performRetrieveElections } from "../backend-services/election-service.js";
import { performInsertParticipatingCandidate } from "../backend-services/participating-candidate-service.js";

export async function retrieveCandidates(paramRes) {
    try {
        const result = await performRetrieveCandidates();
        sendResponse(paramRes, statusCodes.SUCCESS, result.rows);
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error during retrieving candidates');
    }
}

export async function createCandidate(paramReq, paramRes) {
    try {
        
        const requestBody = await getRequestBody(paramReq);
        const nameField = `candidate_name`;
        const participates_in = requestBody.participates_in;
        const registeredElections = await performRetrieveElections();
        const electionExists = participates_in.every(toParticipateElection => registeredElections.rows.some(election => election.election_name === toParticipateElection.label));

        if (await existsInDatabase('candidate', { [nameField] : requestBody[nameField] })) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, `Candidate already exists.`);
        }

        if (!electionExists) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, `One or more elections in ${participates_in} do not exist.`);
        } else {
            const candidate = Object.keys(requestBody).reduce((obj, key) => {
                if (key !== 'id' && key !== 'participates_in') {
                    obj[key] = requestBody[key];
                }
                return obj;
            }, {});
            const result = await performCreateCandidate(candidate);
            const candidateId = result.rows[0].id;
            for (const electionName of participates_in) {
                const electionId = registeredElections.rows.find(election => election.election_name === electionName.label).id;
                await performInsertParticipatingCandidate(candidateId, electionId);
            }
        }

        return sendResponse(paramRes, statusCodes.SUCCESS, 'Candidate created.' );
    
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error during creating candidate');
    }
}

export async function updateCandidate(paramReq, paramRes) {
    try {
        let requestBody = await getRequestBody(paramReq);
        const response = await performUpdateCandidate(requestBody);
        return sendResponse(paramRes, response.statusCode, response.data);
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error during updating candidate');
    }
}

export async function deleteCandidate(paramReq, paramRes) {
    
    if (!isValidId(paramReq.query)) {
        return sendResponse(paramRes, statusCodes.BAD_REQUEST, { error: 'ID parameter is required or invalid.' });
    }

    const id = paramReq.query.id;

    try {
        const response = await performDeleteCandidate(id);
        return sendResponse(paramRes, response.statusCode, response.data );
    } catch (error) {
        console.error(error);
        sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in the server during deleting election.');
    }
}