/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/apps/_common/pages/NotFound.js":
/*!********************************************!*\
  !*** ./src/apps/_common/pages/NotFound.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar NotFoundPage = function NotFoundPage(_ref) {\n  var staticContext = _ref.staticContext;\n\n  if (staticContext) {\n    staticContext.notFound = true;\n    console.log('LLLLLLLLLL*****************============================');\n  }\n\n  return _react.default.createElement(\"div\", {\n    className: \"NotFoundPage-p-00 About-p-00\"\n  }, _react.default.createElement(\"h1\", null, \"404\"), _react.default.createElement(\"p\", {\n    className: \"About-Subheading-01\"\n  }, \"This Page doesn't Exist\"), _react.default.createElement(\"p\", null, _react.default.createElement(\"strong\", null, \"Go back to\"), \" \", _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/about\"\n  }, \"Home\")));\n};\n\nvar _default = {\n  component: NotFoundPage\n};\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/_common/pages/NotFound.js?");

/***/ }),

/***/ "./src/apps/extra/Extra.js":
/*!*********************************!*\
  !*** ./src/apps/extra/Extra.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterConfig = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _Header = _interopRequireDefault(__webpack_require__(/*! ./components/Header1 */ \"./src/apps/extra/components/Header1.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar __isNode__ = false;\n\nif ((typeof process === \"undefined\" ? \"undefined\" : _typeof(process)) === 'object') {\n  if (_typeof(process.versions) === 'object') {\n    if (typeof process.versions.node !== 'undefined') {\n      __isNode__ = true;\n    }\n  }\n}\n\nvar Extra = function Extra(props) {\n  var pathName = props.staticContext ? props.staticContext.req.path.replace(/^\\/([^\\/]*).*$/, '$1') : !__isNode__ && window.location.pathname.replace(/^\\/([^\\/]*).*$/, '$1');\n  return _react.default.createElement(\"div\", {\n    className: \"Extra-a-00\"\n  }, _react.default.createElement(_Header.default, {\n    pathName: pathName\n  }), _react.default.createElement(\"div\", null, (0, _reactRouterConfig.renderRoutes)(props.route.routes)));\n};\n\nvar _default = {\n  component: Extra\n};\nexports.default = _default;\n\nDate.prototype.getFormattedDate = function () {\n  return \"\".concat(this.getFullYear(), \"-\").concat(this.getMonth() + 1, \"-\").concat(this.getDate());\n};\n\n//# sourceURL=webpack:///./src/apps/extra/Extra.js?");

/***/ }),

/***/ "./src/apps/extra/ExtraRouter.js":
/*!***************************************!*\
  !*** ./src/apps/extra/ExtraRouter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _Extra = _interopRequireDefault(__webpack_require__(/*! ./Extra */ \"./src/apps/extra/Extra.js\"));\n\nvar _About = _interopRequireDefault(__webpack_require__(/*! ./pages/About */ \"./src/apps/extra/pages/About.js\"));\n\nvar _Login = _interopRequireDefault(__webpack_require__(/*! ./pages/Login */ \"./src/apps/extra/pages/Login.js\"));\n\nvar _Signup = _interopRequireDefault(__webpack_require__(/*! ./pages/Signup */ \"./src/apps/extra/pages/Signup.js\"));\n\nvar _NotFound = _interopRequireDefault(__webpack_require__(/*! ../_common/pages/NotFound */ \"./src/apps/_common/pages/NotFound.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar ExtraRouter = [_objectSpread({}, _Extra.default, {\n  routes: [// { ...HomePage, path: '/', exact: true },\n  _objectSpread({}, _About.default, {\n    path: '/about',\n    exact: true\n  }), _objectSpread({}, _Login.default, {\n    path: '/login',\n    exact: true\n  }), _objectSpread({}, _Signup.default, {\n    path: '/signup',\n    exact: true\n  }), // { ...ForgotPasswordPage, path: '/forgot_password', exact: true },\n  // { ...ResetPasswordPage, path: '/reset_password', exact: true },\n  // { ...SettingsPage, path: '/settings' },\n  _objectSpread({}, _NotFound.default)]\n})];\nvar _default = ExtraRouter;\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/ExtraRouter.js?");

/***/ }),

/***/ "./src/apps/extra/actions/action_types.js":
/*!************************************************!*\
  !*** ./src/apps/extra/actions/action_types.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.STOP_PROGRESS_BAR = exports.START_PROGRESS_BAR = void 0;\nvar START_PROGRESS_BAR = 'START_PROGRESS_BAR';\nexports.START_PROGRESS_BAR = START_PROGRESS_BAR;\nvar STOP_PROGRESS_BAR = 'STOP_PROGRESS_BAR';\nexports.STOP_PROGRESS_BAR = STOP_PROGRESS_BAR;\n\n//# sourceURL=webpack:///./src/apps/extra/actions/action_types.js?");

/***/ }),

