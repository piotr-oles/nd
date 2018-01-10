"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var React = require("react");
var Demo_1 = require("./view/Demo");
console.log('Hello!');
console.log(document.getElementById('root'));
document.onreadystatechange = function () {
    ReactDOM.render(React.createElement(Demo_1.Demo, null), document.getElementById('root'));
};
