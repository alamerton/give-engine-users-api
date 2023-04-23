import { Request, Response } from "express";
import User from "../models/User";
import { json } from "body-parser";
import { log } from "console";

class UserController {
  static async getAll(req: Request, res: Response) {
    // Error is handled here and not at the model level. Why?
    User.getAll((error, users) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.json({ users });
      }
    });
  }
  static async create(req: Request, res: Response) {
    const request = JSON.stringify(req.body);
    console.log("Request: ", request);
    User.create(request, (error) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.sendStatus(200);
      }
    });
  }
}

export default UserController;