/***/ "./src/apps/extra/components/CreadentialsForm.js":
/*!*******************************************************!*\
  !*** ./src/apps/extra/components/CreadentialsForm.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _fa = __webpack_require__(/*! react-icons/fa */ \"react-icons/fa\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar CreadentialsForm = function CreadentialsForm(_ref) {\n  var pathName = _ref.pathName,\n      errorMsg = _ref.errorMsg,\n      onFormSubmit = _ref.onFormSubmit;\n\n  var _useState = (0, _react.useState)(''),\n      _useState2 = _slicedToArray(_useState, 2),\n      name = _useState2[0],\n      setName = _useState2[1];\n\n  var _useState3 = (0, _react.useState)(''),\n      _useState4 = _slicedToArray(_useState3, 2),\n      email = _useState4[0],\n      setEmail = _useState4[1];\n\n  var _useState5 = (0, _react.useState)(''),\n      _useState6 = _slicedToArray(_useState5, 2),\n      password = _useState6[0],\n      setPassword = _useState6[1];\n\n  return _react.default.createElement(\"div\", {\n    className: \"CreadentialsForm-c-00\"\n  }, _react.default.createElement(\"h2\", {\n    style: {\n      textAlign: 'left',\n      margin: '10px 0px',\n      width: '100%'\n    }\n  }, pathName === 'signup' ? 'Create a new Account' : 'Login to Schedular'), errorMsg && _react.default.createElement(\"p\", {\n    style: {\n      width: '100%',\n      margin: '0px',\n      color: 'var(--danger-red-color)'\n    }\n  }, errorMsg), _react.default.createElement(\"form\", {\n    onSubmit: function onSubmit(e) {\n      e.preventDefault();\n      onFormSubmit({\n        name: name,\n        email: email,\n        password: password\n      });\n    }\n  }, pathName === 'signup' && _react.default.createElement(\"input\", {\n    placeholder: \"Name\",\n    className: \"Theme-Input-99\",\n    type: \"text\",\n    autoComplete: \"off\",\n    onChange: function onChange(e) {\n      return setName(e.target.value);\n    },\n    value: name\n  }), _react.default.createElement(\"input\", {\n    placeholder: \"Email\",\n    className: \"Theme-Input-99\",\n    type: \"email\",\n    autoComplete: \"off\",\n    onChange: function onChange(e) {\n      return setEmail(e.target.value);\n    },\n    value: email\n  }), _react.default.createElement(\"input\", {\n    placeholder: \"Password\",\n    className: \"Theme-Input-99\",\n    type: \"password\",\n    onChange: function onChange(e) {\n      return setPassword(e.target.value);\n    },\n    value: password\n  }), _react.default.createElement(\"div\", {\n    className: \"Flex-Class-Row-End\",\n    style: {\n      width: '100%'\n    }\n  }, _react.default.createElement(\"p\", {\n    className: \"Flex-Class-Row-Start\",\n    style: {\n      width: '100%',\n      margin: '0px',\n      padding: '0px'\n    }\n  }, _react.default.createElement(\"input\", {\n    type: \"checkbox\",\n    style: {\n      margin: '0px 5px -1px 0px',\n      width: '20px'\n    }\n  }), '', \"Remember\\xA0account\"), _react.default.createElement(\"button\", {\n    // style={{ margin: '5px 0px', width: '100%' }}\n    type: \"submit\",\n    style: {\n      margin: '5px 0px'\n    },\n    className: \"Theme-Btn-First-99\"\n  }, pathName === 'signup' ? _react.default.createElement(\"span\", null, \"Sign\\xA0In\") : _react.default.createElement(\"span\", null, \"Log\\xA0In \"))), pathName === 'signup' ? _react.default.createElement(\"p\", {\n    style: {\n      margin: '10px'\n    }\n  }, \"Already have an account - \", _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/login\"\n  }, \"Lust Login\")) : _react.default.createElement(\"p\", {\n    style: {\n      margin: '10px'\n    }\n  }, \"or maybe - \", _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/signup\"\n  }, \"Create a new Account?\")), _react.default.createElement(\"a\", {\n    href: \"/auth/google\",\n    style: {\n      width: '100%'\n    }\n  }, _react.default.createElement(\"button\", {\n    type: \"button\",\n    style: {\n      background: '#dd4b39',\n      width: '100%',\n      margin: '5px 0px'\n    },\n    className: \"Theme-Btn-First-99\"\n  }, _react.default.createElement(_fa.FaGoogle, {\n    style: {\n      fontSize: '16px',\n      margin: 'auto 10px -3px auto'\n    }\n  }), \"Signin with Google\")), _react.default.createElement(\"a\", {\n    href: \"/auth/google\",\n    style: {\n      width: '100%'\n    }\n  }, _react.default.createElement(\"button\", {\n    type: \"button\",\n    style: {\n      background: '#3b5998',\n      width: '100%',\n      margin: '5px 0px'\n    },\n    className: \"Theme-Btn-First-99\"\n  }, _react.default.createElement(_fa.FaFacebookF, {\n    style: {\n      fontSize: '16px',\n      margin: 'auto 10px -3px auto'\n    }\n  }), \"Signin with Facebook\"))), _react.default.createElement(\"p\", null, _react.default.createElement(\"strong\", null, \"Privacy Policy\"), \" - \", ' ', _react.default.createElement(\"a\", {\n    href: \"/privacy-policy\",\n    target: \"_black\"\n  }, \"Here\")));\n};\n\nvar _default = CreadentialsForm;\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/components/CreadentialsForm.js?");

