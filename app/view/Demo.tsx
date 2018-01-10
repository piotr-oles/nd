import * as React from 'react';
import { Component } from 'react';
import { Tick, Animator } from '../../src/Animator';
import { BoundedRenderer } from '../../src/BoundedRenderer';
import { HybridCamera } from '../../src/camera/HybridCamera';
import { PerspectiveCamera } from '../../src/camera/PerspectiveCamera';
import { Canvas } from '../../src/Canvas';
import { HyperCubeGeometry } from '../../src/geometry/HyperCubeGeometry';
import { HyperDepthMaterial } from '../../src/material/HyperDepthMaterial';
import { Set } from '../../src/math/Set';
import { Camera } from '../../src/primitive/Camera';
import { Item } from '../../src/primitive/Item';
import { Scene } from '../../src/primitive/Scene';
import { Renderer } from '../../src/Renderer';
import { WebGL } from '../../src/WebGL';
import { HyperCanvas } from '../component/HyperCanvas';

export class Demo extends Component {

  private renderer: BoundedRenderer;
  private scene: Scene;
  private camera: Camera;
  private animator: Animator;
  private canvas: Canvas;

  constructor(props, context) {
    super(props, context);
    this.scene = new Scene();
    this.scene.addItem(
      'cube',
      new Item(
        new HyperCubeGeometry(6, 80),
        new HyperDepthMaterial({
          hyperR: 4,
          hyperG: 5,
          hyperB: 6,
          hyperDepth: 1
        })
      )
    );
    this.camera = new PerspectiveCamera(600);
    this.renderer = new BoundedRenderer(
      this.scene,
      this.camera,
      { mode: WebGL.TRIANGLES }
    );
    this.animator = new Animator(() => {
      const cube = this.scene.getItem('cube');
      const rotation = cube.get('rotation', 0) + .5;

      for (let [axisA, axisB] of Set.combination([...Array(cube.getGeometry().getDimension()).keys()], 2)) {
        cube.rotateAxis(
          axisA,
          axisB,
          rotation
        );
      }

      cube.set('rotation', rotation);
      cube.update();
      this.renderer.render();
    });
  }

  componentDidMount() {
    this.renderer.bindCanvas(this.canvas);
    this.animator.start();
  }

  render() {
    return (
      <HyperCanvas
        ref={el => this.canvas = el ? el.getCanvas() : null}
        width={800}
        height={600}
      />
    )
  }
}
