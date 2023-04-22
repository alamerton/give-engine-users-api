import { Request, Response } from "express";
import User from "../models/User";

class UserController {
  static async index(req: Request, res: Response) {
    User.findAll((error, users) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.json({ users });
      }
    });
  }
}

export default UserController;
