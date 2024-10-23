import { statusCodes } from "../src/enums/status-codes.js";
import { deleteFromTable, existsInDatabase, insertIntoTable, retrieveFromTable, updateFromTable } from "../dbclient.js";
import { getRequestBody, sendResponse } from "../server-routes.js";

export class HandleDatabaseService {
    
    constructor(paramTableName) {
        this.entity = paramTableName;
    }

    async retrieve(paramRes) {
        try {
            const result = await retrieveFromTable(this.entity, {});
            return sendResponse(paramRes, statusCodes.SUCCESS,  result);
        } catch (error) {
            console.log(error);
            return  sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong while retrieving from database');
        }
    }

    async create(paramReq, paramRes) {
        try {
            const requestBody = await getRequestBody(paramReq);

            const nameField = `${this.entity}_name`;
    
            if (await existsInDatabase(this.entity, { [nameField] : requestBody[nameField] })) {
                return sendResponse(paramRes, statusCodes.BAD_REQUEST, `${this.entity} already exists.`);
            }
            
            const election = await insertIntoTable(`${this.entity}`, requestBody);
            return sendResponse(paramRes, statusCodes.SUCCESS, `${this.entity} successfully created.`);
        } catch (error) {
            console.error(error);
            return sendResponse(paramRes,  statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong with the server.');
        }
    }

    async update(paramReq, paramRes) {
        try {
            let requestBody = await getRequestBody(paramReq);

            if (!await existsInDatabase(this.entity, { id: requestBody.id })) {
                return sendResponse(paramRes, statusCodes.NOT_FOUND, `${this.entity} not found.`);
            } else {
                const updatedEntity = await updateFromTable(this.entity, requestBody);
                return sendResponse(paramRes, statusCodes.SUCCESS, `Updating ${this.entity} was successful.`);
            }
        } catch (error) {
            console.error(error);
            return sendResponse(paramRes, statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong with the server.');
        }
    }

    async delete(paramReq, paramRes) {
        try {
            if (!await existsInDatabase(this.entity, { id: paramReq.query.id } )) {
                return sendResponse(paramRes, statusCodes.NOT_FOUND, `${this.entity} not found.`);
            }
            await deleteFromTable(this.entity, paramReq.query.id);
            return sendResponse(paramRes, statusCodes.SUCCESS, `${this.entity} was successfully deleted.`);
        } catch (error) {
            console.error(error);
            return sendResponse(paramRes,  statusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong with the server');
        }
    }

}