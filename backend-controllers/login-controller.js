import { getRequestBody, sendResponse } from "../server-routes.js";
import { performJwtValidation, performLogin } from "../backend-services/login-service.js";
import { statusCodes } from "../src/enums/status-codes.js";

export async function login (paramReq, paramRes) {
    try {

        let requestBody = await getRequestBody(paramReq);
        const response = await performLogin(requestBody);
        return sendResponse(paramRes, response.statusCode, JSON.stringify(response.data)); 
    } catch (error) {
        console.error(error);
        return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in server.');
    }
}

export function validateJwt (req, res) {
    const authHeader = req.headers['authorization'];
    const response = performJwtValidation(authHeader);
    return sendResponse(res, response.statusCode, JSON.stringify(response.data));
}
