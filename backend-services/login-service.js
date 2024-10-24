import { statusCodes } from "../src/enums/status-codes.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HandleDatabaseService } from "./handleDatabaseService.js";

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

export const performJwtValidation = (paramAuthHeader) => {

    let response;

    if (!paramAuthHeader) {
        response = { statusCode: statusCodes.FORBIDDEN, data: 'No token provided' };
    }

    // Extract the token from the header
    const token = paramAuthHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
        if (err) {
            console.log(err);
            response = { statusCode: statusCodes.UNAUTHORIZED, data: 'Invalid or expired token' };
            return response;
        }

        // Token is valid, return the role or any other necessary info
        response = { statusCode: statusCodes.SUCCESS, data: { role: decoded.role } }
    });

    return response;
}

export const signJwt = (paramBody, paramExpiresIn='1h') => {
    return jwt.sign(paramBody, `${process.env.JWT_SECRET_KEY}`, { expiresIn: paramExpiresIn });
}