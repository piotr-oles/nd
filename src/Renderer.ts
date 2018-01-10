import { WebGL } from './WebGL';
import { Canvas } from './Canvas';
import { Camera } from './primitive/Camera';
import { Scene } from './primitive/Scene';

export namespace Renderer {
  export type Options = {
    mode: number;
  }
}

export class Renderer {
  private mode: number = WebGL.TRIANGLES;

  constructor(options: Renderer.Options = {mode: WebGL.TRIANGLES}) {
    this.mode = options.mode;
  };

  render(scene: Scene, camera: Camera, canvas: Canvas, persists: boolean = false): void {
    const gl = canvas.getContext();

    if (!persists) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    scene.eachItem((item) => {
      let hyperGeometry = item.getTransformedGeometry();
      let flatGeometry = camera.projectGeometry(hyperGeometry);
      let material = item.getMaterial();

      material.configure(gl);

      material.setUniforms(gl, flatGeometry, hyperGeometry, item, camera, canvas);
      material.setAttributes(gl, flatGeometry, hyperGeometry, item, camera, canvas);

      // store item vertex indices
      if (!item.hasBuffer('indices')) {
        item.setBuffer('indices', gl.createBuffer());
        item.getBuffer('indices').itemsLength = flatGeometry.getTriangles().length;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.getBuffer('indices'));
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatGeometry.getTriangles()), gl.STATIC_DRAW);
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.getBuffer('indices'));
      gl.drawElements(this.mode, item.getBuffer('indices').itemsLength, gl.UNSIGNED_SHORT, 0);

      material.rollback(gl);
    });
  }
}
