import { sendResponse } from ".././server.js";
import { statusCodes } from "../src/enums/status-codes.js";
import jwt from 'jsonwebtoken';

export const secretKey = '8a376294c0acdcd34d8d5837cc62cb2f8e828a84682c123e695108961edee12c';

export const authenticateJWT = (paramReq, paramRes, triggerNextFunction) => {
    
    const token = paramReq.headers['authorization'];
    
    if (token) {

        const token = paramReq.headers.authorization.split(' ')[1];        

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                sendResponse(paramRes, statusCodes.FORBIDDEN, 'Access Denied');
            } else {
                paramReq.user = user;
                triggerNextFunction();
            }
        });
    } else {
        sendResponse(paramRes, statusCodes.UNAUTHORIZED, 'Unauthorized');
    }
};