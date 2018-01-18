"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var Canvas_1 = require("../../src/Canvas");
var HyperCanvas = (function (_super) {
    __extends(HyperCanvas, _super);
    function HyperCanvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HyperCanvas.prototype.getCanvas = function () {
        return this.canvas;
    };
    HyperCanvas.prototype.componentDidMount = function () {
        this.setupCanvas();
    };
    HyperCanvas.prototype.componentDidUpdate = function () {
        this.setupCanvas();
    };
    HyperCanvas.prototype.render = function () {
        var _this = this;
        return (React.createElement("canvas", __assign({ ref: function (el) { return _this.element = el; } }, this.props)));
    };
    HyperCanvas.prototype.setupCanvas = function () {
        this.canvas = new Canvas_1.Canvas(this.element, this.props.width, this.props.height);
    };
    return HyperCanvas;
}(react_1.Component));
exports.HyperCanvas = HyperCanvas;
