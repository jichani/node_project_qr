// 주소 : /api
// api만 전달해주는 router apiRouter -> 데이터만 전달해주는 router

import express from "express";
import { getCourseList, qrCheck } from "../controller/courseController";
import { join, login } from "../controller/userController";
import { handleKakaoLogin, isAuth } from "../middleware/auth";
import passport from "passport";

import { Strategy as KakaoStrategy } from "passport-kakao";
import jwt from "jsonwebtoken";

const apiRouter = express.Router();

apiRouter.get("/courses", isAuth, getCourseList);
apiRouter.post("/courses", isAuth, qrCheck);

// 회원가입
apiRouter.post("/join", join);
apiRouter.post("/login", login);

// 카카오 로그인
const clientId = process.env.CLIENT_ID;
const callback = "/api/kakao/callback";

passport.use(new KakaoStrategy({ clientID: clientId, callbackURL: callback }, handleKakaoLogin));

apiRouter.get("/kakao", passport.authenticate("kakao", { session: false }));
apiRouter.get("/kakao/callback", (request, response) => {
  passport.authenticate("kakao", { session: false }, async (err, user, info) => {
    // info로 들어오면
    if (info) {
      // console.log(info);
      return response.redirect("/login?error=" + info);
    } else if (!user) {
      return response.redirect("/login?error=sns_login_fail");
    } else {
      const accessToken = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, { expiresIn: "30d" });

      return response.redirect("/login/callback?accessToken=" + accessToken);
    }
  })(request, response);
});


export default apiRouter;