// 주소 : /
// view만 전달해주는 router view Router -> ejs 파일만 전달해주는 router

import express from "express";
import { courseViewController, homeViewController, introduceViewController, joinViewController, loginCallbackController, loginViewController, profileViewController, qrViewController } from "../controller/viewController";

const viewRouter = express.Router();

viewRouter.get("/", homeViewController);
viewRouter.get("/introduce", introduceViewController);
viewRouter.get("/course", courseViewController);
viewRouter.get("/qr", qrViewController);
viewRouter.get("/users", profileViewController);
viewRouter.get("/join", joinViewController);
viewRouter.get("/login", loginViewController);
viewRouter.get("/login/callback", loginCallbackController);

export default viewRouter;