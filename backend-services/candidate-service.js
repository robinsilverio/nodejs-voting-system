import { statusCodes } from "../src/enums/status-codes.js";
import { tableColumnsPerTable } from "../src/enums/tablecolumnspertable.js"
import { existsInDatabase, insertIntoTable, retrieve } from "../dbclient.js"
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
        console.log(requestBody);
        
        if (await existsInDatabase('candidate', { 'candidate_name' : requestBody.candidate_name })) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, 'Candidate already exists.');
        }
        const result = await insertIntoTable('candidate', requestBody);
        return sendResponse(paramRes, statusCodes.SUCCESS, result);

    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong during creating candidate.');
    }
}