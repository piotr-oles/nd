// W3C WebGL Specification
export class WebGL {
  /* ClearBufferMask */
  static readonly DEPTH_BUFFER_BIT = 0x00000100;
  static readonly STENCIL_BUFFER_BIT = 0x00000400;
  static readonly COLOR_BUFFER_BIT = 0x00004000;

  /* BeginMode */
  static readonly POINTS = 0x0000;
  static readonly LINES = 0x0001;
  static readonly LINE_LOOP = 0x0002;
  static readonly LINE_STRIP = 0x0003;
  static readonly TRIANGLES = 0x0004;
  static readonly TRIANGLE_STRIP = 0x0005;
  static readonly TRIANGLE_FAN = 0x0006;

  /* BlendingFactorDest */
  static readonly ZERO = 0;
  static readonly ONE = 1;
  static readonly SRC_COLOR = 0x0300;
  static readonly ONE_MINUS_SRC_COLOR = 0x0301;
  static readonly SRC_ALPHA = 0x0302;
  static readonly ONE_MINUS_SRC_ALPHA = 0x0303;
  static readonly DST_ALPHA = 0x0304;
  static readonly ONE_MINUS_DST_ALPHA = 0x0305;

  /* BlendingFactorSrc */
  static readonly DST_COLOR = 0x0306;
  static readonly ONE_MINUS_DST_COLOR = 0x0307;
  static readonly SRC_ALPHA_SATURATE = 0x0308;

  /* BlendEquationSeparate */
  static readonly FUNC_ADD = 0x8006;
  static readonly BLEND_EQUATION = 0x8009;
  /* same as BLEND_EQUATION */
  static readonly BLEND_EQUATION_RGB = 0x8009;
  static readonly BLEND_EQUATION_ALPHA = 0x883D;

  /* BlendSubtract */
  static readonly FUNC_SUBTRACT = 0x800A;
  static readonly FUNC_REVERSE_SUBTRACT = 0x800B;

  /* Separate Blend Functions */
  static readonly BLEND_DST_RGB = 0x80C8;
  static readonly BLEND_SRC_RGB = 0x80C9;
  static readonly BLEND_DST_ALPHA = 0x80CA;
  static readonly BLEND_SRC_ALPHA = 0x80CB;
  static readonly CONSTANT_COLOR = 0x8001;
  static readonly ONE_MINUS_CONSTANT_COLOR = 0x8002;
  static readonly CONSTANT_ALPHA = 0x8003;
  static readonly ONE_MINUS_CONSTANT_ALPHA = 0x8004;
  static readonly BLEND_COLOR = 0x8005;

  /* Buffer Objects */
  static readonly ARRAY_BUFFER = 0x8892;
  static readonly ELEMENT_ARRAY_BUFFER = 0x8893;
  static readonly ARRAY_BUFFER_BINDING = 0x8894;
  static readonly ELEMENT_ARRAY_BUFFER_BINDING = 0x8895;

  static readonly STREAM_DRAW = 0x88E0;
  static readonly STATIC_DRAW = 0x88E4;
  static readonly DYNAMIC_DRAW = 0x88E8;

  static readonly BUFFER_SIZE = 0x8764;
  static readonly BUFFER_USAGE = 0x8765;

  static readonly CURRENT_VERTEX_ATTRIB = 0x8626;

  /* CullFaceMode */
  static readonly FRONT = 0x0404;
  static readonly BACK = 0x0405;
  static readonly FRONT_AND_BACK = 0x0408;

  /* EnableCap */
  /* TEXTURE_2D */
  static readonly CULL_FACE = 0x0B44;
  static readonly BLEND = 0x0BE2;
  static readonly DITHER = 0x0BD0;
  static readonly STENCIL_TEST = 0x0B90;
  static readonly DEPTH_TEST = 0x0B71;
  static readonly SCISSOR_TEST = 0x0C11;
  static readonly POLYGON_OFFSET_FILL = 0x8037;
  static readonly SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
  static readonly SAMPLE_COVERAGE = 0x80A0;

  /* ErrorCode */
  static readonly NO_ERROR = 0;
  static readonly INVALID_ENUM = 0x0500;
  static readonly INVALID_VALUE = 0x0501;
  static readonly INVALID_OPERATION = 0x0502;
  static readonly OUT_OF_MEMORY = 0x0505;

  /* FrontFaceDirection */
  static readonly CW = 0x0900;
  static readonly CCW = 0x0901;

