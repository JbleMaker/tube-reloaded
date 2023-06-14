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
  .post(
    videoUpload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumb", maxCount: 1 },
    ]),
    postUpload
  );

export default videosRouter;
