import { login } from './backend-services/login-service.js';
import e from 'express';
import { urls } from "./src/enums/urls.js";
const router = e.Router();

router.post('/login', (req, res) => {
    console.log(process.env.VUE_API_BASE_URL);
    
    publicUrlHandlers[urls.PUBLIC_URLS.LOGIN](req, res);
});

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

export default router;