  /* GetPName */
  static readonly LINE_WIDTH = 0x0B21;
  static readonly ALIASED_POINT_SIZE_RANGE = 0x846D;
  static readonly ALIASED_LINE_WIDTH_RANGE = 0x846E;
  static readonly CULL_FACE_MODE = 0x0B45;
  static readonly FRONT_FACE = 0x0B46;
  static readonly DEPTH_RANGE = 0x0B70;
  static readonly DEPTH_WRITEMASK = 0x0B72;
  static readonly DEPTH_CLEAR_VALUE = 0x0B73;
  static readonly DEPTH_FUNC = 0x0B74;
  static readonly STENCIL_CLEAR_VALUE = 0x0B91;
  static readonly STENCIL_FUNC = 0x0B92;
  static readonly STENCIL_FAIL = 0x0B94;
  static readonly STENCIL_PASS_DEPTH_FAIL = 0x0B95;
  static readonly STENCIL_PASS_DEPTH_PASS = 0x0B96;
  static readonly STENCIL_REF = 0x0B97;
  static readonly STENCIL_VALUE_MASK = 0x0B93;
  static readonly STENCIL_WRITEMASK = 0x0B98;
  static readonly STENCIL_BACK_FUNC = 0x8800;
  static readonly STENCIL_BACK_FAIL = 0x8801;
  static readonly STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802;
  static readonly STENCIL_BACK_PASS_DEPTH_PASS = 0x8803;
  static readonly STENCIL_BACK_REF = 0x8CA3;
  static readonly STENCIL_BACK_VALUE_MASK = 0x8CA4;
  static readonly STENCIL_BACK_WRITEMASK = 0x8CA5;
  static readonly VIEWPORT = 0x0BA2;
  static readonly SCISSOR_BOX = 0x0C10;
  static readonly COLOR_CLEAR_VALUE = 0x0C22;
  static readonly COLOR_WRITEMASK = 0x0C23;
  static readonly UNPACK_ALIGNMENT = 0x0CF5;
  static readonly PACK_ALIGNMENT = 0x0D05;
  static readonly MAX_TEXTURE_SIZE = 0x0D33;
  static readonly MAX_VIEWPORT_DIMS = 0x0D3A;
  static readonly SUBPIXEL_BITS = 0x0D50;
  static readonly RED_BITS = 0x0D52;
  static readonly GREEN_BITS = 0x0D53;
  static readonly BLUE_BITS = 0x0D54;
  static readonly ALPHA_BITS = 0x0D55;
  static readonly DEPTH_BITS = 0x0D56;
  static readonly STENCIL_BITS = 0x0D57;
  static readonly POLYGON_OFFSET_UNITS = 0x2A00;
  static readonly POLYGON_OFFSET_FACTOR = 0x8038;
  static readonly TEXTURE_BINDING_2D = 0x8069;
  static readonly SAMPLE_BUFFERS = 0x80A8;
  static readonly SAMPLES = 0x80A9;
  static readonly SAMPLE_COVERAGE_VALUE = 0x80AA;
  static readonly SAMPLE_COVERAGE_INVERT = 0x80AB;

  /* GetTextureParameter */
  static readonly COMPRESSED_TEXTURE_FORMATS = 0x86A3;

  /* HintMode */
  static readonly DONT_CARE = 0x1100;
  static readonly FASTEST = 0x1101;
  static readonly NICEST = 0x1102;

  /* HintTarget */
  static readonly GENERATE_MIPMAP_HINT = 0x8192;

  /* DataType */
  static readonly BYTE = 0x1400;
  static readonly UNSIGNED_BYTE = 0x1401;
  static readonly SHORT = 0x1402;
  static readonly UNSIGNED_SHORT = 0x1403;
  static readonly INT = 0x1404;
  static readonly UNSIGNED_INT = 0x1405;
  static readonly FLOAT = 0x1406;

  /* PixelFormat */
  static readonly DEPTH_COMPONENT = 0x1902;
  static readonly ALPHA = 0x1906;
  static readonly RGB = 0x1907;
  static readonly RGBA = 0x1908;
  static readonly LUMINANCE = 0x1909;
  static readonly LUMINANCE_ALPHA = 0x190A;

  /* PixelType */
  static readonly UNSIGNED_SHORT_4_4_4_4 = 0x8033;
  static readonly UNSIGNED_SHORT_5_5_5_1 = 0x8034;
  static readonly UNSIGNED_SHORT_5_6_5 = 0x8363;

