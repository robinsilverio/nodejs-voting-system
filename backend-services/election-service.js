import { statusCodes } from "../src/enums/status-codes.js";
import { 
    remove, 
    existsInDatabase, 
    insertIntoTable, 
    retrieve, 
    update
} from "../dbclient.js";
import { getRequestBody, sendResponse } from "../server-routes.js";
import { tableColumnsPerTable } from "../src/enums/tablecolumnspertable.js";


export const performRetrieveElections = async(paramReq, paramRes) => {

    try {
        const elections = await retrieve('election', tableColumnsPerTable.ELECTION, {});
        return sendResponse(paramRes, statusCodes.SUCCESS,  elections);
    } catch (error) {
        console.log(error);
        return  sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong while retrieving elections from database');
    }
}

export const performCreateElection = async(paramReq, paramRes) => {
    
    try {
        const requestBody = await getRequestBody(paramReq);

        if (await existsInDatabase('election', { 'election_name' : requestBody.election_name })) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, 'Election already exists.');
        }
        
        const election = await insertIntoTable('election', requestBody);
        return sendResponse(paramRes, statusCodes.SUCCESS, `Election successfully created.`);

    } catch (error) {
        console.error(error);
        sendResponse(paramRes,  statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong with the server.');
    }

}

export const performUpdateElection = async(paramReq, paramRes) => {
    try {
        let requestBody = await getRequestBody(paramReq);

        if (!await existsInDatabase('election', { id: requestBody.id })) {
            return sendResponse(paramRes, statusCodes.NOT_FOUND, 'Election not found.');
        } else {
            const updatedElection = await update('election', tableColumnsPerTable.ELECTION.filter(column => column !== 'id'), { id: requestBody.id }, requestBody);
            return sendResponse(paramRes, statusCodes.SUCCESS, 'Updating election was successful.');
        }
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes,  statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong with the server.');
    }
}

export const performDeleteElection = async (paramReq, paramRes) => {
    try {
        if (!await existsInDatabase('election', { id: paramReq.query.id } )) {
            return sendResponse(paramRes, statusCodes.NOT_FOUND, 'Election not found.');
        }
        await remove('election', { id: paramReq.query.id });
        return sendResponse(paramRes, statusCodes.SUCCESS, 'Election was successfully deleted.');
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes,  statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong with the server');
    }
}