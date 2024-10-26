import { statusCodes } from "../src/enums/status-codes.js";
import bcrypt from 'bcrypt';
import { HandleDatabaseService } from "./handleDatabaseService.js";
import { signJwt, validateJwtToken } from "../utils/jwtUtils.js";

const handleDatabaseService = new HandleDatabaseService('admin');

export const performLogin = async (paramRequestBody) => {
    
    let loginDetails = { user : null, loggedIn: false };
    const result  = await handleDatabaseService.retrieve({ username: paramRequestBody.username });

    const retrievedUser = result.rows[0];
    
    if (retrievedUser !== undefined) {
        
        const isValidPassword = await bcrypt.compare(paramRequestBody.password, retrievedUser.password);
        if (isValidPassword) {
            loginDetails.user = {
                id: retrievedUser.id,
                username: retrievedUser.username,
                role: 'ADMIN'
            };

            const token = signJwt({ username: loginDetails.user.username, role: loginDetails.user.role });

            loginDetails.loggedIn = true;
            loginDetails.token = token;

            return { statusCode: statusCodes.SUCCESS, data: { loginDetails } };
        }
        return { statusCode: statusCodes.UNAUTHORIZED, data: 'Username or password is incorrect.' };
    } else {
        return { statusCode: statusCodes.UNAUTHORIZED, data: 'Username or password is incorrect.' };
    }
};

export const performJwtValidation = (authHeader) => {
    const tokenValidationResult = validateJwtToken(authHeader);

    if (tokenValidationResult.statusCode !== statusCodes.SUCCESS) {
        return { statusCode: tokenValidationResult.statusCode, data: tokenValidationResult.data };
    }

    return { statusCode: statusCodes.SUCCESS, data: { role: tokenValidationResult.data.role } };
};