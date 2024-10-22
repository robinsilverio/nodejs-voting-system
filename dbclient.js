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

export const retrieve = (paramTableName, paramColumns, paramConditions) => {

    try {
        return client.query(returnQuery('SELECT', paramTableName, paramColumns, paramConditions));
    } catch (err) {
        console.error('Error retrieving records from database', err);
        throw err;
    }
};

export const insert = (paramTableName, paramColumns, paramValues) => {

    console.log(returnQuery('INSERT', paramTableName, paramColumns, {}, paramValues));
    try {
        return client.query(returnQuery('INSERT', paramTableName, paramColumns, {}, paramValues));
    }  catch (err) {
        throw new Error('Error inserting record into database', err);
    }
};

export  const update = (paramTableName, paramColumns, paramConditions, paramValues) => {
    try {
        return client.query(returnQuery('UPDATE', paramTableName, paramColumns, paramConditions, paramValues));
    }  catch (err) {
        throw new Error('Error updating record ', err);
    }
}

export const remove = (paramTableName,  paramConditions) => {
    try {
        return client.query(returnQuery('DELETE', paramTableName, [], paramConditions));
    } catch (err) {
        throw new Error('Error deleting record from database', err);
    }
}

const returnQuery = (paramQueryType, paramTableName, paramColumns, paramConditions = {},  paramValues = {}) => {

    if (paramQueryType === 'SELECT') {
        return Object.keys(paramConditions).length > 0
            ? {
                text: `SELECT ${paramColumns.join(', ')} FROM ${paramTableName} WHERE ${Object.keys(paramConditions).map((key, index) => `${key} = $${index + 1}`).join(' AND ')}`,
                values: Object.values(paramConditions)
            }
            : {
                text: `SELECT ${paramColumns.join(', ')} FROM ${paramTableName}`,
                values: []
            };
    } else if (paramQueryType === 'INSERT') {
        return {
            text: `INSERT INTO ${paramTableName} (${paramColumns.join(', ')}) VALUES (${paramValues.map((value, index) => `$${index + 1}`).join(', ')}) RETURNING id`,
            values: paramValues
        }
    } else if (paramQueryType === 'UPDATE') {
        return {
            text: `UPDATE  ${paramTableName}  SET  ${(paramColumns.map((column, index) => `${column} = $${index + 1}`).join(', '))} WHERE ${Object.keys(paramConditions).map(key => `${key} = ${Object.keys(paramConditions).indexOf(key) + 1}`).join(' AND ')}`,
            values: paramValues
        }
    } else if (paramQueryType === 'DELETE') {
        return {
            text: `DELETE FROM ${paramTableName} WHERE ${Object.keys(paramConditions).map(key =>  `${key} = $${Object.keys(paramConditions).indexOf(key) + 1}`).join(' AND ')}`,
            values: Object.values(paramConditions)
        }
    } else {
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

export const insertIntoTable = async (paramTableName, paramData) => {
    const data = filterId(paramData);
    return await insert(paramTableName, tableColumnsPerTable[paramTableName.toUpperCase()].filter(column => column !== 'id'), Object.values(data));
}

export default client;