/***/ }),

/***/ "./src/apps/extra/components/Header1.js":
/*!**********************************************!*\
  !*** ./src/apps/extra/components/Header1.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactSvg = _interopRequireDefault(__webpack_require__(/*! react-svg */ \"react-svg\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Header1 = function Header1(_ref) {\n  var pathName = _ref.pathName;\n  return _react.default.createElement(\"div\", {\n    className: \"Header1-c-00\"\n  }, _react.default.createElement(\"div\", {\n    className: \"Header1-Left-Div-01\"\n  }, _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/\"\n  }, _react.default.createElement(\"h2\", {\n    className: \"Theme-gradient-text\"\n  }, _react.default.createElement(_reactSvg.default, {\n    src: \"/calendar.svg\",\n    svgStyle: {\n      height: '25px',\n      marginTop: '3px',\n      marginRight: '10px',\n      width: 'auto'\n    }\n  }), \"Schedular\"))), _react.default.createElement(\"div\", {\n    className: \"Header1-Links-Container-01\"\n  }, _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/about\"\n  }, _react.default.createElement(\"p\", {\n    className: \"\".concat(pathName === 'about' && 'Header1-Links-Active')\n  }, \"ABOUT\")), _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/login\"\n  }, _react.default.createElement(\"p\", {\n    className: \"\".concat((pathName === 'login' || pathName === 'signup') && 'Header1-Links-Active')\n  }, \"LOGIN\")), _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/contact\"\n  }, _react.default.createElement(\"p\", {\n    className: \"\".concat(pathName === 'contact' && 'Header1-Links-Active')\n  }, \"CONTACT\"))));\n};\n\nvar _default = Header1;\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/components/Header1.js?");

/***/ }),

/***/ "./src/apps/extra/configStore.js":
/*!***************************************!*\
  !*** ./src/apps/extra/configStore.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reduxThunk = _interopRequireDefault(__webpack_require__(/*! redux-thunk */ \"redux-thunk\"));\n\nvar _axios = _interopRequireDefault(__webpack_require__(/*! axios */ \"axios\"));\n\nvar _index = _interopRequireDefault(__webpack_require__(/*! ./reducers/index */ \"./src/apps/extra/reducers/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar _default = function _default(req) {\n  var axiosGraphQL = _axios.default.create({\n    baseURL: \"http://api_server:5000/graphql\",\n    headers: {\n      cookie: req.get('cookie') || ''\n    }\n  });\n\n  return (0, _redux.createStore)(_index.default, {}, (0, _redux.applyMiddleware)(_reduxThunk.default.withExtraArgument(axiosGraphQL)));\n};\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/configStore.js?");

/***/ }),

