import { statusCodes } from "../src/enums/status-codes.js";
import { tableColumnsPerTable } from "../src/enums/tablecolumnspertable.js"
import { existsInDatabase, insertIntoTable, remove, retrieve, update } from "../dbclient.js"
import { getRequestBody, sendResponse } from "../server-routes.js";


export const performRetrieveCandidates = async(paramReq, paramRes) => {
    try {
        const result = await retrieve('candidate', tableColumnsPerTable.CANDIDATE);
        return sendResponse(paramRes, statusCodes.SUCCESS, result.rows);
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong during retrieving candidates from the database.');
    }
}

export const performCreateCandidate = async(paramReq, paramRes) => {
    try {
        const requestBody = await getRequestBody(paramReq);
        
        if (await existsInDatabase('candidate', { 'candidate_name' : requestBody.candidate_name })) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, 'Candidate already exists.');
        }
        const result = await insertIntoTable('candidate', requestBody);
        return sendResponse(paramRes, statusCodes.SUCCESS, result.rows[0]);

    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong during creating candidate.');
    }
}

export const performUpdateCandidate = async(paramReq, paramRes) => {
    try {

        let requestBody = await getRequestBody(paramReq);

        if (!await existsInDatabase('candidate', { id: requestBody.id })) {
            return sendResponse(paramRes, statusCodes.NOT_FOUND, 'Candidate not found.');
        }
        const updatedCandidate = await update('candidate', tableColumnsPerTable.CANDIDATE.filter(column => column !== 'id'), { id: requestBody.id }, requestBody);
        return sendResponse(paramRes, statusCodes.SUCCESS, 'Updating candidate was successful.');

    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong during updating candidate.');
    }
}

export const performDeleteCandidate = async(paramReq, paramRes) => {
    try {
        if (!await existsInDatabase('candidate', { id: paramReq.query.id })) {
            return sendResponse(paramRes, statusCodes.NOT_FOUND, 'Candidate not found.');
        }
        await remove('candidate', { id: paramReq.query.id });
        return sendResponse(paramRes, statusCodes.SUCCESS, 'Candidate was deleted successfully.');
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong during deleting candidate.');
    }
}