import * as React from 'react';
import { CanvasHTMLAttributes, Component } from 'react';
import { Canvas } from '../../src/Canvas';

export namespace HyperCanvas {
  export type Props = CanvasHTMLAttributes<HTMLCanvasElement> & {
    width: number;
    height: number;
  }
  export type State = {
    canvas: Canvas;
  }
}

export class HyperCanvas extends Component<HyperCanvas.Props, HyperCanvas.State> {
  private element: HTMLCanvasElement;
  private canvas: Canvas;

  getCanvas(): Canvas {
    return this.canvas;
  }

  componentDidMount() {
    this.setupCanvas();
  }

  componentDidUpdate() {
    this.setupCanvas();
  }

  render() {
    return (
      <canvas
        ref={el => this.element = el}
        {...this.props}
      />
    );
  }

  private setupCanvas() {
    this.canvas = new Canvas(this.element, this.props.width, this.props.height);
  }
}
