"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _courseController = require("../controller/courseController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// 주소 : /api
// api만 전달해주는 router apiRouter -> 데이터만 전달해주는 router

var apiRouter = _express["default"].Router();
apiRouter.get("/courses", _courseController.getCourseList);
var _default = exports["default"] = apiRouter;