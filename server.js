import { statusCodes } from "./src/enums/status-codes.js";
import { urls } from "./src/enums/urls.js";
import e from "express";
import url from 'url';
import { startDatabaseConnection } from "./dbclient.js";
import { login } from "./backend-services/login-service.js";
import { authenticateJWT } from "./backend-services/auth-service.js";

const PORT = process.env.PORT || 3000;
const app = e();

startDatabaseConnection();

app.use((paramReq, paramRes) => {    

    const parsedUrl = url.parse(paramReq.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (Object.values(urls.PUBLIC_URLS).includes(pathname)) {
        publicUrlHandlers[pathname](paramReq, paramRes);
    } else if (Object.values(urls.SECURED_URLS).includes(parsedUrl.pathname)) {
        authenticateJWT(paramReq, paramRes, () => {
            paramRes.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            paramRes.setHeader('Pragma', 'no-cache');
            paramRes.setHeader('Expires', '0');
            paramRes.setHeader('Surrogate-Control', 'no-store');
            securedUrlHandlers[pathname](paramReq, paramRes, query);
        });
    } else {
        sendResponse(paramRes, statusCodes.NOT_FOUND, '<h1>Error 404: Not found</h1>')
    }
});

app.listen(PORT);

const publicUrlHandlers = {
    [urls.PUBLIC_URLS.LOGIN] : (paramReq, paramRes) => login(paramReq, paramRes)
};

export const getRequestBody = (paramReq) => {
    return new Promise((resolve, reject) => {
        let body = '';
        paramReq.on('data', chunk => body += chunk);
        paramReq.on('end', () => resolve(JSON.parse(body)));
        paramReq.on('error', err => reject(err));
    });
};


// Method for generating responses.
export const sendResponse = (paramRes, paramStatusCode, paramResponseMessage) => {
    paramRes.status(paramStatusCode).send(paramResponseMessage);
};

export default app;
