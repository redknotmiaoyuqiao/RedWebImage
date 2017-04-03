var Draw = {
    context : null,
    program : null,

    indexBuffer : null, 

    backgroundR : 1.0,
    backgroundG : 1.0,
    backgroundB : 1.0,
    backgroundA : 1.0,

    Init : function(context,program){
        this.context = context;
        this.program = program;

        this.program.UseProgram();

        var indicesData = new Uint8Array([0, 1, 2, 0, 2, 3]);
        this.indexBuffer = Object.create(GLBuffer);
        this.indexBuffer.Init(this.context);
        this.indexBuffer.SetBufferData(indicesData,this.context.ELEMENT_ARRAY_BUFFER);
    },

    SetElementIndex : function(indexBuffer){
        this.indexBuffer = indexBuffer;
    },

    SetAttribute : function(name, buffer){
        this.context.bindBuffer(buffer.bufferType, buffer.bufferId);

        var Location = this.context.getAttribLocation(this.program.programId,name);
        this.context.vertexAttribPointer(Location, buffer.size, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(Location);
    },

    SetUniformTexture : function(name, texture){
        this.context.bindTexture(this.context.TEXTURE_2D, texture.textureId);
        var texLocation = this.context.getUniformLocation(this.program.programId, name);
        this.context.uniform1i(texLocation, 0);
    },

    SetBackgroundColor : function(R,G,B,A){
        this.backgroundR = R;
        this.backgroundG = G;
        this.backgroundB = B;
        this.backgroundA = A;
    },

    DoDraw : function(){
        this.program.UseProgram();

        this.context.clearColor(this.backgroundR,this.backgroundG,this.backgroundB,this.backgroundA);
        this.context.clear(this.context.COLOR_BUFFER_BIT);

        this.context.drawElements(this.context.TRIANGLES, this.indexBuffer.data.length, this.context.UNSIGNED_BYTE, 0);
    }
};