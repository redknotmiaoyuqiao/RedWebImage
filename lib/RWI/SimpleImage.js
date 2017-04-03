/****
 * 单张图片，单次处理的简单Image
****/
var SimpleImage = {

    canvasId : null,
    context : null,

    draw : null,

    Init : function(canvasId){
        this.canvasId = canvasId;

        var canvasElement = document.getElementById(this.canvasId);
        this.context = canvasElement.getContext('webgl' || 'experimental-webgl');
        
        /**
         * 初始化Program
         */
        var program = Object.create(GLProgram);
        program.Init(this.context);

        vertexShader = Object.create(GLShader);
        vertexShader.Init(this.context,this.context.VERTEX_SHADER,vertex_wave);
        vertexShader.CompileShader();
        fragmentShader = Object.create(GLShader);
        fragmentShader.Init(this.context,this.context.FRAGMENT_SHADER,fragment_wave);
        fragmentShader.CompileShader();

        program.AddShader(vertexShader);
        program.AddShader(fragmentShader);

        program.LinkProgram();

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