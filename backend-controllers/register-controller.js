import { getRequestBody, sendResponse } from "../server-routes.js";
import { performRegisteringVoter } from "../backend-services/register-service.js";
import { statusCodes } from "../src/enums/status-codes.js";

export async function registerVoter (req, res) {
    try {
        const requestBody = await getRequestBody(req);
        const response = await performRegisteringVoter(requestBody);
        return sendResponse(res, response.statusCode, response.data);
    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in server during voter registration.');
    }
}