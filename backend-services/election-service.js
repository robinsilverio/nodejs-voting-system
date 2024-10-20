import { statusCodes } from "../src/enums/status-codes.js";
import { insertIntoDatabase, retrieveFromDatabase } from "../dbclient.js";
import { getRequestBody, sendResponse } from "../server-routes.js";


export const performCreateElection = async(paramReq, paramRes) => {
    
    try {
        const requestBody = await getRequestBody(paramReq);

        if (await electionExists(requestBody.election_name)) {
            return sendResponse(paramRes, statusCodes.BAD_REQUEST, 'Election already exists.');
        }
        
        const election = await insertElection(requestBody);
        return sendResponse(paramRes, statusCodes.SUCCESS, `Election successfully created.`);

    } catch (error) {
        console.error(error);
        sendResponse(paramRes,  statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong with the server.');
    }

}

const electionExists = async (electionName) => {
    const conditions = { 'election_name' : electionName };
    const result = await retrieveFromDatabase('election', ['election_name'], conditions);
    return result.rows.length >  0 ? result.rows[0] : null;
}

const insertElection = async(paramElection) => {
    const election = {
        election_name: paramElection.election_name,
        election_description: paramElection.election_description,
        election_type: paramElection.election_type,
        election_start_date: paramElection.election_start_date,
        election_end_date: paramElection.election_end_date
    }

    const result = await insertIntoDatabase('election', Object.keys(election), Object.values(election));
    return {
        id: result.rows[0].id
    };
}