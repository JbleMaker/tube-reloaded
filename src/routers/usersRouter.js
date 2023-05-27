import express from "express";
import { userEdit, remove, see, logout } from "../controllers/userControllers";

const usersRouter = express.Router();

usersRouter.get("/logout", logout);
usersRouter.get("/edit", userEdit);
usersRouter.get("/remove", remove);
usersRouter.get(":id", see);

export default usersRouter;
