import { HandleDatabaseService } from "./handleDatabaseService.js";

const handleDatabaseService = new HandleDatabaseService("election");

export const performRetrieveElections = async() => {
    return await handleDatabaseService.retrieve();
}

export const performCreateElection = async(paramRequestBody) => {
    return await handleDatabaseService.create(paramRequestBody);
}

export const performUpdateElection = async(paramRequestBody) => {
    return handleDatabaseService.update(paramRequestBody);
}

export const performDeleteElection = async (paramId) => {
    return handleDatabaseService.delete(paramId);
}