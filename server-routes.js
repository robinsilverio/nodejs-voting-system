import { login } from './backend-services/login-service.js';
import e from 'express';
import { urls } from "./src/enums/urls.js";
import jwt from 'jsonwebtoken';
import { secretKey } from './backend-services/auth-service.js';
const router = e.Router();

router.post('/login', (req, res) => {
    publicUrlHandlers[urls.PUBLIC_URLS.LOGIN](req, res);
});

const publicUrlHandlers = {
    [urls.PUBLIC_URLS.LOGIN] : (paramReq, paramRes) => login(paramReq, paramRes)
};

router.get('/validate-jwt', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Token is valid, return the role or any other necessary info
        return res.status(200).json({ role: decoded.role });
    });
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