/***/ "./src/apps/extra/pages/About.js":
/*!***************************************!*\
  !*** ./src/apps/extra/pages/About.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _go = __webpack_require__(/*! react-icons/go */ \"react-icons/go\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar AboutPage = function AboutPage() {\n  return _react.default.createElement(\"div\", {\n    className: \"About-p-00\"\n  }, _react.default.createElement(\"h1\", null, \"Schedule your work in Style\"), _react.default.createElement(\"p\", {\n    className: \"About-Subheading-01\"\n  }, \"Inspired from\", ' ', _react.default.createElement(\"a\", {\n    href: \"https://calendar.google.com\",\n    target: \"_black\"\n  }, \"Google Calendar\"), ' ', \"and\", ' ', _react.default.createElement(\"a\", {\n    href: \"https://to-do.microsoft.com\",\n    target: \"_black\"\n  }, \"Microsoft Todo\")), _react.default.createElement(\"div\", null, _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/login\"\n  }, _react.default.createElement(\"button\", {\n    style: {\n      margin: '10px 5px'\n    },\n    className: \"Theme-Btn-First-99 Theme-Btn-Shadow-99\"\n  }, \"Sign In\")), _react.default.createElement(\"a\", {\n    href: \"https://github.com/ritwik310/my-calendar\",\n    target: \"_black\"\n  }, _react.default.createElement(\"button\", {\n    style: {\n      margin: '10px 5px'\n    },\n    className: \"Theme-Btn-White-99 Theme-Btn-Shadow-99\"\n  }, _react.default.createElement(_go.GoMarkGithub, {\n    style: {\n      color: '#333333',\n      fontSize: '16px',\n      margin: 'auto 10px -3px auto'\n    }\n  }), \"Github\"))), _react.default.createElement(\"p\", null, _react.default.createElement(\"strong\", null, \"Version 2.0\"), \" - Report any bugs \", ' ', _react.default.createElement(\"a\", {\n    href: \"/contact\",\n    target: \"_black\"\n  }, \"here\")), _react.default.createElement(\"div\", {\n    className: \"About-Side-Git-Btns-Container-01\"\n  }, _react.default.createElement(\"a\", {\n    href: \"https://github.com/ritwik310/my-calendar\",\n    target: \"_black\"\n  }, _react.default.createElement(\"button\", {\n    style: {\n      margin: '5px 10px'\n    },\n    className: \"Theme-Btn-White-99 Theme-Btn-Shadow-99\"\n  }, _react.default.createElement(_go.GoRepoForked, {\n    style: {\n      color: '#333333',\n      fontSize: '16px',\n      margin: 'auto 10px -3px auto'\n    }\n  }), \"Fork it on Github\"), _react.default.createElement(\"button\", {\n    style: {\n      margin: '5px 0px',\n      padding: '10px'\n    },\n    className: \"Theme-Btn-Black-99 Theme-Btn-Shadow-99\"\n  }, \"27\")), _react.default.createElement(\"div\", null, _react.default.createElement(\"a\", {\n    href: \"https://github.com/ritwik310/my-calendar\",\n    target: \"_black\"\n  }, _react.default.createElement(\"button\", {\n    style: {\n      margin: '5px 10px'\n    },\n    className: \"Theme-Btn-White-99 Theme-Btn-Shadow-99\"\n  }, _react.default.createElement(_go.GoStar, {\n    style: {\n      color: '#333333',\n      fontSize: '16px',\n      margin: 'auto 10px -3px auto'\n    }\n  }), \"Star it on Github\"), _react.default.createElement(\"button\", {\n    style: {\n      margin: '5px 0px',\n      padding: '10px'\n    },\n    className: \"Theme-Btn-Black-99 Theme-Btn-Shadow-99\"\n  }, \"105\")))));\n};\n\nvar _default = {\n  component: AboutPage\n};\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/pages/About.js?");

/***/ }),

/***/ "./src/apps/extra/pages/Login.js":
/*!***************************************!*\
  !*** ./src/apps/extra/pages/Login.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _CreadentialsForm = _interopRequireDefault(__webpack_require__(/*! ../components/CreadentialsForm */ \"./src/apps/extra/components/CreadentialsForm.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar LoginPage = function LoginPage(_ref) {\n  var history = _ref.history;\n\n  var _useState = (0, _react.useState)(false),\n      _useState2 = _slicedToArray(_useState, 2),\n      errorMsg = _useState2[0],\n      setErrorMag = _useState2[1];\n\n  var handleLogin =\n  /*#__PURE__*/\n  function () {\n    var _ref3 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(_ref2) {\n      var name, email, password;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              name = _ref2.name, email = _ref2.email, password = _ref2.password;\n\n            case 1:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function handleLogin(_x) {\n      return _ref3.apply(this, arguments);\n    };\n  }();\n\n  return _react.default.createElement(\"div\", {\n    className: \"Login-p-00 About-p-00\"\n  }, _react.default.createElement(_CreadentialsForm.default, {\n    errorMsg: errorMsg,\n    pathName: \"login\",\n    onFormSubmit: handleLogin\n  }));\n};\n\nvar _default = {\n  component: LoginPage\n};\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/pages/Login.js?");

/***/ }),

/***/ "./src/apps/extra/pages/Signup.js":
/*!****************************************!*\
  !*** ./src/apps/extra/pages/Signup.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _CreadentialsForm = _interopRequireDefault(__webpack_require__(/*! ../components/CreadentialsForm */ \"./src/apps/extra/components/CreadentialsForm.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar SignupPage = function SignupPage(_ref) {\n  var history = _ref.history;\n\n  var _useState = (0, _react.useState)(false),\n      _useState2 = _slicedToArray(_useState, 2),\n      errorMsg = _useState2[0],\n      setErrorMag = _useState2[1];\n\n  var handleSignup =\n  /*#__PURE__*/\n  function () {\n    var _ref3 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(_ref2) {\n      var name, email, password;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              name = _ref2.name, email = _ref2.email, password = _ref2.password;\n\n            case 1:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function handleSignup(_x) {\n      return _ref3.apply(this, arguments);\n    };\n  }();\n\n  return _react.default.createElement(\"div\", {\n    className: \"Signup-p-00 About-p-00\"\n  }, _react.default.createElement(_CreadentialsForm.default, {\n    errorMsg: errorMsg,\n    pathName: \"signup\",\n    onFormSubmit: handleSignup\n  }));\n};\n\nvar _default = {\n  component: SignupPage\n};\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/pages/Signup.js?");

