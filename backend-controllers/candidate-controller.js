import { getRequestBody, isValidId, sendResponse } from "../server-routes.js";
import { performCreateCandidate, performDeleteCandidate, performRetrieveCandidates, performUpdateCandidate } from "../backend-services/candidate-service.js";
import { statusCodes } from "../src/enums/status-codes.js";
import { existsInDatabase } from "../dbclient.js";

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

        if (await existsInDatabase('candidate', { [nameField] : requestBody[nameField] })) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, `Candidate already exists.`);
        }

        const response = await performCreateCandidate(requestBody);
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