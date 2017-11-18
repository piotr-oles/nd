import { WebGL } from './WebGL';
import { Canvas } from './Canvas';

export class Renderer {
  private mode: number = WebGL.TRIANGLES;

  constructor(options = {mode: WebGL.TRIANGLES}) {
    this.mode = options.mode;
  };

  render(scene, camera, canvas: Canvas, persists) {
    const gl = canvas.getContext();

    if (!persists) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    for (let name in scene.items) {
      let item = scene.items[name];
      let geometryND = item.matrix ? item.geometry.transform(item.matrix) : item.geometry;
      let geometry2D = camera.projectGeometry(geometryND);
      let material = item.material;

      material.configure(gl);

      material.setUniforms(gl, geometry2D, geometryND, item, camera, canvas);
      material.setAttributes(gl, geometry2D, geometryND, item, camera, canvas);

      // store item vertex indices
      if (!item.buffers.indices) {
        item.buffers['indices'] = gl.createBuffer();
        item.buffers['indices'].itemsLength = geometry2D.triangles.length;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.buffers['indices']);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry2D.triangles), gl.STATIC_DRAW);
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.buffers['indices']);
      gl.drawElements(this.mode, item.buffers['indices'].itemsLength, gl.UNSIGNED_SHORT, 0);

      material.unconfigure(gl);
    }
  }
}
