import "dotenv/config";
// async-await을 사용하기 위한 문법
import "regenerator-runtime";

import express from "express";
import viewRouter from "./router/viewRouter";
import apiRouter from "./router/apiRouter";

const app = express();

// 노드는 middleware 시스템으로 이루어져있음

// express에게 ejs를 사용할 것이라고 선언
app.set("view engine", "ejs");

// 위치는 절대 주소를 지정하고 파일 위치를 잡는다.
app.set("views", process.cwd() + "/src/client/html");

// json 데이터 파싱 미들웨어
app.use(express.json());

app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

// view만 전달해주는 router view Router -> ejs 파일만 전달해주는 router
app.use("/", viewRouter);
// api만 전달해주는 router apiRouter -> 데이터만 전달해주는 router
app.use("/api", apiRouter);


app.listen(8080, () => {
  console.info("8080 포트 서버 열림 http://localhost:8080 👍");
});

