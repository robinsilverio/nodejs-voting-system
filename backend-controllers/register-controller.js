import { performRegisteringVoter } from "../backend-services/register-service.js";

export function registerVoter (req, res) {
    return performRegisteringVoter(req, res);
}