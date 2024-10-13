import { performJwtValidation, performLogin } from "../backend-services/login-service.js";

export function login (req, res) {
    return performLogin(req, res);
}

export function validateJwt (req, res) {
    return performJwtValidation(req, res);
}