/***/ }),

/***/ "./src/apps/extra/reducers/index.js":
/*!******************************************!*\
  !*** ./src/apps/extra/reducers/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _progressbar = _interopRequireDefault(__webpack_require__(/*! ./progressbar */ \"./src/apps/extra/reducers/progressbar.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar _default = (0, _redux.combineReducers)({\n  progressbar: _progressbar.default\n});\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/reducers/index.js?");

/***/ }),

/***/ "./src/apps/extra/reducers/progressbar.js":
/*!************************************************!*\
  !*** ./src/apps/extra/reducers/progressbar.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _action_types = __webpack_require__(/*! ../actions/action_types */ \"./src/apps/extra/actions/action_types.js\");\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _action_types.START_PROGRESS_BAR:\n      return true;\n\n    case _action_types.STOP_PROGRESS_BAR:\n      return false;\n\n    default:\n      return state;\n  }\n};\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/extra/reducers/progressbar.js?");

/***/ }),

/***/ "./src/apps/todo/Todo.js":
/*!*******************************!*\
  !*** ./src/apps/todo/Todo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterConfig = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _Header = _interopRequireDefault(__webpack_require__(/*! ./components/Header2 */ \"./src/apps/todo/components/Header2.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar __isNode__ = false;\n\nif ((typeof process === \"undefined\" ? \"undefined\" : _typeof(process)) === 'object') {\n  if (_typeof(process.versions) === 'object') {\n    if (typeof process.versions.node !== 'undefined') {\n      __isNode__ = true;\n    }\n  }\n}\n\nvar Todo = function Todo(props) {\n  var pathName = props.staticContext ? props.staticContext.pathName : !__isNode__ && window.location.pathname.replace(/^\\/([^\\/]*).*$/, '$1');\n  return _react.default.createElement(\"div\", {\n    className: \"Todo-a-00\"\n  }, _react.default.createElement(_Header.default, {\n    pathName: pathName\n  }), _react.default.createElement(\"div\", null, (0, _reactRouterConfig.renderRoutes)(props.route.routes)));\n};\n\nvar _default = {\n  component: Todo\n};\nexports.default = _default;\n\nDate.prototype.getFormattedDate = function () {\n  return \"\".concat(this.getFullYear(), \"-\").concat(this.getMonth() + 1, \"-\").concat(this.getDate());\n};\n\n//# sourceURL=webpack:///./src/apps/todo/Todo.js?");

/***/ }),

/***/ "./src/apps/todo/TodoRouter.js":
/*!*************************************!*\
  !*** ./src/apps/todo/TodoRouter.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _Todo = _interopRequireDefault(__webpack_require__(/*! ./Todo */ \"./src/apps/todo/Todo.js\"));\n\nvar _Todo2 = _interopRequireDefault(__webpack_require__(/*! ./pages/Todo */ \"./src/apps/todo/pages/Todo.js\"));\n\nvar _NotFound = _interopRequireDefault(__webpack_require__(/*! ../_common/pages/NotFound */ \"./src/apps/_common/pages/NotFound.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar TodoRouter = [_objectSpread({}, _Todo.default, {\n  routes: [_objectSpread({}, _NotFound.default, {\n    path: '/',\n    exact: true\n  }), _objectSpread({}, _Todo2.default, {\n    path: '/todo',\n    exact: true\n  }), _objectSpread({}, _NotFound.default)]\n})];\nvar _default = TodoRouter;\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/todo/TodoRouter.js?");

/***/ }),

