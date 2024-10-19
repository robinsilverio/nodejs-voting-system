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

export const retrieveFromDatabase = (paramTableName, paramColumns, paramConditions) => {
    try {
        const query = {
            text: `SELECT ${paramColumns.join(', ')} FROM ${paramTableName}`,
            values: Object.values(paramConditions)
        };
        
        if (paramConditions) {
            query.text += ` WHERE ${Object.keys(paramConditions).map(key => `${key} = $${Object.keys(paramConditions).indexOf(key) + 1}`).join(' AND ')}`;
        }

        return client.query(query);
    } catch (err) {
        console.error('Error retrieving records from database', err);
        throw err;
    }
};

export const insertIntoDatabase = (paramTableName, paramColumns, paramValues) => {
    try {
        
        let queryText = `INSERT INTO ${paramTableName} (${paramColumns.join(', ')}) `;
        queryText +=  `VALUES (${paramValues.map((key) => '$' + (Object.values(paramValues).indexOf(key) + 1)).join(', ')}) RETURNING id`;

        const query = {
            text: queryText,
            values:  paramValues
        };

        return client.query(query);

    }  catch (err) {
        throw new Error('Error inserting record into database', err);
    }
};

export  const updateFromDatabase = (paramTableName, paramColumns, paramConditions, paramValues) => {
    try {
        let queryText = `UPDATE ${paramTableName} SET `;
        queryText += paramColumns.map((column, index) => `${column} = $${index}`).join(', ');
        queryText += ` WHERE ${Object.keys(paramConditions).map(key => `${key} = ${Object.keys(paramConditions).indexOf(key) + 1}`).join(' AND ')}`;

        const query = {
            text:  queryText,
            values: paramValues
        }

        return client.query(query);

    }  catch (err) {
        throw new Error('Error updating record ', err);
    }
}

export const deleteFromDatabase = (paramTableName,  paramConditions) => {
    try {
        let queryText = `DELETE FROM ${paramTableName} WHERE `;
        queryText += Object.keys(paramConditions).map(key => `${key} = $${Object.keys(paramConditions).indexOf(key) + 1 }`).join(' AND ');
        return client.query(queryText); 
    } catch (err) {
        throw new Error('Error deleting record from database', err);
    }
}

export default client;