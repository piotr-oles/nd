import { Canvas } from '../Canvas';
import { Geometry } from '../Math/Geometry';
import { Vector } from '../Math/Vector';
import { Camera } from '../Primitive/Camera';
import { Material } from '../Primitive/Material';

const vertexSource = `
  precision highp float;

  attribute vec3 aVertexPosition;
  attribute vec3 aVertexHyper;

  varying vec3 vertexHyper;

  void main(void) {
    gl_PointSize = 3.0;
    gl_Position = vec4(aVertexPosition, 1.0);

    vertexHyper = aVertexHyper;
  }
`;

const fragmentSource = `
  precision highp float;

  uniform float uObjectHyperRatio;
  uniform float uObjectDepthRatio;

  varying vec3 vertexHyper;

  float normalizeColor(float position) {
    float positive = ((position + 1.0) * uObjectDepthRatio / 2.0);
  
    return clamp(positive, 0.0, 1.0);
  },

  void main(void) {
    gl_FragColor = vec4('
      normalizeColor(vertexHyper.r) * pow(uObjectHyperRatio, 1.44),
      normalizeColor(vertexHyper.g) * pow(uObjectHyperRatio, 1.44),
      normalizeColor(vertexHyper.b) * pow(uObjectHyperRatio, 1.44),
      pow(uObjectHyperRatio, 1.1)
    );
  }
`;

type HyperDepthMaterialParameters = {
  hyperDepth?: number;
}

export class HyperDepthMaterial extends Material {
  constructor(parameters: HyperDepthMaterialParameters = {}) {
    if (!('hyperDepth' in parameters)) {
      parameters['hyperDepth'] = 100;
    }

    super(
      parameters,
      vertexSource,
      fragmentSource,
      ['aVertexPosition', 'aVertexHyper'],
      ['uObjectHyperRatio', 'uObjectDepthRatio']
    );
  }

  configure(gl: WebGLRenderingContext) {
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.cullFace(gl.FRONT_AND_BACK);
  }

  rollback(gl: WebGLRenderingContext) {
    gl.disable(gl.BLEND);
  }

  setUniforms(
    gl: WebGLRenderingContext,
    flatGeometry: Geometry,
    hyperGeometry: Geometry,
    item: Item,
    camera: Camera,
    canvas: Canvas
  ): void {
    if (this.pointers['uObjectHyperRatio']) {
      gl.uniform1f(this.pointers['uObjectHyperRatio'], 1.0 / Math.max(2, (hyperGeometry.getDimension() - 2)));
    }

    if (this.pointers['uObjectDepthRatio']) {
      let scaleRatio = Vector.arithmeticAverage(item.scales);

      if (isNaN(scaleRatio)) {
        scaleRatio = 1.0;
      }

      gl.uniform1f(
        this.pointers['uObjectDepthRatio'],
        1.0 / (this.parameters['hyperDepth'] * scaleRatio)
      );
    }
  }

  setAttributes(
    gl: WebGLRenderingContext,
    flatGeometry: Geometry,
    hyperGeometry: Geometry,
    item: Item,
    camera: Camera,
    canvas: Canvas
  ): void {
    const ratioX = 2 / canvas.getWidth();
    const ratioY = 2 / canvas.getHeight();
    const ratioZ = 2 / ((camera as any).getDistance ? (camera as any).getDistance() : 2);

    // position attribute
    if (!('vectors' in item.buffers)) {
      item.buffers['vectors'] = gl.createBuffer();
    }

    const vectorsBuffer = item.buffers['vectors'];
    const vectorsFlat = [];

    flatGeometry.eachVertex((vertexId) => {
      const vector = flatGeometry.getVector(vertexId);

      vectorsFlat.push(
        vector[0] * ratioX,
        vector[1] * ratioY,
        vector[2] * ratioZ
      );
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, vectorsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vectorsFlat), gl.DYNAMIC_DRAW);

    gl.vertexAttribPointer(this.pointers['aVertexPosition'], 3, gl.FLOAT, false, 0, 0);

    // hyper attribute
    if (!('hyper' in item.buffers)) {
      item.buffers['hyper'] = gl.createBuffer();
    }

    const hypersBuffer = item.buffers['hyper'];
    const hypersFlat = [];
    const hypersDimension = [
      this.parameters['hyperR'],
      this.parameters['hyperG'],
      this.parameters['hyperB']
    ];

    hyperGeometry.eachVertex((vertexId) => {
      const vector = hyperGeometry.getVector(vertexId);

      for (let i = 0; i < 3; ++i) {
        if (hypersDimension[i] !== 0 && hypersDimension[i] <= vector.length) {
          hypersFlat.push(vector[hypersDimension[i] - 1]);
        } else {
          hypersFlat.push(0.0);
        }
      }
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, hypersBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hypersFlat), gl.DYNAMIC_DRAW);

    gl.vertexAttribPointer(this.pointers['aVertexHyper'], 3, gl.FLOAT, false, 0, 0);
  }

}
