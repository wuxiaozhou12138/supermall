"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Home = function Home() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('views/home/Home'));
  });
};

var Cart = function Cart() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('views/cart/Cart'));
  });
};

var Profile = function Profile() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('views/profile/Profile'));
  });
};

var Sort = function Sort() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('views/sort/Sort'));
  });
};

_vue["default"].use(_vueRouter["default"]);

var _default = new _vueRouter["default"]({
  routes: [{
    path: '',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/profile',
    component: Profile
  }, {
    path: '/sort',
    component: Sort
  }],
  mode: 'history'
});

exports["default"] = _default;
var originalReplace = _vueRouter["default"].prototype.replace;

_vueRouter["default"].prototype.replace = function replace(location) {
  return originalReplace.call(this, location)["catch"](function (err) {
    return err;
  });
};