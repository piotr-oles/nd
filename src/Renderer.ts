import { WebGL } from './WebGL';
import { Canvas } from './Canvas';
import { Camera } from './Primitive/Camera';
import { Scene } from './Primitive/Scene';

export class Renderer {
  private mode: number = WebGL.TRIANGLES;

  constructor(options = {mode: WebGL.TRIANGLES}) {
    this.mode = options.mode;
  };

  render(scene: Scene, camera: Camera, canvas: Canvas, persists) {
    const gl = canvas.getContext();

    if (!persists) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    scene.forEachItem((item) => {
      let hyperGeometry = item.matrix ? item.geometry.transform(item.matrix) : item.geometry;
      let geometry = camera.projectGeometry(hyperGeometry);
      let material = item.material;

      material.configure(gl);

      material.setUniforms(gl, geometry, hyperGeometry, item, camera, canvas);
      material.setAttributes(gl, geometry, hyperGeometry, item, camera, canvas);

      // store item vertex indices
      if (!item.buffers.indices) {
        item.buffers['indices'] = gl.createBuffer();
        item.buffers['indices'].itemsLength = geometry.triangles.length;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.buffers['indices']);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.triangles), gl.STATIC_DRAW);
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.buffers['indices']);
      gl.drawElements(this.mode, item.buffers['indices'].itemsLength, gl.UNSIGNED_SHORT, 0);

      material.unconfigure(gl);
    });
  }
}
