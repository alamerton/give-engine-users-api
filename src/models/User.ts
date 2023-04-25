import connection from "../dbconfig";
import { v4 as uuid } from "uuid";

class User {
  id: string;
  email: string;
  password: string;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static checkPassword(password: string, confirmPassword: string) {
    return password === confirmPassword ? true : false;
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

  static get(callback: (error: Error | null, user?: User) => void) {
    connection.query("SELECT FROM users WHERE ", (error, results) => {
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

  static create(
    request: any,
    callback: (error: Error | null, id: string | null) => void
  ) {
    const requestAsJSON = JSON.parse(request);
    const passwordsMatch = this.checkPassword(
      requestAsJSON.password,
      requestAsJSON.confirmPassword
    );
    if (passwordsMatch) {
      const userID: string = uuid();
      const user: User = {
        id: userID,
        email: requestAsJSON.email,
        password: requestAsJSON.password,
      };
      connection.query(
        `INSERT INTO users (id, email, password) VALUES ('${user.id}', '${user.email}', '${user.password}')`,
        (error) => {
          if (error) {
            callback(error, null);
          } else {
            callback(null, userID);
          }
        }
      );
    } else {
      const passwordError = new Error("Passwords do not match");
      callback(passwordError, null);
    }
  }

  static signIn(
    request: any,
    callback: (error: Error | null, id: string | null) => void
  ) {
    const requestAsJSON = JSON.parse(request);
    connection.query(
      `SELECT * FROM users WHERE email='${requestAsJSON.email}'`,
      (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          const user: User = {
            id: results[0].id,
            email: results[0].email,
            password: results[0].password,
          };
          const passwordsMatch = this.checkPassword(
            requestAsJSON.password,
            user.password
          );
          passwordsMatch
            ? callback(null, user.id)
            : callback(new Error("Passwords do not match"), null);
        }
      }
    );
  }
}

export default User;
