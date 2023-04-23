"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const uuid_1 = require("uuid");
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
        try {
            const requestAsJSON = JSON.parse(request);
            const userID = (0, uuid_1.v4)();
            const user = {
                id: userID,
                email: requestAsJSON.email,
                password: requestAsJSON.password,
            };
            dbconfig_1.default.query(`INSERT INTO users (id, email, password) VALUES ('${user.id}', '${user.email}', '${user.password}')`, (error) => {
                if (error) {
                    callback(error);
                }
                else {
                    callback(null);
                }
            });
        }
        catch (error) {
            console.log("Object: ", request, " Cannot be mapped onto User type. Error: ", error);
            callback(error);
        }
    }
}
exports.default = User;
