import connection from '../dbconfig';

class User {
    id: number;
    email: string;
    password: string;

    constructor(id: number, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    static getAll(callback: (error: Error | null, users?: User[]) => void) {
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) {
                callback(error);
            } else {
                const users = results.map((result: any) => new User(result.id, result.email, result.password));
                callback(null, users);
            }
        });
    }

    static create(request: any, callback: (error: Error | null) => void) { //TODO: change from any to user when learn how to parse object into type
        const user: User = {
            id: request.id,
            email: request.email,
            password: request.password
        }
        connection.query(`INSERT INTO users (id, email, password) VALUES ('${request.id}', '${request.email}', '${request.password}')`, (error) => {
            if (error) {
                callback(error)
            } else {
                callback(null)
            }
        })
    }
}

export default User;
