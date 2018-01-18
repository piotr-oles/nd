import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import * as React from 'react';
import { Component } from 'react';
import { BoundedRenderer } from '../../src/BoundedRenderer';
import { PerspectiveCamera } from '../../src/camera/PerspectiveCamera';
import { Canvas } from '../../src/Canvas';
import { HyperCubeGeometry } from '../../src/geometry/HyperCubeGeometry';
import { HyperDepthMaterial } from '../../src/material/HyperDepthMaterial';
import { Angle } from '../../src/math/Angle';
import { Set } from '../../src/math/Set';
import { Camera } from '../../src/primitive/Camera';
import { Item } from '../../src/primitive/Item';
import { Scene } from '../../src/primitive/Scene';
import { WebGL } from '../../src/WebGL';
import { HyperCanvas } from '../component/HyperCanvas';
import { RotationControls } from '../component/RotationControls';
import { CanvasWrapper, ControlsWrapper, DemoWrapper } from './Demo.s';
import degrees = Angle.degrees;

export namespace Demo {
  export type State = {
    rotations: RotationControls.Rotation[]
  }
}

export class Demo extends Component<{}, Demo.State> {

  private dimension: number;
  private renderer: BoundedRenderer;
  private scene: Scene;
  private camera: Camera;
  private canvas: Canvas;

  constructor(props, context) {
    super(props, context);

    this.dimension = 6;
    this.scene = new Scene();
    this.scene.addItem(
      'cube',
      new Item(
        new HyperCubeGeometry(this.dimension, 80),
        new HyperDepthMaterial({
          hyperR: 4,
          hyperG: 5,
          hyperB: 6,
          hyperDepth: 5
        })
      )
    );
    this.scene.getItem('cube').update();
    this.camera = new PerspectiveCamera(600);
    this.renderer = new BoundedRenderer(
      this.scene,
      this.camera,
      { mode: WebGL.TRIANGLES }
    );
    this.state = {
      rotations: Array.from<[number, number], RotationControls.Rotation>(
        Set.combination([...Array(this.dimension).keys()], 2),
        ([axisA, axisB]) => [axisA, axisB, 0.0]
      )
    }
  }

  componentDidMount() {
    this.renderer.bindCanvas(this.canvas);
    this.renderer.render();
  }

  componentDidUpdate() {
    const cube = this.scene.getItem('cube');

    this.state.rotations.forEach(([axisA, axisB, theta]) => {
      cube.rotateAxis(axisA, axisB, degrees(theta));
    });
    cube.update();
    this.renderer.render();
  }

  render() {
    return (
      <DemoWrapper>
        <CanvasWrapper>
          <HyperCanvas
            ref={el => this.canvas = el ? el.getCanvas() : null}
            width={600}
            height={400}
          />
        </CanvasWrapper>
        <ControlsWrapper>
          <RaisedButton
            primary
            label='Randomize'
            onClick={() => this.handleRotationsRadomize()}
          />
          <RotationControls
            rotations={this.state.rotations}
            onRotationChange={(rotation) => this.handleRotationChange(rotation)}
          />
        </ControlsWrapper>
      </DemoWrapper>
    )
  }

  handleRotationChange([axisA, axisB, theta]: RotationControls.Rotation) {
    this.setState({
      rotations: this.state.rotations.map(([anAxisA, anAxisB, aTheta]) =>
        [anAxisA, anAxisB, (axisA === anAxisA && axisB === anAxisB) ? theta : aTheta] as RotationControls.Rotation
      )
    })
  }

  handleRotationsRadomize() {
    this.setState({
      rotations: this.state.rotations.map(([axisA, axisB]) =>
        [axisA, axisB, (Math.random() - 0.5) * 2 * Math.PI] as RotationControls.Rotation
      )
    });
  }
}
