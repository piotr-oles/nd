define(function() {
    // W3C WebGL Specification
    var WebGL = {
        /* ClearBufferMask */
        get DEPTH_BUFFER_BIT              () { return 0x00000100; },
        get STENCIL_BUFFER_BIT            () { return 0x00000400; },
        get COLOR_BUFFER_BIT              () { return 0x00004000; },
        
        /* BeginMode */
        get POINTS                        () { return 0x0000; },
        get LINES                         () { return 0x0001; },
        get LINE_LOOP                     () { return 0x0002; },
        get LINE_STRIP                    () { return 0x0003; },
        get TRIANGLES                     () { return 0x0004; },
        get TRIANGLE_STRIP                () { return 0x0005; },
        get TRIANGLE_FAN                  () { return 0x0006; },
        
        /* BlendingFactorDest */
        get ZERO                          () { return 0; },
        get ONE                           () { return 1; },
        get SRC_COLOR                     () { return 0x0300; },
        get ONE_MINUS_SRC_COLOR           () { return 0x0301; },
        get SRC_ALPHA                     () { return 0x0302; },
        get ONE_MINUS_SRC_ALPHA           () { return 0x0303; },
        get DST_ALPHA                     () { return 0x0304; },
        get ONE_MINUS_DST_ALPHA           () { return 0x0305; },
    
        /* BlendingFactorSrc */
        get DST_COLOR                     () { return 0x0306; },
        get ONE_MINUS_DST_COLOR           () { return 0x0307; },
        get SRC_ALPHA_SATURATE            () { return 0x0308; },
    
        /* BlendEquationSeparate */
        get FUNC_ADD                      () { return 0x8006; },
        get BLEND_EQUATION                () { return 0x8009; },
        get BLEND_EQUATION_RGB            () { return 0x8009;   /* same as BLEND_EQUATION */ },
        get BLEND_EQUATION_ALPHA          () { return 0x883D; },
    
        /* BlendSubtract */
        get FUNC_SUBTRACT                 () { return 0x800A; },
        get FUNC_REVERSE_SUBTRACT         () { return 0x800B; },

        /* Separate Blend Functions */
        get BLEND_DST_RGB                 () { return 0x80C8; },
        get BLEND_SRC_RGB                 () { return 0x80C9; },
        get BLEND_DST_ALPHA               () { return 0x80CA; },
        get BLEND_SRC_ALPHA               () { return 0x80CB; },
        get CONSTANT_COLOR                () { return 0x8001; },
        get ONE_MINUS_CONSTANT_COLOR      () { return 0x8002; },
        get CONSTANT_ALPHA                () { return 0x8003; },
        get ONE_MINUS_CONSTANT_ALPHA      () { return 0x8004; },
        get BLEND_COLOR                   () { return 0x8005; },

        /* Buffer Objects */
        get ARRAY_BUFFER                  () { return 0x8892; },
        get ELEMENT_ARRAY_BUFFER          () { return 0x8893; },
        get ARRAY_BUFFER_BINDING          () { return 0x8894; },
        get ELEMENT_ARRAY_BUFFER_BINDING  () { return 0x8895; },

        get STREAM_DRAW                   () { return 0x88E0; },
        get STATIC_DRAW                   () { return 0x88E4; },
        get DYNAMIC_DRAW                  () { return 0x88E8; },

        get BUFFER_SIZE                   () { return 0x8764; },
        get BUFFER_USAGE                  () { return 0x8765; },

        get CURRENT_VERTEX_ATTRIB         () { return 0x8626; },

        /* CullFaceMode */
        get FRONT                         () { return 0x0404; },
        get BACK                          () { return 0x0405; },
        get FRONT_AND_BACK                () { return 0x0408; },

        /* EnableCap */
        /* TEXTURE_2D */
        get CULL_FACE                     () { return 0x0B44; },
        get BLEND                         () { return 0x0BE2; },
        get DITHER                        () { return 0x0BD0; },
        get STENCIL_TEST                  () { return 0x0B90; },
        get DEPTH_TEST                    () { return 0x0B71; },
        get SCISSOR_TEST                  () { return 0x0C11; },
        get POLYGON_OFFSET_FILL           () { return 0x8037; },
        get SAMPLE_ALPHA_TO_COVERAGE      () { return 0x809E; },
        get SAMPLE_COVERAGE               () { return 0x80A0; },

        /* ErrorCode */
        get NO_ERROR                      () { return 0; },
        get INVALID_ENUM                  () { return 0x0500; },
        get INVALID_VALUE                 () { return 0x0501; },
        get INVALID_OPERATION             () { return 0x0502; },
        get OUT_OF_MEMORY                 () { return 0x0505; },

        /* FrontFaceDirection */
        get CW                            () { return 0x0900; },
        get CCW                           () { return 0x0901; },

        /* GetPName */
        get LINE_WIDTH                    () { return 0x0B21; },
        get ALIASED_POINT_SIZE_RANGE      () { return 0x846D; },
        get ALIASED_LINE_WIDTH_RANGE      () { return 0x846E; },
        get CULL_FACE_MODE                () { return 0x0B45; },
        get FRONT_FACE                    () { return 0x0B46; },
        get DEPTH_RANGE                   () { return 0x0B70; },
        get DEPTH_WRITEMASK               () { return 0x0B72; },
        get DEPTH_CLEAR_VALUE             () { return 0x0B73; },
        get DEPTH_FUNC                    () { return 0x0B74; },
        get STENCIL_CLEAR_VALUE           () { return 0x0B91; },
        get STENCIL_FUNC                  () { return 0x0B92; },
        get STENCIL_FAIL                  () { return 0x0B94; },
        get STENCIL_PASS_DEPTH_FAIL       () { return 0x0B95; },
        get STENCIL_PASS_DEPTH_PASS       () { return 0x0B96; },
        get STENCIL_REF                   () { return 0x0B97; },
        get STENCIL_VALUE_MASK            () { return 0x0B93; },
        get STENCIL_WRITEMASK             () { return 0x0B98; },
        get STENCIL_BACK_FUNC             () { return 0x8800; },
        get STENCIL_BACK_FAIL             () { return 0x8801; },
        get STENCIL_BACK_PASS_DEPTH_FAIL  () { return 0x8802; },
        get STENCIL_BACK_PASS_DEPTH_PASS  () { return 0x8803; },
        get STENCIL_BACK_REF              () { return 0x8CA3; },
        get STENCIL_BACK_VALUE_MASK       () { return 0x8CA4; },
        get STENCIL_BACK_WRITEMASK        () { return 0x8CA5; },
        get VIEWPORT                      () { return 0x0BA2; },
        get SCISSOR_BOX                   () { return 0x0C10; },
        get COLOR_CLEAR_VALUE             () { return 0x0C22; },
        get COLOR_WRITEMASK               () { return 0x0C23; },
        get UNPACK_ALIGNMENT              () { return 0x0CF5; },
        get PACK_ALIGNMENT                () { return 0x0D05; },
        get MAX_TEXTURE_SIZE              () { return 0x0D33; },
        get MAX_VIEWPORT_DIMS             () { return 0x0D3A; },
        get SUBPIXEL_BITS                 () { return 0x0D50; },
        get RED_BITS                      () { return 0x0D52; },
        get GREEN_BITS                    () { return 0x0D53; },
        get BLUE_BITS                     () { return 0x0D54; },
        get ALPHA_BITS                    () { return 0x0D55; },
        get DEPTH_BITS                    () { return 0x0D56; },
        get STENCIL_BITS                  () { return 0x0D57; },
        get POLYGON_OFFSET_UNITS          () { return 0x2A00; },
        get POLYGON_OFFSET_FACTOR         () { return 0x8038; },
        get TEXTURE_BINDING_2D            () { return 0x8069; },
        get SAMPLE_BUFFERS                () { return 0x80A8; },
        get SAMPLES                       () { return 0x80A9; },
        get SAMPLE_COVERAGE_VALUE         () { return 0x80AA; },
        get SAMPLE_COVERAGE_INVERT        () { return 0x80AB; },

        /* GetTextureParameter */
        get COMPRESSED_TEXTURE_FORMATS    () { return 0x86A3; },

        /* HintMode */
        get DONT_CARE                     () { return 0x1100; },
        get FASTEST                       () { return 0x1101; },
        get NICEST                        () { return 0x1102; },

        /* HintTarget */
        get GENERATE_MIPMAP_HINT           () { return 0x8192; },

        /* DataType */
        get BYTE                          () { return 0x1400; },
        get UNSIGNED_BYTE                 () { return 0x1401; },
        get SHORT                         () { return 0x1402; },
        get UNSIGNED_SHORT                () { return 0x1403; },
        get INT                           () { return 0x1404; },
        get UNSIGNED_INT                  () { return 0x1405; },
        get FLOAT                         () { return 0x1406; },

        /* PixelFormat */
        get DEPTH_COMPONENT               () { return 0x1902; },
        get ALPHA                         () { return 0x1906; },
        get RGB                           () { return 0x1907; },
        get RGBA                          () { return 0x1908; },
        get LUMINANCE                     () { return 0x1909; },
        get LUMINANCE_ALPHA               () { return 0x190A; },

        /* PixelType */
        get UNSIGNED_SHORT_4_4_4_4        () { return 0x8033; },
        get UNSIGNED_SHORT_5_5_5_1        () { return 0x8034; },
        get UNSIGNED_SHORT_5_6_5          () { return 0x8363; },

        /* Shaders */
        get FRAGMENT_SHADER                 () { return 0x8B30; },
        get VERTEX_SHADER                   () { return 0x8B31; },
        get MAX_VERTEX_ATTRIBS              () { return 0x8869; },
        get MAX_VERTEX_UNIFORM_VECTORS      () { return 0x8DFB; },
        get MAX_VARYING_VECTORS             () { return 0x8DFC; },
        get MAX_COMBINED_TEXTURE_IMAGE_UNITS() { return 0x8B4D; },
        get MAX_VERTEX_TEXTURE_IMAGE_UNITS  () { return 0x8B4C; },
        get MAX_TEXTURE_IMAGE_UNITS         () { return 0x8872; },
        get MAX_FRAGMENT_UNIFORM_VECTORS    () { return 0x8DFD; },
        get SHADER_TYPE                     () { return 0x8B4F; },
        get DELETE_STATUS                   () { return 0x8B80; },
        get LINK_STATUS                     () { return 0x8B82; },
        get VALIDATE_STATUS                 () { return 0x8B83; },
        get ATTACHED_SHADERS                () { return 0x8B85; },
        get ACTIVE_UNIFORMS                 () { return 0x8B86; },
        get ACTIVE_ATTRIBUTES               () { return 0x8B89; },
        get SHADING_LANGUAGE_VERSION        () { return 0x8B8C; },
        get CURRENT_PROGRAM                 () { return 0x8B8D; },

        /* StencilFunction */
        get NEVER                         () { return 0x0200; },
        get LESS                          () { return 0x0201; },
        get EQUAL                         () { return 0x0202; },
        get LEQUAL                        () { return 0x0203; },
        get GREATER                       () { return 0x0204; },
        get NOTEQUAL                      () { return 0x0205; },
        get GEQUAL                        () { return 0x0206; },
        get ALWAYS                        () { return 0x0207; },

        /* StencilOp */
        get KEEP                          () { return 0x1E00; },
        get REPLACE                       () { return 0x1E01; },
        get INCR                          () { return 0x1E02; },
        get DECR                          () { return 0x1E03; },
        get INVERT                        () { return 0x150A; },
        get INCR_WRAP                     () { return 0x8507; },
        get DECR_WRAP                     () { return 0x8508; },

        /* StringName */
        get VENDOR                        () { return 0x1F00; },
        get RENDERER                      () { return 0x1F01; },
        get VERSION                       () { return 0x1F02; },

        /* TextureMagFilter */
        get NEAREST                       () { return 0x2600; },
        get LINEAR                        () { return 0x2601; },

        /* TextureMinFilter */
        get NEAREST_MIPMAP_NEAREST        () { return 0x2700; },
        get LINEAR_MIPMAP_NEAREST         () { return 0x2701; },
        get NEAREST_MIPMAP_LINEAR         () { return 0x2702; },
        get LINEAR_MIPMAP_LINEAR          () { return 0x2703; },

        /* TextureParameterName */
        get TEXTURE_MAG_FILTER            () { return 0x2800; },
        get TEXTURE_MIN_FILTER            () { return 0x2801; },
        get TEXTURE_WRAP_S                () { return 0x2802; },
        get TEXTURE_WRAP_T                () { return 0x2803; },

        /* TextureTarget */
        get TEXTURE_2D                    () { return 0x0DE1; },
        get TEXTURE                       () { return 0x1702; },

        get TEXTURE_CUBE_MAP              () { return 0x8513; },
        get TEXTURE_BINDING_CUBE_MAP      () { return 0x8514; },
        get TEXTURE_CUBE_MAP_POSITIVE_X   () { return 0x8515; },
        get TEXTURE_CUBE_MAP_NEGATIVE_X   () { return 0x8516; },
        get TEXTURE_CUBE_MAP_POSITIVE_Y   () { return 0x8517; },
        get TEXTURE_CUBE_MAP_NEGATIVE_Y   () { return 0x8518; },
        get TEXTURE_CUBE_MAP_POSITIVE_Z   () { return 0x8519; },
        get TEXTURE_CUBE_MAP_NEGATIVE_Z   () { return 0x851A; },
        get MAX_CUBE_MAP_TEXTURE_SIZE     () { return 0x851C; },

        /* TextureUnit */
        get TEXTURE0                      () { return 0x84C0; },
        get TEXTURE1                      () { return 0x84C1; },
        get TEXTURE2                      () { return 0x84C2; },
        get TEXTURE3                      () { return 0x84C3; },
        get TEXTURE4                      () { return 0x84C4; },
        get TEXTURE5                      () { return 0x84C5; },
        get TEXTURE6                      () { return 0x84C6; },
        get TEXTURE7                      () { return 0x84C7; },
        get TEXTURE8                      () { return 0x84C8; },
        get TEXTURE9                      () { return 0x84C9; },
        get TEXTURE10                     () { return 0x84CA; },
        get TEXTURE11                     () { return 0x84CB; },
        get TEXTURE12                     () { return 0x84CC; },
        get TEXTURE13                     () { return 0x84CD; },
        get TEXTURE14                     () { return 0x84CE; },
        get TEXTURE15                     () { return 0x84CF; },
        get TEXTURE16                     () { return 0x84D0; },
        get TEXTURE17                     () { return 0x84D1; },
        get TEXTURE18                     () { return 0x84D2; },
        get TEXTURE19                     () { return 0x84D3; },
        get TEXTURE20                     () { return 0x84D4; },
        get TEXTURE21                     () { return 0x84D5; },
        get TEXTURE22                     () { return 0x84D6; },
        get TEXTURE23                     () { return 0x84D7; },
        get TEXTURE24                     () { return 0x84D8; },
        get TEXTURE25                     () { return 0x84D9; },
        get TEXTURE26                     () { return 0x84DA; },
        get TEXTURE27                     () { return 0x84DB; },
        get TEXTURE28                     () { return 0x84DC; },
        get TEXTURE29                     () { return 0x84DD; },
        get TEXTURE30                     () { return 0x84DE; },
        get TEXTURE31                     () { return 0x84DF; },
        get ACTIVE_TEXTURE                () { return 0x84E0; },

        /* TextureWrapMode */
        get REPEAT                        () { return 0x2901; },
        get CLAMP_TO_EDGE                 () { return 0x812F; },
        get MIRRORED_REPEAT               () { return 0x8370; },

        /* Uniform Types */
        get FLOAT_VEC2                    () { return 0x8B50; },
        get FLOAT_VEC3                    () { return 0x8B51; },
        get FLOAT_VEC4                    () { return 0x8B52; },
        get INT_VEC2                      () { return 0x8B53; },
        get INT_VEC3                      () { return 0x8B54; },
        get INT_VEC4                      () { return 0x8B55; },
        get BOOL                          () { return 0x8B56; },
        get BOOL_VEC2                     () { return 0x8B57; },
        get BOOL_VEC3                     () { return 0x8B58; },
        get BOOL_VEC4                     () { return 0x8B59; },
        get FLOAT_MAT2                    () { return 0x8B5A; },
        get FLOAT_MAT3                    () { return 0x8B5B; },
        get FLOAT_MAT4                    () { return 0x8B5C; },
        get SAMPLER_2D                    () { return 0x8B5E; },
        get SAMPLER_CUBE                  () { return 0x8B60; },

        /* Vertex Arrays */
        get VERTEX_ATTRIB_ARRAY_ENABLED       () { return 0x8622; },
        get VERTEX_ATTRIB_ARRAY_SIZE          () { return 0x8623; },
        get VERTEX_ATTRIB_ARRAY_STRIDE        () { return 0x8624; },
        get VERTEX_ATTRIB_ARRAY_TYPE          () { return 0x8625; },
        get VERTEX_ATTRIB_ARRAY_NORMALIZED    () { return 0x886A; },
        get VERTEX_ATTRIB_ARRAY_POINTER       () { return 0x8645; },
        get VERTEX_ATTRIB_ARRAY_BUFFER_BINDING() { return 0x889F; },

        /* Shader Source */
        get COMPILE_STATUS                () { return 0x8B81; },

        /* Shader Precision-Specified Types */
        get LOW_FLOAT                     () { return 0x8DF0; },
        get MEDIUM_FLOAT                  () { return 0x8DF1; },
        get HIGH_FLOAT                    () { return 0x8DF2; },
        get LOW_INT                       () { return 0x8DF3; },
        get MEDIUM_INT                    () { return 0x8DF4; },
        get HIGH_INT                      () { return 0x8DF5; },

        /* Framebuffer Object. */
        get FRAMEBUFFER                   () { return 0x8D40; },
        get RENDERBUFFER                  () { return 0x8D41; },

        get RGBA4                         () { return 0x8056; },
        get RGB5_A1                       () { return 0x8057; },
        get RGB565                        () { return 0x8D62; },
        get DEPTH_COMPONENT16             () { return 0x81A5; },
        get STENCIL_INDEX                 () { return 0x1901; },
        get STENCIL_INDEX8                () { return 0x8D48; },
        get DEPTH_STENCIL                 () { return 0x84F9; },

        get RENDERBUFFER_WIDTH            () { return 0x8D42; },
        get RENDERBUFFER_HEIGHT           () { return 0x8D43; },
        get RENDERBUFFER_INTERNAL_FORMAT  () { return 0x8D44; },
        get RENDERBUFFER_RED_SIZE         () { return 0x8D50; },
        get RENDERBUFFER_GREEN_SIZE       () { return 0x8D51; },
        get RENDERBUFFER_BLUE_SIZE        () { return 0x8D52; },
        get RENDERBUFFER_ALPHA_SIZE       () { return 0x8D53; },
        get RENDERBUFFER_DEPTH_SIZE       () { return 0x8D54; },
        get RENDERBUFFER_STENCIL_SIZE     () { return 0x8D55; },

        get FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE          () { return 0x8CD0; },
        get FRAMEBUFFER_ATTACHMENT_OBJECT_NAME          () { return 0x8CD1; },
        get FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL        () { return 0x8CD2; },
        get FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE() { return 0x8CD3; },

        get COLOR_ATTACHMENT0             () { return 0x8CE0; },
        get DEPTH_ATTACHMENT              () { return 0x8D00; },
        get STENCIL_ATTACHMENT            () { return 0x8D20; },
        get DEPTH_STENCIL_ATTACHMENT      () { return 0x821A; },

        get NONE                          () { return 0; },

        get FRAMEBUFFER_COMPLETE                     () { return 0x8CD5; },
        get FRAMEBUFFER_INCOMPLETE_ATTACHMENT        () { return 0x8CD6; },
        get FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT() { return 0x8CD7; },
        get FRAMEBUFFER_INCOMPLETE_DIMENSIONS        () { return 0x8CD9; },
        get FRAMEBUFFER_UNSUPPORTED                  () { return 0x8CDD; },

        get FRAMEBUFFER_BINDING           () { return 0x8CA6; },
        get RENDERBUFFER_BINDING          () { return 0x8CA7; },
        get MAX_RENDERBUFFER_SIZE         () { return 0x84E8; },

        get INVALID_FRAMEBUFFER_OPERATION () { return 0x0506; },

        /* WebGL-specific enums */
        get UNPACK_FLIP_Y_WEBGL               () { return 0x9240; },
        get UNPACK_PREMULTIPLY_ALPHA_WEBGL    () { return 0x9241; },
        get CONTEXT_LOST_WEBGL                () { return 0x9242; },
        get UNPACK_COLORSPACE_CONVERSION_WEBGL() { return 0x9243; },
        get BROWSER_DEFAULT_WEBGL             () { return 0x9244; }
    };
    
    return WebGL;
});