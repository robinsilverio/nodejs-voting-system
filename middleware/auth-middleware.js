import { validateJwtToken } from "../utils/jwtUtils.js";
import { sendResponse } from "../server-routes.js";
import { statusCodes } from "../src/enums/status-codes.js";

export const authorizeJwt = (paramReq, paramRes, triggerFunctionOnSuccess) => {
    
    const tokenValidationResult = validateJwtToken(paramReq.header('authorization'));

    if (tokenValidationResult.statusCode !== statusCodes.SUCCESS) {
        return sendResponse(paramRes, tokenValidationResult.statusCode, { error: tokenValidationResult.data });
    }

    // Attach decoded user info to the request object
    paramReq.userId = tokenValidationResult.data.userId;
    triggerFunctionOnSuccess();
}