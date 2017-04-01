/**
 * Created by eriksen on 17-3-29.
 */

const enumShaderType = {
    VertexShader:0,
    FragmentShader:1
};

class GLShader {
    constructor() {
        this.shaderSource = '';
        this.shaderType = enumShaderType.VertexShader;
    }
    
    setShaderSource(source){
        this.shaderSource = source;
    }
    
    setShaderType(type){
        this.shaderType = enumShaderType[type];
    }
}

module.exports = GLShader;