/**
 * Created by eriksen on 17-3-29.
 */

const GLShader = require('./GLShader');

class GLProgram {
    constructor() {
        this.shaderList = [];
    }
    
    addShader(shader) {
        this.shaderList.push(shader);
    }
    
    addShaderIndex(index, shader) {
        this.shaderList.splice(index, 0, shader);
    }
    
    linkProgram(){
        //maybe you will use this.shaderList
    }
}

module.exports = GLProgram;

let shader = new GLShader();
shader.setShaderSource('aaa');
shader.setShaderType('FragmentShader');

let glProgram = new GLProgram();
glProgram.addShader(shader);

let shader2 = new GLShader();
shader2.setShaderSource('bbb');

glProgram.addShaderIndex(0,shader2);

let shader3 = new GLShader();
shader3.setShaderSource('ccc');
shader3.setShaderType('FragmentShader');

glProgram.addShaderIndex(1,shader3);

console.log(glProgram);