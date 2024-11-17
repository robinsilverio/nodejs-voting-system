import { HandleDatabaseService } from "./handleDatabaseService.js";

const handleDatabaseService = new HandleDatabaseService('candidate');

export const performRetrieveCandidates = async() => {
    return await handleDatabaseService.retrieve();
}

export const performCreateCandidate = async(paramRequestBody) => {
    return handleDatabaseService.create(paramRequestBody);
}

export const performUpdateCandidate = async(paramRequestBody) => {
    return handleDatabaseService.update(paramRequestBody);
}

export const performDeleteCandidate = async(paramId) => {
    return handleDatabaseService.delete({id: paramId});
}