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

  static create(request: any, callback: (error: Error | null) => void) {
    //TODO: change from any to user when learn how to parse object into type
    // maybe I could check that it's type safe on the React app as well
    try {
      const requestObject = JSON.parse(request)
      const user: User = {
        id: 23434,
        email: requestObject.email,
        password: requestObject.password
      }
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
    } catch (err) {
      console.log(
        "Object: ",
        request,
        " Cannot be mapped onto User type. Error: ",
        err
      );
    }
  }
}

export default User;
