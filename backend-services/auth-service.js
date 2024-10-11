import { sendResponse } from "../server-routes.js";
import { statusCodes } from "../src/enums/status-codes.js";
import jwt from 'jsonwebtoken';

export const validateJwt = (paramReq, paramRes) => {
    
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