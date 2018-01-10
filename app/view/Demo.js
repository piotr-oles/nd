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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var Animator_1 = require("../../src/Animator");
var BoundedRenderer_1 = require("../../src/BoundedRenderer");
var HybridCamera_1 = require("../../src/camera/HybridCamera");
var HyperCubeGeometry_1 = require("../../src/geometry/HyperCubeGeometry");
var HyperDepthMaterial_1 = require("../../src/material/HyperDepthMaterial");
var Item_1 = require("../../src/primitive/Item");
var Scene_1 = require("../../src/primitive/Scene");
var WebGL_1 = require("../../src/WebGL");
var HyperCanvas_1 = require("../component/HyperCanvas");
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.scene = new Scene_1.Scene();
        _this.scene.addItem('cube', new Item_1.Item(new HyperCubeGeometry_1.HyperCubeGeometry(4, 100), new HyperDepthMaterial_1.HyperDepthMaterial()));
        console.log(new HyperCubeGeometry_1.HyperCubeGeometry(4, 100));
        _this.camera = new HybridCamera_1.HybridCamera(1000);
        _this.renderer = new BoundedRenderer_1.BoundedRenderer(_this.scene, _this.camera, { mode: WebGL_1.WebGL.TRIANGLES });
        _this.animator = new Animator_1.Animator(function () {
            _this.renderer.render();
        });
        return _this;
    }
    Demo.prototype.componentDidMount = function () {
        this.renderer.bindCanvas(this.canvas);
        this.renderer.render();
        //this.animator.start();
    };
    Demo.prototype.render = function () {
        var _this = this;
        return (React.createElement(HyperCanvas_1.HyperCanvas, { ref: function (el) { return _this.canvas = el ? el.getCanvas() : null; }, width: 800, height: 600 }));
    };
    return Demo;
}(react_1.Component));
exports.Demo = Demo;
