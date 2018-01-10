import { Canvas } from '../Canvas';
import { Geometry } from '../math/Geometry';
import { Camera } from './Camera';
import { Item } from './Item';

export abstract class Material {
  private vertexProgram: WebGLProgram;
  private fragmentProgram: WebGLProgram;

  protected program: WebGLProgram;
  protected pointers: {
    [key: string]: any
  };

  private compiled: boolean;

  constructor(
    protected parameters: any = {},
    protected vertexSource: string,
    protected fragmentSource: string,
    protected attributes: string[],
    protected uniforms: string[]
  ) {
    this.pointers = {};

    this.compiled = false;
  }

  static compileShader(gl: WebGLRenderingContext, type: 'vertex' | 'fragment', source: string): WebGLProgram {
    const shader = gl.createShader(
      'vertex' === type ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
    );

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error('An error occurred compiling the ' + type + ' shader: ' + gl.getShaderInfoLog(shader));
    }

    return shader;
  };

  compile(gl: WebGLRenderingContext) {
    if (!this.compiled) {
      this.compileShaders(gl);
      this.configureAttributes(gl);
      this.configureUniforms(gl);
    }

    this.compiled = true;
  }

  isCompiled(): boolean {
    return this.compiled;
  }

  abstract configure(gl: WebGLRenderingContext): void;
  abstract rollback(gl: WebGLRenderingContext): void;

  abstract setUniforms(
    gl: WebGLRenderingContext,
    flatGeometry: Geometry,
    hyperGeometry: Geometry,
    item: Item,
    camera: Camera,
    canvas: Canvas
  ): void;

  abstract setAttributes(
    gl: WebGLRenderingContext,
    flatGeometry: Geometry,
    hyperGeometry: Geometry,
    item: Item,
    camera: Camera,
    canvas: Canvas
  ): void;

  private compileShaders(gl: WebGLRenderingContext) {
    const program = gl.createProgram();

    let vertexShader: WebGLProgram;
    let fragmentShader: WebGLProgram;

    if (!this.vertexProgram) {
      vertexShader = Material.compileShader(gl, 'vertex', this.vertexSource);
      gl.attachShader(program, vertexShader);

      this.vertexProgram = vertexShader;
    }

    if (!this.fragmentProgram) {
      fragmentShader = Material.compileShader(gl, 'fragment', this.fragmentSource);
      gl.attachShader(program, fragmentShader);

      this.fragmentProgram = fragmentShader;
    }

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('Unable to initialize the shader program.');
    }

    gl.useProgram(program);

    this.program = program;
  }

  private configureAttributes(gl: WebGLRenderingContext) {
    const { attributes, pointers, program } = this;

    attributes.forEach(attribute => {
      const pointer = gl.getAttribLocation(program, attribute);

      Object.defineProperty(pointers, attribute, {
        get: () => gl.getAttribLocation(program, attribute),
        set: () => {}
      });

      gl.enableVertexAttribArray(pointer);
    });
  }

  private configureUniforms(gl: WebGLRenderingContext) {
    const { uniforms, pointers, program } = this;

    uniforms.forEach(uniform => {
      Object.defineProperty(pointers, uniform, {
        get: () => gl.getUniformLocation(program, uniform),
        set: () => {}
      });
    });
  }
}
