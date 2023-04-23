"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
class User {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    static getAll(callback) {
        dbconfig_1.default.query("SELECT * FROM users", (error, results) => {
            if (error) {
                callback(error);
            }
            else {
                const users = results.map((result) => new User(result.id, result.email, result.password));
                callback(null, users);
            }
        });
    }
    static create(request, callback) {
        //TODO: change from any to user when learn how to parse object into type
        // maybe I could check that it's type safe on the React app as well
        try {
            const user = JSON.parse(request);
            dbconfig_1.default.query(`INSERT INTO users (id, email, password) VALUES ('${user.id}', '${user.email}', '${request.password}')`, (error) => {
                if (error) {
                    callback(error);
                }
                else {
                    callback(null);
                }
            });
        }
        catch (err) {
            console.log("Object: ", request, " Cannot be mapped onto User type. Error: ", err);
        }
    }
}
exports.default = User;
