import e from 'express';
import { login, validateJwt } from './backend-controllers/login-controller.js';
import { registerVoter } from './backend-controllers/register-controller.js';
import { 
    createElection, 
    deleteElection, 
    retrieveElections, 
    updateElection 
} from './backend-controllers/election-controller.js';
import { 
    createCandidate, 
    deleteCandidate, 
    retrieveCandidates, 
    updateCandidate 
} from './backend-controllers/candidate-controller.js';
import { authorizeJwt } from './middleware/auth-middleware.js';
import { performJwtValidation } from './backend-services/login-service.js';

const router = e.Router();

router.post('/login', (req, res) => login(req, res));
router.post('/register-voter', (req, res) => registerVoter(req, res));
router.get('/validate-jwt', (req, res) => {
    const result = performJwtValidation(req.header('authorization'));
    return sendResponse(res, result.statusCode, result.data);
});
router.get('/validate-voter-token', (req, res) => validateVoterToken(req, res));
router.post('/elections', authorizeJwt, (req, res) =>  createElection(req, res));
router.get('/elections', authorizeJwt, (req, res) => retrieveElections(res));
router.put('/elections', authorizeJwt, (req, res) => updateElection(req, res));
router.delete('/elections', authorizeJwt, (req, res) => deleteElection(req, res));
router.post('/candidates', authorizeJwt, (req, res) => createCandidate(req, res));
router.get('/candidates', authorizeJwt, (req, res) => retrieveCandidates(res));
router.put('/candidates', authorizeJwt, (req, res) => updateCandidate(req, res));
router.delete('/candidates', authorizeJwt, (req, res) => deleteCandidate(req, res));




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