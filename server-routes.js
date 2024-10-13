import e from 'express';
import { login, validateJwt } from './backend-controllers/login-controller.js';
import { registerVoter } from './backend-controllers/register-controller.js';
const router = e.Router();

router.post('/login', (req, res) => login(req, res));
router.post('/register-voter', (req, res) => registerVoter(req, res));
router.get('/validate-jwt', (req, res) => validateJwt(req, res));

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