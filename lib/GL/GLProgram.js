/**
 * 封装了Program Redknot编写
 */
var GLProgram = {

    glContext : null,
    programId : null,
    shaderList : null,

    Init : function(glContext){
        this.glContext = glContext;
        this.programId = this.glContext.createProgram();
        this.shaderList = new Array();
    },

    AddShader : function(shader){
        this.shaderList.push(shader);
    },

    LinkProgram : function(){
        for(var i=0;i<this.shaderList.length;i++){
            this.glContext.attachShader(this.programId, this.shaderList[i].shaderId);
        }
        this.glContext.linkProgram(this.programId);
    },

    UseProgram : function(){
        this.glContext.useProgram(this.programId);
    }
};