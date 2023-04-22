import * as mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ginger tote bag box',
    database: 'give_engine'
});

connection.connect((error) => {
    if (error) {
        console.log(`Error connecting to database: ${error}`);
    } else {
        console.log(`Connected to database`);
    }
});

export default connection;