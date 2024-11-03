import { getRequestBody, isValidId, sendResponse } from "../server-routes.js";
import { 
    performCreateElection, 
    performDeleteElection, 
    performRetrieveElections, 
    performRetrieveElectionsByParticipatingCandidate, 
    performUpdateElection
} from "../backend-services/election-service.js";
import { statusCodes } from "../src/enums/status-codes.js";
import { existsInDatabase } from "../dbclient.js";

export async function retrieveElections(paramRes) {
    try {
        const result = await performRetrieveElections();
        return sendResponse(paramRes, statusCodes.SUCCESS, result.rows);
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in the server during retrieving elections.');
    }
}

export async function retrieveElectionsByParticipatingCandidate(paramReq, paramRes) {

    if (!isValidId(paramReq.params)) {
        return sendResponse(paramRes, statusCodes.BAD_REQUEST, 'ID parameter is required or invalid.');
    }

    try {
        const result = await performRetrieveElectionsByParticipatingCandidate(paramReq.params.id);
        return sendResponse(paramRes, statusCodes.SUCCESS, result.rows);
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in the server during retrieving elections by candidate.');
    }
}

export async function createElection(paramReq, paramRes) {
    try {

        const requestBody = await getRequestBody(paramReq);
        const nameField = `election_name`;

        if (await existsInDatabase('election', { [nameField] : requestBody[nameField] })) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, `Election already exists.`);
        }
        
        const result = await performCreateElection(requestBody);
        return sendResponse(paramRes, statusCodes.SUCCESS, 'Election created.');
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in the server during creating election.');
    }
}

export async function updateElection(paramReq, paramRes) {
    try {
        let requestBody = await getRequestBody(paramReq);
        const response = await performUpdateElection(requestBody);
        console.log(response);
        return sendResponse(paramRes, response.statusCode, response.data);
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in the server during updating election.');
    }
}

export async function deleteElection(paramReq, paramRes) {

    if (!isValidId(paramReq.query)) {
        return sendResponse(paramRes, statusCodes.BAD_REQUEST, { error: 'ID parameter is required or invalid.' });
    }

    const id = paramReq.query.id;   

    try {
        const response = await performDeleteElection(id);
        return sendResponse(paramRes, response.statusCode, response.data );
    } catch (error) {
        console.error(error);
        sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in the server during deleting election.');
    }
}