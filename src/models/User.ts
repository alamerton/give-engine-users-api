import { response } from "express";
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

  static create(request: any, callback: (error: Error | null) => void) {
    try {
      const requestAsJSON = JSON.parse(request);
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
            callback(error);
          } else {
            callback(null);
          }
        }
      );
    } catch (error) {
      console.log(
        "Object: ",
        request,
        " Cannot be mapped onto User type. Error: ",
        error
      );
      callback(error as Error);
    }
  }
}

export default User;
