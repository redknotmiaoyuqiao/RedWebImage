var GLProgram = {
    programId : null,
    context : null,
    shaderList : new Array(),

    Init : function(context){
        this.context = context;
        this.programId = this.context.createProgram();
    },

    AddShader : function(shader){
        this.shaderList.push(shader.shaderId);
    },

    LinkProgram : function(){
        for(var i=0;i<this.shaderList.length;i++){
            this.context.attachShader(this.programId, this.shaderList[i]);
        }
        this.context.linkProgram(this.programId);
    },

    UseProgram : function(){
        this.context.useProgram(this.programId);
    }
};