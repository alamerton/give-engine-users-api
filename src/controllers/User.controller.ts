import { Request, Response } from "express";
import User from "../models/User";

class UserController {
  static async getAll(req: Request, res: Response) {
    User.getAll((error, users) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.json({ users });
      }
    });
  }
  // static async get(req: Request, res: Response) {
  //   User.get((error, user) => {
  //     if (error) {
  //       res.status(500).json({ error });
  //     } else {
  //       res.json({ user });
  //     }
  //   });
  // }
  static async create(req: Request, res: Response) {
    const request = JSON.stringify(req.body);
    User.create(request, (error, id) => {
      if (error && error?.message === "Passwords do not match") {
        res.status(401);
      } else if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ id });
      }
    });
  }
  static async signIn(req: Request, res: Response) {
    const request = JSON.stringify(req.body);
    User.signIn(request, (error) => {
      if (error && error?.message === "Incorrect password") {
        // TODO: make function to remove duplicate
        res.status(401);
      } else if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201);
      }
    });
  }
}

export default UserController;
