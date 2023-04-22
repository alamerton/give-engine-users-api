import connection from '../dbconfig';

class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(id: number, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    static findAll(callback: (error: Error | null, users?: User[]) => void) {
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) {
                callback(error);
            } else {
                const users = results.map((result: any) => new User(result.id, result.firstName, result.lastName, result.email));
                callback(null, users);
            }
        });
    }
}

export default User;