/***/ "./src/apps/todo/components/Header2.js":
/*!*********************************************!*\
  !*** ./src/apps/todo/components/Header2.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactSvg = _interopRequireDefault(__webpack_require__(/*! react-svg */ \"react-svg\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Header2 = function Header2(_ref) {\n  var pathName = _ref.pathName;\n  return _react.default.createElement(\"div\", {\n    className: \"Header2-c-00\"\n  }, _react.default.createElement(\"div\", {\n    className: \"Header2-Left-Div-01\"\n  }, _react.default.createElement(\"div\", {\n    className: \"Header2-Hamburger-Div-02\",\n    onClick: function onClick() {}\n  }, _react.default.createElement(\"div\", null), _react.default.createElement(\"div\", null), _react.default.createElement(\"div\", null)), _react.default.createElement(_reactRouterDom.Link, {\n    to: \"/\"\n  }, _react.default.createElement(\"h2\", {\n    className: \"Theme-gradient-text\"\n  }, _react.default.createElement(_reactSvg.default, {\n    src: \"/calendar.svg\",\n    svgStyle: {\n      height: '25px',\n      marginTop: '3px',\n      marginRight: '10px',\n      width: 'auto'\n    }\n  }), \"Schedular\"))), _react.default.createElement(\"div\", {\n    className: \"Header2-Links-Container-01\"\n  }));\n};\n\nvar _default = Header2;\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/todo/components/Header2.js?");

/***/ }),

/***/ "./src/apps/todo/configStore.js":
/*!**************************************!*\
  !*** ./src/apps/todo/configStore.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reduxThunk = _interopRequireDefault(__webpack_require__(/*! redux-thunk */ \"redux-thunk\"));\n\nvar _axios = _interopRequireDefault(__webpack_require__(/*! axios */ \"axios\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import reducers from './reducers/index';\nvar _default = function _default(req) {\n  var axiosGraphQL = _axios.default.create({\n    baseURL: \"http://api_server:5000/graphql\",\n    headers: {\n      cookie: req.get('cookie') || ''\n    }\n  });\n\n  return (0, _redux.createStore)((0, _redux.combineReducers)({}), {}, (0, _redux.applyMiddleware)(_reduxThunk.default.withExtraArgument(axiosGraphQL)));\n};\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/todo/configStore.js?");

/***/ }),

/***/ "./src/apps/todo/pages/Todo.js":
/*!*************************************!*\
  !*** ./src/apps/todo/pages/Todo.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _history = __webpack_require__(/*! history */ \"history\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n// import { handleAppMode } from '../../actions/app_mode_actions';\n// import TodoSidebarComp from '../partials/todo/todo_sidebar';\n// import TodoListComp from '../partials/todo/todo_list';\n// import EventDetailsComp from '../reusables/event_details/event_details';\n// Checking if Environment is Node.js or Browser\nvar __isNode__ = false;\n\nif ((typeof process === \"undefined\" ? \"undefined\" : _typeof(process)) === 'object') {\n  if (_typeof(process.versions) === 'object') {\n    if (typeof process.versions.node !== 'undefined') {\n      __isNode__ = true;\n    }\n  }\n}\n\nvar TodoPage = function TodoPage(props) {\n  // Getting 'req' from staticContext\n  var staticRouter = props.staticRouter,\n      groups = props.groups,\n      events = props.events;\n  var req = staticContext ? staticContext.req : undefined; // To Find Query Str in the client\n\n  var urlParams = new URLSearchParams(window.location.search); // Returns Page Initial Group-Id\n\n  var initGroupId = function initGroupId(req, groups) {\n    var hasGroups = groups && groups.length > 0;\n\n    if (__isNode__ && req) {\n      return req.query.group || hasGroups ? groups[0]._id.toString() : '';\n    } else {\n      return urlParams.get('group') || hasGroups ? groups[0]._id.toString() : '';\n    }\n  }; // Returns Page Initial Event-Id\n\n\n  var initEventId = function initEventId(req) {\n    if (__isNode__ && req) {\n      return req.query.event || '';\n    } else {\n      return urlParams.get('event') || '';\n    }\n  }; // Component States\n\n\n  var _useState = (0, _react.useState)(initGroupId(req, groups)),\n      _useState2 = _slicedToArray(_useState, 2),\n      groupId = _useState2[0],\n      setGroupId = _useState2[1];\n\n  var _useState3 = (0, _react.useState)(initEventId(req)),\n      _useState4 = _slicedToArray(_useState3, 2),\n      eventId = _useState4[0],\n      setEventId = _useState4[1]; // Lifecycle\n\n\n  (0, _react.useEffect)(function () {\n    if (!__isNode__) {\n      setGroupId(urlParams.get('group') || '');\n      setEventId(urlParams.get('event') || '');\n\n      if (!urlParams.get('group') && props.groups[0]) {\n        setGroupId(props.groups[0]._id);\n      }\n    }\n\n    return function () {};\n  }, []);\n\n  var changeGroupId = function changeGroupId(id) {\n    setGroupId(id);\n    setEventId('');\n    var history = (0, _history.createBrowserHistory)();\n    history.push(\"/todo?group=\".concat(id));\n  };\n\n  var changeEventId = function changeEventId(id) {\n    // setGroupId('');\n    setEventId(id);\n    var history = (0, _history.createBrowserHistory)();\n    history.push(\"/todo?group=\".concat(groupId, \"&event=\").concat(id));\n  };\n\n  var activeGroup = props.groups.find(function (_ref) {\n    var _id = _ref._id;\n    return _id === groupId;\n  });\n  var activeEvent = props.events.find(function (_ref2) {\n    var _id = _ref2._id;\n    return _id === eventId;\n  });\n  return _react.default.createElement(\"div\", {\n    className: \"todo-page-000\"\n  }, props.auth ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(TodoSidebarComp, {\n    changeGroupId: changeGroupId,\n    active_groupId: groupId,\n    visible: props.sideBar\n  }), _react.default.createElement(\"div\", {\n    className: \"todo-page-001-content\"\n  }, !groupId ? // <h2><ReactSVG src='/logo.svg'/>Loading...</h2>\n  _react.default.createElement(\"h2\", null, \"Loading...\") : _react.default.createElement(TodoListComp, {\n    active_groupId: groupId,\n    activeGroup: activeGroup,\n    changeEventId: changeEventId\n  })), activeEvent && _react.default.createElement(EventDetailsComp, {\n    event: activeEvent,\n    hex_color: activeGroup.hex_color,\n    closeEventDetails: function closeEventDetails() {\n      setEventId('');\n      var history = (0, _history.createBrowserHistory)();\n      history.push(\"/todo?group=\".concat(groupId));\n    }\n  })) : _react.default.createElement(_reactRouterDom.Redirect, {\n    to: \"/login\"\n  }));\n}; // const loadData = () => {\n// }\n\n\nvar mapStateToProps = function mapStateToProps(_ref3) {\n  var auth = _ref3.auth,\n      groups = _ref3.groups,\n      events = _ref3.events,\n      sideBar = _ref3.sideBar;\n  return {\n    auth: auth,\n    groups: groups,\n    events: events,\n    sideBar: sideBar\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    handleAppMode: function (_handleAppMode) {\n      function handleAppMode(_x) {\n        return _handleAppMode.apply(this, arguments);\n      }\n\n      handleAppMode.toString = function () {\n        return _handleAppMode.toString();\n      };\n\n      return handleAppMode;\n    }(function (x) {\n      return dispatch(handleAppMode(x));\n    })\n  };\n};\n\nvar _default = {\n  component: (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TodoPage),\n  loadData: function loadData(store) {// return store.dispatch(handleAppMode(1));\n  }\n};\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/apps/todo/pages/Todo.js?");

