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
    static checkPassword(password, confirmPassword) {
        return password === confirmPassword ? true : false;
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
    static get(callback) {
        dbconfig_1.default.query("SELECT FROM users WHERE ", (error, results) => {
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
        const requestAsJSON = JSON.parse(request);
        const passwordsMatch = this.checkPassword(requestAsJSON.password, requestAsJSON.confirmPassword);
        if (passwordsMatch) {
            const userID = (0, uuid_1.v4)();
            const user = {
                id: userID,
                email: requestAsJSON.email,
                password: requestAsJSON.password,
            };
            dbconfig_1.default.query(`INSERT INTO users (id, email, password) VALUES ('${user.id}', '${user.email}', '${user.password}')`, (error) => {
                if (error) {
                    callback(error, null);
                }
                else {
                    callback(null, userID);
                }
            });
        }
        else {
            const passwordError = new Error("Passwords do not match");
            callback(passwordError, null);
        }
    }
    static signIn(request, callback) {
        const requestAsJSON = JSON.parse(request);
        dbconfig_1.default.query(`SELECT * FROM users WHERE email='${requestAsJSON.email}'`, (error, results) => {
            if (error) {
                callback(error, null);
            }
            else {
                const user = {
                    id: results[0].id,
                    email: results[0].email,
                    password: results[0].password,
                };
                const passwordsMatch = this.checkPassword(requestAsJSON.password, user.password);
                passwordsMatch
                    ? callback(null, user.id)
                    : callback(new Error("Passwords do not match"), null);
            }
        });
    }
}
exports.default = User;
