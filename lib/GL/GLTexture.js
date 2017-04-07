var GLTexture = {

    glContext : null,
    textureId : null,

    Init : function(glContext,img,texUnit){
        this.glContext = glContext;

        this.textureId = this.glContext.createTexture();

        this.glContext.pixelStorei(this.glContext.UNPACK_FLIP_Y_WEBGL, 1);
        this.glContext.activeTexture(texUnit);
        this.glContext.bindTexture(this.glContext.TEXTURE_2D, this.textureId);

        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_MIN_FILTER, this.glContext.LINEAR);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_MAG_FILTER, this.glContext.LINEAR);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_WRAP_S, this.glContext.CLAMP_TO_EDGE);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_WRAP_T, this.glContext.CLAMP_TO_EDGE);

        this.glContext.texImage2D(this.glContext.TEXTURE_2D, 0, this.glContext.RGBA, this.glContext.RGBA, this.glContext.UNSIGNED_BYTE, img);
    } 
    
};