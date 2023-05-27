import express from "express";
import { viewHome } from "../controllers/videoControllers";
import { join, login } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", viewHome);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