/***/ }),

/***/ "./src/render_handler.js":
/*!*******************************!*\
  !*** ./src/render_handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getTodoContent = exports.getExtraContent = void 0;\n\nvar _renderer = _interopRequireDefault(__webpack_require__(/*! ./renderer */ \"./src/renderer.js\"));\n\nvar _ExtraRouter = _interopRequireDefault(__webpack_require__(/*! ./apps/extra/ExtraRouter */ \"./src/apps/extra/ExtraRouter.js\"));\n\nvar _configStore = _interopRequireDefault(__webpack_require__(/*! ./apps/extra/configStore */ \"./src/apps/extra/configStore.js\"));\n\nvar _TodoRouter = _interopRequireDefault(__webpack_require__(/*! ./apps/todo/TodoRouter */ \"./src/apps/todo/TodoRouter.js\"));\n\nvar _configStore2 = _interopRequireDefault(__webpack_require__(/*! ./apps/todo/configStore */ \"./src/apps/todo/configStore.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar getExtraContent = function getExtraContent(req) {\n  var store = (0, _configStore.default)(req);\n  var context = {\n    req: req\n  };\n  var jsfile = 'extra.js';\n  return (0, _renderer.default)(req, _ExtraRouter.default, store, context, jsfile);\n};\n\nexports.getExtraContent = getExtraContent;\n\nvar getTodoContent = function getTodoContent(req) {\n  var store = (0, _configStore2.default)(req);\n  var context = {\n    req: req\n  };\n  var jsfile = 'todo.js';\n  return (0, _renderer.default)(req, _TodoRouter.default, store, context, jsfile);\n}; // export const getExtraContent = (req) => {\n// \tconst store = configExtraStore(req);\n// \tconst context = { pathName: req.path.replace(/^\\/([^\\/]*).*$/, '$1') };\n// \tconst jsfile = 'extra.js';\n// \treturn renderer(req, ExtraRouter, store, context, jsfile);\n// };\n\n\nexports.getTodoContent = getTodoContent;\n\n//# sourceURL=webpack:///./src/render_handler.js?");

/***/ }),

