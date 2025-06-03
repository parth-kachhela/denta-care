import express, { Response, Request } from "express";
const app = express();
export default function (req: Request, res: Response) {
  const fullName = req.body;
}
