/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by eriksen on 17-3-29.
 */

const enumShaderType = {
    VertexShader:0,
    FragmentShader:1
};

class GLShader {
    constructor() {
        this.shaderSource = '';
        this.shaderType = enumShaderType.VertexShader;
    }
    
    setShaderSource(source){
        this.shaderSource = source;
    }
    
    setShaderType(type){
        this.shaderType = enumShaderType[type];
    }
}

module.exports = GLShader;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by eriksen on 17-3-29.
 */

const GLShader = __webpack_require__(0);

class GLProgram {
    constructor() {
        this.shaderList = [];
    }
    
    addShader(shader) {
        this.shaderList.push(shader);
    }
    
    addShaderIndex(index, shader) {
        this.shaderList.splice(index, 0, shader);
    }
    
    linkProgram(){
        //maybe you will use this.shaderList
    }
}

module.exports = GLProgram;

let shader = new GLShader();
shader.setShaderSource('aaa');
shader.setShaderType('FragmentShader');

let glProgram = new GLProgram();
glProgram.addShader(shader);

let shader2 = new GLShader();
shader2.setShaderSource('bbb');

glProgram.addShaderIndex(0,shader2);

let shader3 = new GLShader();
shader3.setShaderSource('ccc');
shader3.setShaderType('FragmentShader');

glProgram.addShaderIndex(1,shader3);

console.log(glProgram);

/***/ })
/******/ ]);