/***/ "./src/renderer.js":
/*!*************************!*\
  !*** ./src/renderer.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _server = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterConfig = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n\nvar _serializeJavascript = _interopRequireDefault(__webpack_require__(/*! serialize-javascript */ \"serialize-javascript\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar _default = function _default(req, router, store, context, jsfile) {\n  var content = (0, _server.renderToString)(_react.default.createElement(_reactRedux.Provider, {\n    store: store\n  }, _react.default.createElement(_reactRouterDom.StaticRouter, {\n    location: req.path,\n    context: context\n  }, _react.default.createElement(\"div\", null, (0, _reactRouterConfig.renderRoutes)(router)))));\n  return \"\\n    <!DOCTYPE html>\\n      <html lang=\\\"en\\\">\\n      <head>\\n        <meta charset=\\\"UTF-8\\\">\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n        <meta http-equiv=\\\"X-UA-Compatible\\\" content=\\\"ie=edge\\\">\\n        <link rel=\\\"icon\\\" href=\\\"favicon.ico\\\">\\n        <link rel=\\\"stylesheet\\\" href=\\\"3ed_party/normalize.min.css\\\">\\n        <link href=\\\"3ed_party/Lato.css\\\" rel=\\\"stylesheet\\\">\\n        <link href=\\\"3ed_party/Montserrat.css\\\" rel=\\\"stylesheet\\\">\\n        <link rel=\\\"stylesheet\\\" href=\\\"styles.css\\\">\\n        <title>My Calendar</title>\\n      </head>\\n      <body>\\n        <div id=\\\"root\\\">\".concat(content, \"<div>\\n      </body>\\n      <script>window.INITIAL_STATE = \").concat((0, _serializeJavascript.default)(store.getState()), \"</script>\\n      <script src=\\\"\").concat(jsfile, \"\\\"></script>\\n    </html>\\n  \");\n};\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/renderer.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! @babel/polyfill */ \"@babel/polyfill\");\n\nvar _express = _interopRequireDefault(__webpack_require__(/*! express */ \"express\"));\n\nvar _axios = _interopRequireDefault(__webpack_require__(/*! axios */ \"axios\"));\n\nvar _render_handler = __webpack_require__(/*! ./render_handler */ \"./src/render_handler.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// import helmet from 'helmet';\nvar app = (0, _express.default)(); // app.use(helmet());\n\napp.use(_express.default.static('public'));\n\nvar checkAuth =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res, next) {\n    var response;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return _axios.default.get('http://api_server:5000/api/current_user', _objectSpread({}, req.body, {\n              headers: {\n                cookie: req.get('cookie') || ''\n              }\n            }));\n\n          case 3:\n            response = _context.sent;\n\n            if (!response.data) {\n              _context.next = 9;\n              break;\n            }\n\n            req._isAuth = true;\n            next();\n            _context.next = 10;\n            break;\n\n          case 9:\n            throw new Error('Not Authenticated');\n\n          case 10:\n            _context.next = 16;\n            break;\n\n          case 12:\n            _context.prev = 12;\n            _context.t0 = _context[\"catch\"](0);\n            req._isAuth = false;\n            next();\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 12]]);\n  }));\n\n  return function checkAuth(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\napp.get(['/about', '/login', '/signup', '/forget-password', '/reset-password'], function (req, res) {\n  var html = (0, _render_handler.getExtraContent)(req);\n  res.send(html);\n});\napp.get('/todo', checkAuth, function (req, res) {\n  console.log('req._isAuth', req._isAuth);\n\n  if (req._isAuth) {\n    var html = (0, _render_handler.getTodoContent)(req);\n    res.status(404).send(html);\n  } else {\n    res.redirect('/about');\n  }\n});\napp.get('*', checkAuth, function (req, res) {\n  if (req._isAuth && false) {\n    // Render Calendar\n    res.status(404).send({\n      message: '404, Page Not Found'\n    });\n  } else {\n    var html = (0, _render_handler.getExtraContent)(req);\n    res.status(404).send(html);\n  }\n});\nvar PORT = process.env.PORT || 3000;\napp.listen(PORT, function () {\n  return console.log(\"App-Renderer is up, PORT=\".concat(PORT, \" NODE_ENV=\").concat(\"development\", \"..\"));\n});\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "history":
/*!**************************!*\
  !*** external "history" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"history\");\n\n//# sourceURL=webpack:///external_%22history%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-icons/fa":
/*!*********************************!*\
  !*** external "react-icons/fa" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-icons/fa\");\n\n//# sourceURL=webpack:///external_%22react-icons/fa%22?");

/***/ }),

/***/ "react-icons/go":
/*!*********************************!*\
  !*** external "react-icons/go" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-icons/go\");\n\n//# sourceURL=webpack:///external_%22react-icons/go%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-config\");\n\n//# sourceURL=webpack:///external_%22react-router-config%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "react-svg":
/*!****************************!*\
  !*** external "react-svg" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-svg\");\n\n//# sourceURL=webpack:///external_%22react-svg%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ })

/******/ });