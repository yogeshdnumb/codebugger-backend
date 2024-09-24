import express from "express";
import { upload } from "../utils/multer";
import { getIndex, postUpload } from "../controllers/index.controller";
const router = express.Router();

router.get("/", getIndex);
router.post("/upload", upload.single("img"), postUpload);

export default router;
