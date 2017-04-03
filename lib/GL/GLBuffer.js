var GLBuffer = {

    context : null,
    data : null,
    bufferId : null,
    bufferType : null,

    size : 0,

    Init : function(context){
        this.context = context;
        this.bufferId = this.context.createBuffer();
    },

    SetBufferData : function(data,bufferType,size){
        this.data = data;
        this.bufferType = bufferType;
        this.size = size;
        this.context.bindBuffer(this.bufferType, this.bufferId);
        this.context.bufferData(this.bufferType, this.data, this.context.STATIC_DRAW);
    }
};