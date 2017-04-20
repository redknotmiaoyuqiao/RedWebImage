var CustomRwi = {

    canvasId: null,

    glContext: null,

    draw: null,

    Init: function(canvasId, program) {
        this.canvasId = canvasId;

        var glContextD = Object.create(GLContext);
        glContextD.Init(canvasId);
        this.glContext = glContextD.glContext;

        this.draw = Object.create(Draw);
        this.draw.Init(this.glContext,program);
    },

    /**
     * 实现图片回调用
     */
    ImgLoadCallBack: function (name,unit,img) {
        var texture = Object.create(GLTexture);
        texture.Init(this.glContext, img, unit);

        this.draw.SetUniformTexture(name, texture, unit);
        this.draw.DoDraw();
    }
};
