import { statusCodes } from "../src/enums/status-codes.js";
import { existsInDatabase, insertIntoTable } from "../dbclient.js";
import { getRequestBody, sendResponse } from "../server-routes.js";
import { signJwt } from "./login-service.js";

export const performRegisteringVoter = async(req, res) => {

    try {

        const requestBody = await getRequestBody(req);
        const validToken = await existsInDatabase('voter_token', {'token': requestBody.token, 'inuse': false});
    
        // Check whether token exists and it is not in use.
        if(!validToken) {
            return sendResponse(res, statusCodes.BAD_REQUEST, 'token is invalid or in use.');
        }

        const result = await insertIntoTable('voter', { token_id : validToken.id });        
        const jwtToken = signJwt(result.rows[0], '1d');
        return sendResponse(res, statusCodes.SUCCESS, jwtToken);

    } catch(error) {
        console.error(error);
        sendResponse(res, statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong with the server.");
    }

}