  /* Shaders */
  static readonly FRAGMENT_SHADER = 0x8B30;
  static readonly VERTEX_SHADER = 0x8B31;
  static readonly MAX_VERTEX_ATTRIBS = 0x8869;
  static readonly MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;
  static readonly MAX_VARYING_VECTORS = 0x8DFC;
  static readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
  static readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
  static readonly MAX_TEXTURE_IMAGE_UNITS = 0x8872;
  static readonly MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;
  static readonly SHADER_TYPE = 0x8B4F;
  static readonly DELETE_STATUS = 0x8B80;
  static readonly LINK_STATUS = 0x8B82;
  static readonly VALIDATE_STATUS = 0x8B83;
  static readonly ATTACHED_SHADERS = 0x8B85;
  static readonly ACTIVE_UNIFORMS = 0x8B86;
  static readonly ACTIVE_ATTRIBUTES = 0x8B89;
  static readonly SHADING_LANGUAGE_VERSION = 0x8B8C;
  static readonly CURRENT_PROGRAM = 0x8B8D;

  /* StencilFunction */
  static readonly NEVER = 0x0200;
  static readonly LESS = 0x0201;
  static readonly EQUAL = 0x0202;
  static readonly LEQUAL = 0x0203;
  static readonly GREATER = 0x0204;
  static readonly NOTEQUAL = 0x0205;
  static readonly GEQUAL = 0x0206;
  static readonly ALWAYS = 0x0207;

  /* StencilOp */
  static readonly KEEP = 0x1E00;
  static readonly REPLACE = 0x1E01;
  static readonly INCR = 0x1E02;
  static readonly DECR = 0x1E03;
  static readonly INVERT = 0x150A;
  static readonly INCR_WRAP = 0x8507;
  static readonly DECR_WRAP = 0x8508;

  /* StringName */
  static readonly VENDOR = 0x1F00;
  static readonly RENDERER = 0x1F01;
  static readonly VERSION = 0x1F02;

  /* TextureMagFilter */
  static readonly NEAREST = 0x2600;
  static readonly LINEAR = 0x2601;

  /* TextureMinFilter */
  static readonly NEAREST_MIPMAP_NEAREST = 0x2700;
  static readonly LINEAR_MIPMAP_NEAREST = 0x2701;
  static readonly NEAREST_MIPMAP_LINEAR = 0x2702;
  static readonly LINEAR_MIPMAP_LINEAR = 0x2703;

  /* TextureParameterName */
  static readonly TEXTURE_MAG_FILTER = 0x2800;
  static readonly TEXTURE_MIN_FILTER = 0x2801;
  static readonly TEXTURE_WRAP_S = 0x2802;
  static readonly TEXTURE_WRAP_T = 0x2803;

  /* TextureTarget */
  static readonly TEXTURE_2D = 0x0DE1;
  static readonly TEXTURE = 0x1702;

  static readonly TEXTURE_CUBE_MAP = 0x8513;
  static readonly TEXTURE_BINDING_CUBE_MAP = 0x8514;
  static readonly TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
  static readonly TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
  static readonly TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
  static readonly TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
  static readonly TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
  static readonly TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
  static readonly MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;

  /* TextureUnit */
  static readonly TEXTURE0 = 0x84C0;
  static readonly TEXTURE1 = 0x84C1;
  static readonly TEXTURE2 = 0x84C2;
  static readonly TEXTURE3 = 0x84C3;
  static readonly TEXTURE4 = 0x84C4;
  static readonly TEXTURE5 = 0x84C5;
  static readonly TEXTURE6 = 0x84C6;
  static readonly TEXTURE7 = 0x84C7;
  static readonly TEXTURE8 = 0x84C8;
  static readonly TEXTURE9 = 0x84C9;
  static readonly TEXTURE10 = 0x84CA;
  static readonly TEXTURE11 = 0x84CB;
  static readonly TEXTURE12 = 0x84CC;
  static readonly TEXTURE13 = 0x84CD;
  static readonly TEXTURE14 = 0x84CE;
  static readonly TEXTURE15 = 0x84CF;
  static readonly TEXTURE16 = 0x84D0;
  static readonly TEXTURE17 = 0x84D1;
  static readonly TEXTURE18 = 0x84D2;
  static readonly TEXTURE19 = 0x84D3;
  static readonly TEXTURE20 = 0x84D4;
  static readonly TEXTURE21 = 0x84D5;
  static readonly TEXTURE22 = 0x84D6;
  static readonly TEXTURE23 = 0x84D7;
  static readonly TEXTURE24 = 0x84D8;
  static readonly TEXTURE25 = 0x84D9;
  static readonly TEXTURE26 = 0x84DA;
  static readonly TEXTURE27 = 0x84DB;
  static readonly TEXTURE28 = 0x84DC;
  static readonly TEXTURE29 = 0x84DD;
  static readonly TEXTURE30 = 0x84DE;
  static readonly TEXTURE31 = 0x84DF;
  static readonly ACTIVE_TEXTURE = 0x84E0;

