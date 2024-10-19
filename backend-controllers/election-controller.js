import { performCreateElection } from "../backend-services/election-service.js";

export function createElection(paramReq, paramRes) {
    return performCreateElection(paramReq, paramRes);
}