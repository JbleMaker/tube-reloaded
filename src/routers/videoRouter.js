import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoControllers";
import { portectorMiddleware, videoUpload } from "../middlewares";

const videosRouter = express.Router();

videosRouter.get("/:id([0-9a-f]{24})", watch);

videosRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(portectorMiddleware)
  .get(getEdit)
  .post(postEdit);

videosRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(portectorMiddleware)
  .get(deleteVideo);

videosRouter
  .route("/upload")
  .all(portectorMiddleware)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

export default videosRouter;
