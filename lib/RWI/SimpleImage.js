/****
 * 单张图片，单次处理的简单Image
****/
var SimpleImage = {

    canvasId : null,
    context : null,

    draw : null,

    filterName : null,

    Init : function(canvasId,filterName){
        this.canvasId = canvasId;
        this.filterName = filterName;

        var canvasElement = document.getElementById(this.canvasId);
        this.context = canvasElement.getContext('webgl' || 'experimental-webgl');
        
        /**
         * 根据FilterName创建
         */
        var filter = Object.create(Filter);
        filter.Init(this.context,filterName);
        var program = filter.program;

        draw = Object.create(Draw);
        draw.Init(this.context,program);


        /**** 创建顶点Buffer ****/
        var data = new Float32Array([-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0]);
        var VertexBuffer = Object.create(GLBuffer);
        VertexBuffer.Init(this.context);
        VertexBuffer.SetBufferData(data,this.context.ARRAY_BUFFER,2);
        draw.SetAttribute("pos",VertexBuffer);

        /**** 纹理坐标Buffer ****/
        var dataCoor = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);
        var CoorBuffer = Object.create(GLBuffer);
        CoorBuffer.Init(this.context);
        CoorBuffer.SetBufferData(dataCoor,this.context.ARRAY_BUFFER,2);
        draw.SetAttribute("texPos",CoorBuffer);
    },

    SetImageUrl : function(imgUrl){
        var imageLoad = Object.create(LoadImage);
        imageLoad.Load(imgUrl,this);
    },

    ImageCallBack : function(img){
        /**** 构建mainTexture ****/
        var texture = Object.create(GLTexture);
        texture.Init(this.context);
        texture.SetImage(img,this.context.TEXTURE0);

        draw.SetUniformTexture("mainTexture",texture);

        draw.SetBackgroundColor(1.0, 1.0, 0.0, 0.0);
        draw.DoDraw();
    }

};