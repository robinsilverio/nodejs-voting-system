import { statusCodes } from "../src/enums/status-codes.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRequestBody, sendResponse } from "../server-routes.js";
import { retrieveFromDatabase } from "../dbclient.js";

export const performLogin = async (paramReq, paramRes) => {
    
    let requestBody = await getRequestBody(paramReq);
    let loginDetails = { user : null, loggedIn: false };
    
    const result = await retrieveFromDatabase('admins', ['*'], { username: requestBody.username });
    const retrievedUser = result.rows[0];
    
    if (retrievedUser !== undefined) {
        
        const isValidPassword = await bcrypt.compare(requestBody.password, retrievedUser.password);
        if (isValidPassword) {
            loginDetails.user = {
                id: retrievedUser.id,
                username: retrievedUser.username,
                role: 'ADMIN'
            };

            const token = signJwt({ username: loginDetails.user.username, role: loginDetails.user.role });

            loginDetails.loggedIn = true;
            loginDetails.token = token;

            return sendResponse(paramRes, statusCodes.SUCCESS, JSON.stringify({ loginDetails }));
        }
        return sendResponse(paramRes, statusCodes.UNAUTHORIZED, 'Username or password is incorrect.');
    } else {
        return sendResponse(paramRes, statusCodes.UNAUTHORIZED, 'Username or password is incorrect.');
    }
};

export const performJwtValidation = (paramReq, paramRes) => {
    
    const authHeader = paramReq.headers['authorization'];
    if (!authHeader) {
        return sendResponse(paramRes, statusCodes.FORBIDDEN, { message: 'No token provided' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
        if (err) {
            return sendResponse(paramRes, statusCodes.UNAUTHORIZED, { message: 'Invalid or expired token' });
        }

        // Token is valid, return the role or any other necessary info
        return sendResponse(paramRes, statusCodes.SUCCESS, { role: decoded.role })
    });
}

export const signJwt = (paramBody) => {
    return jwt.sign(paramBody, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h'});
}