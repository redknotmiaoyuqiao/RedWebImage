var GLBuffer = {

    glContext: null,
    data: null,
    size: null,

    bufferId: null,

    Init: function(glContext, data, size) {
        this.glContext = glContext;
        this.data = data;
        this.size = size;

        this.bufferId = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, this.bufferId);
        this.glContext.bufferData(this.glContext.ARRAY_BUFFER, this.data, this.glContext.STATIC_DRAW);
    }
};
