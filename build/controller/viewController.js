"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qrViewController = exports.profileViewController = exports.loginViewController = exports.joinViewController = exports.introduceViewController = exports.homeViewController = exports.courseViewController = void 0;
var homeViewController = exports.homeViewController = function homeViewController(req, res) {
  var homeData = {
    data: [{
      name: "철수"
    }, {
      name: "영희"
    }, {
      name: "민수"
    }]
  };
  res.render("home", homeData);
};
var introduceViewController = exports.introduceViewController = function introduceViewController(req, res) {
  res.render("introduce");
};
var courseViewController = exports.courseViewController = function courseViewController(req, res) {
  res.render("course");
};
var qrViewController = exports.qrViewController = function qrViewController(req, res) {
  res.render("qr");
};
var profileViewController = exports.profileViewController = function profileViewController(req, res) {
  res.render("users");
};
var joinViewController = exports.joinViewController = function joinViewController(req, res) {
  res.render("joinForm");
};
var loginViewController = exports.loginViewController = function loginViewController(req, res) {
  res.render("loginForm");
};