import { statusCodes } from "../src/enums/status-codes.js";
import { existsInDatabase, insertIntoTable } from "../dbclient.js";
import { signJwt } from "./login-service.js";

export const performRegisteringVoter = async(paramRequestBody) => {

    try {

        const validToken = await existsInDatabase('voter_token', {'token': paramRequestBody.token, 'inuse': false});
    
        // Check whether token exists and it is not in use.
        if(!validToken) {
            return { statusCode: statusCodes.BAD_REQUEST,  data: 'token is invalid or in use.' };
        }

        const result = await insertIntoTable('voter', { token_id : validToken.id });        
        const jwtToken = signJwt(result.rows[0], '1d');
        return { statusCode: statusCodes.SUCCESS, data: jwtToken };

    } catch(error) {
        console.error(error);
        return  { statusCode: statusCodes.INTERNAL_SERVER_ERROR, data: "Something went wrong with the server." };
    }

}