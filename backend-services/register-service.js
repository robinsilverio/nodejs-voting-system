import { statusCodes } from "../src/enums/status-codes.js";
import { insertIntoDatabase, retrieveFromDatabase } from "../dbclient.js";
import { getRequestBody, sendResponse } from "../server-routes.js";
import { signJwt } from "./login-service.js";
import { tableColumnsPerTable } from "../src/enums/tablecolumnspertable.js";

export const performRegisteringVoter = async(req, res) => {

    try {

        const requestBody = await getRequestBody(req);
        const validToken = await checkToken(requestBody.token);
    
        // Check whether token exists and it is not in use.
        if(!validToken) {
            return sendResponse(res, statusCodes.BAD_REQUEST, 'token is invalid or in use.');
        }

        const voterDetails = await insertVoter(validToken.id);
        const jwtToken = signJwt(voterDetails, '1d');
        return sendResponse(res, statusCodes.SUCCESS, jwtToken);

    } catch(error) {
        console.error(error);
        sendResponse(res, statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong with the server.");
    }

}

const checkToken = async(paramToken) => {
    const conditions = {'token': paramToken, 'inuse': false};
    const result = await retrieveFromDatabase('voter_token', tableColumnsPerTable.VOTER_TOKEN, conditions);
    return result.rows.length >  0 ? result.rows[0] : null;
}

const insertVoter = async(paramTokenId) => {

    const tokenIdColumn = tableColumnsPerTable.VOTER.filter(column => column !== 'id');
    const result = await insertIntoDatabase('voter', tokenIdColumn,  [paramTokenId]);
    
    return {
        id: result.rows[0].id,
        token_id: paramTokenId,
        role: 'VOTER'
    }
}