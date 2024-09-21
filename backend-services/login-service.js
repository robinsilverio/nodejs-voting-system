import { statusCodes } from "../src/enums/status-codes.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secretKey } from "./auth-service.js";
import { getRequestBody, sendResponse } from "../server-routes.js";
import client from "../dbclient.js";

export const login = async (paramReq, paramRes) => {
    
    let requestBody = await getRequestBody(paramReq);
    let loginDetails = { user : null, loggedIn: false };
    
    client.query('SELECT * FROM admins WHERE username = $1', [requestBody.username], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in the server. Try again.')
        } else {
            let retrievedUser = result.rows[0];
            if (retrievedUser !== undefined) {
                bcrypt.compare(requestBody.password, retrievedUser.password, (err, success) => {
                    if (success) {  
                        loginDetails.user = { id: retrievedUser.id, username: retrievedUser.username };
                        const token = jwt.sign(loginDetails.user, secretKey, { expiresIn: '1h' });
                        loginDetails.loggedIn = true;
                        loginDetails.token = token;
                        sendResponse(paramRes, statusCodes.SUCCESS, JSON.stringify({loginDetails}));
                        return;
                    }
                    sendResponse(paramRes, statusCodes.UNAUTHORIZED, 'Username or password is incorrect.');
                });                
            } else {
                sendResponse(paramRes, statusCodes.UNAUTHORIZED, 'Username or password is incorrect.');
            }
        }
    });
}