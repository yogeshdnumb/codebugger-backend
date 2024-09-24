import { Request, Response } from "express";
import { getImgInfo } from "../gemini";

export async function getIndex(req: Request, res: Response) {
  res.send("Hello World!");
}

export async function postUpload(req: Request, res: Response) {
  console.log(req.file);
  let response = null;
  if (req.file) {
    response = await getImgInfo(req.file?.buffer, req.file?.mimetype);
  }
  // console.log(response);

  res.json(response);
}
