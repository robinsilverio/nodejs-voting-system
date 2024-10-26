import jwt from 'jsonwebtoken';
import { statusCodes } from "../src/enums/status-codes.js";

export const validateJwtToken = (paramAuthHeader) => {

    let response;

    if (!paramAuthHeader) {
        response = { statusCode: statusCodes.FORBIDDEN, data: 'No token provided' };
    }

    const token = paramAuthHeader.split(' ')[1];

    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
        if (err) {
            console.log(err);
            response = { statusCode: statusCodes.UNAUTHORIZED, data: 'Invalid or expired token' };
            return response;
        }

        response = { statusCode: statusCodes.SUCCESS, data: { role: decoded.role } }
    });

    return response;
}

export const signJwt = (paramBody, paramExpiresIn='1h') => {
    return jwt.sign(paramBody, `${process.env.JWT_SECRET_KEY}`, { expiresIn: paramExpiresIn });
}