import { tableColumnsPerTable } from './src/enums/tablecolumnspertable.js';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client(  
    {
        user: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: '5432',
        database: 'VotingSystem',
    }
);

export const startDatabaseConnection = () => {
    client.connect().then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});
};

export const closeDatabaseConnection = (done) => {
    client.end()
        .then(() => {
            console.log('Database connection closed');
            done();
        })
        .catch((err) => {
            console.error('Error closing the database connection', err);
            done(err); // Pass the error to the done callback
        });
};

const executeQuery = async (queryType, paramTableName, paramColumns, paramConditions = {}, paramValues = {}, paramJoin={}) => {
    try {
        const query = returnQuery(queryType, paramTableName, paramColumns, paramConditions, paramValues, paramJoin);
        console.log(query);
        return await client.query(query);
    } catch (err) {
        throw new Error(`Error executing ${queryType} operation: ${err.message}`);
    }
};

const retrieve = (paramTableName, paramColumns, paramConditions,  paramValues, paramJoin) => {
    return executeQuery('SELECT', paramTableName,  paramColumns, paramConditions, paramValues, paramJoin)
};
const insert = (paramTableName, paramColumns, paramValues) => {
    return executeQuery('INSERT',  paramTableName, paramColumns, {}, paramValues);
};
const update = (paramTableName, paramColumns, paramConditions, paramValues) => {
    return  executeQuery('UPDATE', paramTableName, paramColumns, paramConditions, Object.values(filterId(paramValues)));
}
const remove = (paramTableName,  paramConditions) => {
    return executeQuery('DELETE', paramTableName, [], paramConditions);
}


const returnQuery = (paramQueryType, paramTableName, paramColumns, paramConditions = {}, paramValues = {}, paramJoin = {}) => {
    
    // Define table aliases for main and joined tables
    const mainTableAlias = 'maintable';
    const joinTableAlias = 'jointable';

    // Create column references with aliases to avoid ambiguity
    const columns = paramColumns.map(column => {
        // Check if the column is from the main or join table
        if (column.includes('.')) {
            return `${column}`;
        }
        return `${paramJoin && paramJoin.tableColumns?.includes(column) ? joinTableAlias : mainTableAlias}.${column}`;
    }).join(', ');

    const whereClause = Object.keys(paramConditions).length > 0
        ? `WHERE ${Object.keys(paramConditions).map((key, index) => `${key} = $${index + 1}`).join(' AND ')}`
        : '';

    const joinClause = paramJoin && Object.keys(paramJoin).length > 0
        ? `JOIN ${paramJoin.joinTable} ${joinTableAlias} ON ${paramTableName}.${paramJoin.on} = ${paramJoin.joinTable}.${paramJoin.referenceColumn}`
        : '';

    switch (paramQueryType) {
        case 'SELECT':
            return {
                text: `SELECT ${columns} FROM ${paramTableName} ${mainTableAlias} ${joinClause} ${whereClause}`,
                values: Object.values(paramConditions)
            };
        case 'INSERT':
            const insertValues = paramValues.map((value, index) => `$${index + 1}`).join(', ');
            return {
                text: `INSERT INTO ${paramTableName} (${paramColumns.join(', ')}) VALUES (${insertValues}) RETURNING id`,
                values: paramValues
            };
        case 'UPDATE':
            const updateColumns = paramColumns.map((column, index) => `${column} = $${index + 1}`).join(', ');
            return {
                text: `UPDATE ${paramTableName} SET ${updateColumns} ${whereClause}`,
                values: paramValues
            };
        case 'DELETE':
            return {
                text: `DELETE FROM ${paramTableName} ${whereClause}`,
                values: Object.values(paramConditions)
            };
        default:
            throw new Error('Invalid query type');
    }
};

export const filterId = (paramRequestBody) => {
    return Object.fromEntries(
        Object.entries(paramRequestBody).filter(([key]) => key !== 'id') // Filter out 'id'
    );
}
export const existsInDatabase = async (paramTableName, paramConditions) => {
    const result = await retrieve(paramTableName, tableColumnsPerTable[paramTableName.toUpperCase()], paramConditions);
    return result.rows.length >  0 ? result.rows[0] : null;
}   
export const retrieveFromTable = async(paramTableName, paramConditions) => {
    return await retrieve(paramTableName, tableColumnsPerTable[paramTableName.toUpperCase()], paramConditions);
}
export const retrieveFromTableUsingJoin = async(paramTableName, paramJoinInformation) => {
    return await retrieve(paramTableName, paramJoinInformation.selectedColumns, paramJoinInformation.whereCondition, {},  paramJoinInformation);
}
export const insertIntoTable = async (paramTableName, paramData) => {
    return await insert(paramTableName, tableColumnsPerTable[paramTableName.toUpperCase()].filter(column => column !== 'id'), Object.values(filterId(paramData)));
}
export const updateFromTable = async (paramTableName, paramData) => {
    await update(paramTableName, tableColumnsPerTable[paramTableName.toUpperCase()].filter(column => column !== 'id'), { id: paramData.id }, paramData);
}
export const  deleteFromTable = async (paramTableName, paramId) => {
    await remove(paramTableName, { id: paramId });
}

export default client;