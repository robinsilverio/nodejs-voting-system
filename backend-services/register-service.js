import { statusCodes } from "../src/enums/status-codes.js";
import client from "../dbclient.js";
import { getRequestBody, sendResponse } from "../server-routes.js"

export const registerVoter = async(req, res) => {

    try {

        const requestBody = await getRequestBody(req);
        const validToken = await checkToken(requestBody.token);
    
        // Check whether token exists and it is not in use.
        if(!validToken) {
            return sendResponse(res, statusCodes.BAD_REQUEST, 'token is invalid or in use.');
        }

        const voterDetails = await insertVoter(validToken.id);
        return sendResponse(res, statusCodes.SUCCESS, voterDetails);

    } catch(error) {
        console.error(error);
        sendResponse(res, statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong with the server.");
    }

}

const checkToken = async(paramToken) => {
    try {
        const result = await client.query('SELECT id FROM voting_token WHERE voting_token = $1 AND inuse IS false;', [paramToken]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        throw new Error('Error checking token: ' + error);
    }
}

const insertVoter = async(paramTokenId) => {
    try {
        const result = await client.query('INSERT INTO voters (token_id) VALUES ($1) RETURNING id', [paramTokenId]);
        return {
            id: result.rows[0].id,
            token: paramTokenId
        };
    } catch (error) {
        throw new Error('Error inserting voter: ' + error);
    }
}