  /* TextureWrapMode */
  static readonly REPEAT = 0x2901;
  static readonly CLAMP_TO_EDGE = 0x812F;
  static readonly MIRRORED_REPEAT = 0x8370;

  /* Uniform Types */
  static readonly FLOAT_VEC2 = 0x8B50;
  static readonly FLOAT_VEC3 = 0x8B51;
  static readonly FLOAT_VEC4 = 0x8B52;
  static readonly INT_VEC2 = 0x8B53;
  static readonly INT_VEC3 = 0x8B54;
  static readonly INT_VEC4 = 0x8B55;
  static readonly BOOL = 0x8B56;
  static readonly BOOL_VEC2 = 0x8B57;
  static readonly BOOL_VEC3 = 0x8B58;
  static readonly BOOL_VEC4 = 0x8B59;
  static readonly FLOAT_MAT2 = 0x8B5A;
  static readonly FLOAT_MAT3 = 0x8B5B;
  static readonly FLOAT_MAT4 = 0x8B5C;
  static readonly SAMPLER_2D = 0x8B5E;
  static readonly SAMPLER_CUBE = 0x8B60;

  /* Vertex Arrays */
  static readonly VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622;
  static readonly VERTEX_ATTRIB_ARRAY_SIZE = 0x8623;
  static readonly VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624;
  static readonly VERTEX_ATTRIB_ARRAY_TYPE = 0x8625;
  static readonly VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A;
  static readonly VERTEX_ATTRIB_ARRAY_POINTER = 0x8645;
  static readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F;

  /* Shader Source */
  static readonly COMPILE_STATUS = 0x8B81;

  /* Shader Precision-Specified Types */
  static readonly LOW_FLOAT = 0x8DF0;
  static readonly MEDIUM_FLOAT = 0x8DF1;
  static readonly HIGH_FLOAT = 0x8DF2;
  static readonly LOW_INT = 0x8DF3;
  static readonly MEDIUM_INT = 0x8DF4;
  static readonly HIGH_INT = 0x8DF5;

  /* Framebuffer Object. */
  static readonly FRAMEBUFFER = 0x8D40;
  static readonly RENDERBUFFER = 0x8D41;

  static readonly RGBA4 = 0x8056;
  static readonly RGB5_A1 = 0x8057;
  static readonly RGB565 = 0x8D62;
  static readonly DEPTH_COMPONENT16 = 0x81A5;
  static readonly STENCIL_INDEX = 0x1901;
  static readonly STENCIL_INDEX8 = 0x8D48;
  static readonly DEPTH_STENCIL = 0x84F9;

  static readonly RENDERBUFFER_WIDTH = 0x8D42;
  static readonly RENDERBUFFER_HEIGHT = 0x8D43;
  static readonly RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;
  static readonly RENDERBUFFER_RED_SIZE = 0x8D50;
  static readonly RENDERBUFFER_GREEN_SIZE = 0x8D51;
  static readonly RENDERBUFFER_BLUE_SIZE = 0x8D52;
  static readonly RENDERBUFFER_ALPHA_SIZE = 0x8D53;
  static readonly RENDERBUFFER_DEPTH_SIZE = 0x8D54;
  static readonly RENDERBUFFER_STENCIL_SIZE = 0x8D55;

  static readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0;
  static readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1;
  static readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2;
  static readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3;

  static readonly COLOR_ATTACHMENT0 = 0x8CE0;
  static readonly DEPTH_ATTACHMENT = 0x8D00;
  static readonly STENCIL_ATTACHMENT = 0x8D20;
  static readonly DEPTH_STENCIL_ATTACHMENT = 0x821A;

  static readonly NONE = 0;

  static readonly FRAMEBUFFER_COMPLETE = 0x8CD5;
  static readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6;
  static readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
  static readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9;
  static readonly FRAMEBUFFER_UNSUPPORTED = 0x8CDD;

  static readonly FRAMEBUFFER_BINDING = 0x8CA6;
  static readonly RENDERBUFFER_BINDING = 0x8CA7;
  static readonly MAX_RENDERBUFFER_SIZE = 0x84E8;

  static readonly INVALID_FRAMEBUFFER_OPERATION = 0x0506;

  /* WebGL-specific enums */
  static readonly UNPACK_FLIP_Y_WEBGL = 0x9240;
  static readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
  static readonly CONTEXT_LOST_WEBGL = 0x9242;
  static readonly UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
  static readonly BROWSER_DEFAULT_WEBGL = 0x9244;
}
