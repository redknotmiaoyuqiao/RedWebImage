var GLTexture = {
    textureId : null,
    context : null,
    texUnit : null,

    Init : function(context){
        this.context = context;
        this.textureId = this.context.createTexture();
    },

    SetImage : function(img,texUnit){
        this.texUnit = texUnit;
        
        this.context.pixelStorei(this.context.UNPACK_FLIP_Y_WEBGL, 1);
        this.context.activeTexture(texUnit);
        this.context.bindTexture(this.context.TEXTURE_2D, this.textureId);

        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.LINEAR);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.LINEAR);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);

        this.context.texImage2D(this.context.TEXTURE_2D, 0, this.context.RGBA, this.context.RGBA, this.context.UNSIGNED_BYTE, img);
    }
}