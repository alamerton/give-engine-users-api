import connection from "../dbconfig";

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
    connection.query("SELECT * FROM users", (error, results) => {
      if (error) {
        callback(error);
      } else {
        const users = results.map(
          (result: any) => new User(result.id, result.email, result.password)
        );
        callback(null, users);
      }
    });
  }

  static create(req: any, callback: (error: Error | null) => void) {
    try {
      const request = JSON.parse(req);
      const user: User = {
        id: 23434,
        email: request.email,
        password: request.password,
      };
      console.log("REQUEST over here: ", request);
      connection.query(
        `INSERT INTO users (id, email, password) VALUES ('${user.id}', '${user.email}', '${request.password}')`,
        (error) => {
          if (error) {
            callback(error);
          } else {
            callback(null);
          }
        }
      );
    } catch (error) {
      console.log(
        "Object: ",
        req,
        " Cannot be mapped onto User type. Error: ",
        error
      );
      callback(error as Error);
    }
  }
}

export default User;
