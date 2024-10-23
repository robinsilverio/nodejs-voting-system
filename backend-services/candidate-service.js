import { HandleDatabaseService } from "./handleDatabaseService.js";

const handleDatabaseService = new HandleDatabaseService('candidate');

export const performRetrieveCandidates = async(paramReq, paramRes) => {
    return handleDatabaseService.retrieve(paramRes);
}

export const performCreateCandidate = async(paramReq, paramRes) => {
    return handleDatabaseService.create(paramReq, paramRes);
}

export const performUpdateCandidate = async(paramReq, paramRes) => {
    return handleDatabaseService.update(paramReq, paramRes);
}

export const performDeleteCandidate = async(paramReq, paramRes) => {
    return handleDatabaseService.delete(paramReq, paramRes);
}