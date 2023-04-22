import { Request, Response } from "express";
import User from "../models/User";

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
    const request = JSON.parse(req.body)
    console.log(request)
    User.create(req, (error) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(200);
      }
    });
  }
}

export default UserController;
