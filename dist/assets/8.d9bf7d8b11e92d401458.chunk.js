webpackJsonp([8],{1015:function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _cookie = __webpack_require__(78);\n\nvar _cookie2 = _interopRequireDefault(_cookie);\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError("Cannot call a class as a function");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== "function" && superClass !== null) {\n    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nwindow.testCookie = _cookie2.default;\n\nconsole.log(window);\n\nvar Logout = function (_Component) {\n  _inherits(Logout, _Component);\n\n  function Logout() {\n    _classCallCheck(this, Logout);\n\n    return _possibleConstructorReturn(this, (Logout.__proto__ || Object.getPrototypeOf(Logout)).apply(this, arguments));\n  }\n\n  _createClass(Logout, [{\n    key: \'componentWillMount\',\n    value: function componentWillMount() {\n      _cookie2.default.deleteCookie(\'access_token\');\n      _cookie2.default.deleteCookie(\'name\');\n      _cookie2.default.deleteCookie(\'membership\');\n      _cookie2.default.deleteCookie(\'email\');\n      location.href = \'http://vies.ninja\';\n    }\n  }, {\n    key: \'render\',\n    value: function render() {\n      console.log(_cookie2.default.getCookie(\'access_token\'));\n      return _react2.default.createElement(\'div\', null, \'hello\');\n    }\n  }]);\n\n  return Logout;\n}(_react.Component);\n\nvar _default = Logout;\nexports.default = _default;\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === \'undefined\') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(Logout, \'Logout\', \'C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js\');\n\n  __REACT_HOT_LOADER__.register(_default, \'default\', \'C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js\');\n}();\n\n;\n;\n\nvar _temp2 = function () {\n  if (typeof __REACT_HOT_LOADER__ === \'undefined\') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(_createClass, "_createClass", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_react2, "_react2", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_cookie2, "_cookie2", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_interopRequireDefault, "_interopRequireDefault", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_classCallCheck, "_classCallCheck", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_possibleConstructorReturn, "_possibleConstructorReturn", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_inherits, "_inherits", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(Logout, "Logout", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_default, "_default", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n\n  __REACT_HOT_LOADER__.register(_temp, "_temp", "C:/OpenServer/domains/vat.local/myadmin/src/app/routes/logout/index.js");\n}();\n\n;\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/routes/logout/index.js\n// module id = 1015\n// module chunks = 8\n\n//# sourceURL=app/routes/logout/index.js')}});