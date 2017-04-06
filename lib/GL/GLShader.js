/**
 * 封装了Shader Redknot编写
 */
var GLShader = {

    glContext : null,
    type : null,
    source : null,

    shaderId : null,

    Init : function(glContext,type,source){
        this.glContext = glContext,
        this.type = type;
        this.source = source;

        if (type == "vertex") {
            this.type = this.glContext.VERTEX_SHADER;
        } 
        else if (type == "fragment") {
            this.type = this.glContext.FRAGMENT_SHADER;
        }
        else {
            return;
        }

        this.shaderId = this.glContext.createShader(this.type);
        this.glContext.shaderSource(this.shaderId, this.source);
        this.glContext.compileShader(this.shaderId);

        var error = this.glContext.getShaderInfoLog(this.shaderId);
        if(error != ""){
            console.error(error);
        }
    }
};