import { sendResponse } from "../server-routes.js";
import { statusCodes } from "../src/enums/status-codes.js";
import jwt from 'jsonwebtoken';

export const authorizeJwt = (paramReq, paramRes, triggerFunctionOnSuccess) => {
    let token = paramReq.header('authorization');
    
    if (!token) return sendResponse(paramRes, statusCodes.UNAUTHORIZED, { error: 'Access denied' });
    try {
        const decoded = jwt.verify(token.split(" ")[1], `${process.env.JWT_SECRET_KEY}`);
        paramReq.userId = decoded.userId;
        return triggerFunctionOnSuccess();
    } catch (error) {
        return sendResponse(paramRes, statusCodes.UNAUTHORIZED, { error: 'Invalid token' });
    }
}