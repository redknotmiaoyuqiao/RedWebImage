/**
 * 封装了一次绘制过程 Redknot编写
 */
var Draw = {

    glContext : null,
    program : null,

    Init : function(glContext,program){
        this.glContext = glContext;
        this.program = program;
    },

    /**
     * 创建并绑定一个ARRAY_BUFFER
     */
    SetAttribute : function(name,data,size){
        var buffer = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, buffer);
        this.glContext.bufferData(this.glContext.ARRAY_BUFFER, data, this.glContext.STATIC_DRAW);

        var Location = this.glContext.getAttribLocation(this.program.programId,name);
        this.glContext.vertexAttribPointer(Location, size, this.glContext.FLOAT, false, 0, 0);
        this.glContext.enableVertexAttribArray(Location);
    },

    /**
     * 设置绘制索引
     */
    SetElementIndex : function(data){
        var buffer = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ELEMENT_ARRAY_BUFFER, buffer);
        this.glContext.bufferData(this.glContext.ELEMENT_ARRAY_BUFFER, data, this.glContext.STATIC_DRAW);
    }
};