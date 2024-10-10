import { sendResponse } from "../server-routes.js";
import { statusCodes } from "../src/enums/status-codes.js";
import jwt from 'jsonwebtoken';

export const secretKey = '8a376294c0acdcd34d8d5837cc62cb2f8e828a84682c123e695108961edee12c';

export const validateJwt = (paramReq, paramRes) => {
    const authHeader = paramReq.headers['authorization'];
    if (!authHeader) {
        return sendResponse(paramRes, 403, { message: 'No token provided' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return sendResponse(paramRes, 401, { message: 'Invalid or expired token' });
        }

        // Token is valid, return the role or any other necessary info
        return sendResponse(paramRes, 200, { role: decoded.role })
    });
}

export const signJwt = (paramBody) => {
    return jwt.sign(paramBody, secretKey, { expiresIn: '1h'});
}