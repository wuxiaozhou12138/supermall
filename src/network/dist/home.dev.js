"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHomeData = getHomeData;

var _request = require("./request.js");

function getHomeData() {
  return (0, _request.request)({
    url: '/home/multidata'
  });
}