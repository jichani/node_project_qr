"use strict";

require("dotenv/config");
require("regenerator-runtime");
var _express = _interopRequireDefault(require("express"));
var _viewRouter = _interopRequireDefault(require("./router/viewRouter"));
var _apiRouter = _interopRequireDefault(require("./router/apiRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// async-await을 사용하기 위한 문법

var app = (0, _express["default"])();

// 노드는 middleware 시스템으로 이루어져있음

// express에게 ejs를 사용할 것이라고 선언
app.set("view engine", "ejs");
// 위치는 절대 주소를 지정하고 파일 위치를 잡는다.
app.set("views", process.cwd() + "/src/client/html");
app.use("/css", _express["default"]["static"]("src/client/css"));
app.use("/js", _express["default"]["static"]("src/client/js"));
app.use("/file", _express["default"]["static"]("src/client/file"));

// view만 전달해주는 router view Router -> ejs 파일만 전달해주는 router
app.use("/", _viewRouter["default"]);
// api만 전달해주는 router apiRouter -> 데이터만 전달해주는 router
app.use("/api", _apiRouter["default"]);
app.listen(8080, function () {
  console.info("8080 포트 서버 열림 http://localhost:8080 👍");
});