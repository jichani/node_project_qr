// 주소 : /api
// api만 전달해주는 router apiRouter -> 데이터만 전달해주는 router

import express from "express";
import { getCourseList, qrCheck } from "../controller/courseController";
import { join, login } from "../controller/userController";

const apiRouter = express.Router();

apiRouter.get("/courses", getCourseList);
apiRouter.post("/courses", qrCheck);

// 회원가입
apiRouter.post("/join", join);
apiRouter.post("/login", login);

export default apiRouter;