import { statusCodes } from "../src/enums/status-codes.js";
import { deleteFromTable, existsInDatabase, insertIntoTable, retrieveFromTable, retrieveFromTableUsingJoin, updateFromTable } from "../dbclient.js";
import { getRequestBody, sendResponse } from "../server-routes.js";

export class HandleDatabaseService {
    
    constructor(paramTableName) {
        this.entity = paramTableName;
    }

    async retrieve(paramConditions = {}) {
        return await retrieveFromTable(this.entity, paramConditions);
    }

    async retrieveByJoin(paramJoinInformation) {
        return await retrieveFromTableUsingJoin(this.entity, paramJoinInformation);
    }

    async create(paramRequestBody) {
        return await insertIntoTable(`${this.entity}`, paramRequestBody);
    }

    async update(paramRequestBody) {
        if (!await existsInDatabase(this.entity, { id: paramRequestBody.id })) {
            return { statusCode: statusCodes.NOT_FOUND, data: `${this.entity} not found.` };
        } else {
            const updatedEntity = await updateFromTable(this.entity, paramRequestBody);
            return { statusCode: statusCodes.SUCCESS, data: `Updating ${this.entity} was successful.` };
        }
    }

    async delete(paramId) {
        if (!await existsInDatabase(this.entity, { id: paramId } )) {
            return { statusCode: statusCodes.NOT_FOUND, data: `${this.entity} not found.` };
        }
        await deleteFromTable(this.entity, paramId);
        return { statusCode: statusCodes.SUCCESS, data: `${this.entity} was successfully deleted.` };
    }

}