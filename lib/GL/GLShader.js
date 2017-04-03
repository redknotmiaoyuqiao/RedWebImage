var GLShader = {

    shaderId : null,
    context : null,
    source : null,

    Init : function(context,shaderType){
        this.context = context;
        this.shaderId = this.context.createShader(shaderType);
    },

    Init : function(context,shaderType,source){
        this.context = context;
        this.shaderId = this.context.createShader(shaderType);
        this.source = source;
        this.context.shaderSource(this.shaderId, this.source);
    },

    SetSourceByText : function(source){
        this.source = source;
        this.context.shaderSource(this.shaderId, this.source);
    },

    CompileShader : function(){
         this.context.compileShader(this.shaderId);
         var error = this.context.getShaderInfoLog(this.shaderId);
         if(error != ""){
             console.error(error);
         }
    }
};