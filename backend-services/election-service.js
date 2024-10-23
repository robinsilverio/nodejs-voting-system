import { HandleDatabaseService } from "./handleDatabaseService.js";

const handleDatabaseService = new HandleDatabaseService("election");

export const performRetrieveElections = async(paramReq, paramRes) => {
    return handleDatabaseService.retrieve(paramRes);
}

export const performCreateElection = async(paramReq, paramRes) => {
    return handleDatabaseService.create(paramReq, paramRes);
}

export const performUpdateElection = async(paramReq, paramRes) => {
    return handleDatabaseService.update(paramReq, paramRes);
}

export const performDeleteElection = async (paramReq, paramRes) => {
    return handleDatabaseService.delete(paramReq, paramRes);
}