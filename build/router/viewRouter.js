"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _viewController = require("../controller/viewController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// 주소 : /
// view만 전달해주는 router view Router -> ejs 파일만 전달해주는 router

var viewRouter = _express["default"].Router();
viewRouter.get("/", _viewController.homeViewController);
viewRouter.get("/introduce", _viewController.introduceViewController);
viewRouter.get("/course", _viewController.courseViewController);
viewRouter.get("/qr", _viewController.qrViewController);
viewRouter.get("/users", _viewController.profileViewController);
viewRouter.get("/join", _viewController.joinViewController);
viewRouter.get("/login", _viewController.loginViewController);
var _default = exports["default"] = viewRouter;