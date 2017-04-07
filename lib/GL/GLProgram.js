/**
 * 封装了Program Redknot编写
 */
var GLProgram = {

    glContext : null,
    programId : null,
    shaderList : null,

    /**
     * 初始化
     */
    Init : function(glContext){
        this.glContext = glContext;
        this.programId = this.glContext.createProgram();
        this.shaderList = new Array();
    },

    /**
     * 添加一个Shader
     */
    AddShader : function(shader){
        this.shaderList.push(shader);
    },

    /**
     * 编译shander
     */
    LinkProgram : function(){
        for(var i=0;i<this.shaderList.length;i++){
            this.glContext.attachShader(this.programId, this.shaderList[i].shaderId);
        }
        this.glContext.linkProgram(this.programId);
    },

    /**
     * 将此Program设置为当前
     */
    UseProgram : function(){
        this.glContext.useProgram(this.programId);
    }
};