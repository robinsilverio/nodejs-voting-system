import { login } from './backend-services/login-service.js';
import e from 'express';
import { validateJwt } from './backend-services/auth-service.js';
const router = e.Router();

router.post('/login', (req, res) => {
    return login(req, res);
});
router.get('/validate-jwt', (req, res) => {
    return validateJwt(req, res);
});

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