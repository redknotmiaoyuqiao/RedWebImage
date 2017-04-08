/**
 * 封装了一次绘制过程 Redknot编写
 */
var Draw = {

    glContext : null,
    program : null,
    indicesData : null,

    R : 1.0,
    G : 1.0,
    B : 1.0,
    A : 1.0,

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
     * 设置Float
     */
    SetUniformFloat : function(name,data){
        var floatLocation = this.glContext.getUniformLocation(this.program.programId, name);
        this.glContext.uniform1f(floatLocation, data);
    },

    /**
     * 设置绘制索引
     */
    SetElementIndex : function(data){
        this.indicesData = data;
        var buffer = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ELEMENT_ARRAY_BUFFER, buffer);
        this.glContext.bufferData(this.glContext.ELEMENT_ARRAY_BUFFER, data, this.glContext.STATIC_DRAW);
    },

    /**
     * 设置Texture
     */
    SetUniformTexture : function(name, texture, texUnit){
        this.glContext.bindTexture(this.glContext.TEXTURE_2D, texture.textureId);
        
        var texLocation = this.glContext.getUniformLocation(this.program.programId, name);
        this.glContext.uniform1i(texLocation, texUnit);
    },

    /**
     * 设置清屏颜色
     */
    SetClearColor : function(R,G,B,A){
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    },

    /**
     * 提交一次绘制
     */
    DoDraw : function(){
        this.glContext.clearColor(this.R, this.G, this.B, this.A);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);

        this.glContext.drawElements(this.glContext.TRIANGLES, this.indicesData.length, this.glContext.UNSIGNED_BYTE, 0);
    }
};