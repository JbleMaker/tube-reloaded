import express from "express";
import {
  userEdit,
  see,
  logout,
  startGithubLogin,
  finalGithubLogin,
  getUserEdit,
  postUserEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import {
  portectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares";

const usersRouter = express.Router();

usersRouter.get("/logout", portectorMiddleware, logout);
usersRouter
  .route("/edit")
  .all(portectorMiddleware)
  .get(getUserEdit)
  .post(avatarUpload.single("avatar"), postUserEdit);
usersRouter
  .route("/change-password")
  .all(portectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

usersRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
usersRouter.get("/github/final", publicOnlyMiddleware, finalGithubLogin);
usersRouter.get("/:id", see);

export default usersRouter;
