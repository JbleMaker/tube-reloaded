import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoControllers";

const videosRouter = express.Router();

videosRouter.get("/:id([0-9a-f]{24})", watch);

videosRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);

videosRouter.route("/upload").get(getUpload).post(postUpload);

export default videosRouter;
