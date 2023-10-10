// 주소 : /api
// api만 전달해주는 router apiRouter -> 데이터만 전달해주는 router

import express from "express";
import { getCourseList, qrCheck } from "../controller/courseController";

const apiRouter = express.Router();

apiRouter.get("/courses", getCourseList);
apiRouter.post("/courses", qrCheck);

export default apiRouter;