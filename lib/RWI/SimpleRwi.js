/**
 * 封装了Program Redknot编写
 */
var SimpleRwi = {

    canvasId : null,
    FilterName : null,

    glContext : null,

    draw : null,

    Init : function(canvasId,FilterName,imageSrc)
    {
        this.canvasId = canvasId;
        this.FilterName = FilterName;

        var canvasElement = document.getElementById(canvasId);
        this.glContext = canvasElement.getContext('webgl');

        var vertex = Object.create(GLShader);
        vertex.Init(this.glContext,"vertex",eval("vertex_" + FilterName));
        var fragment = Object.create(GLShader);
        fragment.Init(this.glContext,"fragment",eval("fragment_" + FilterName));

        programV = Object.create(GLProgram);
        programV.Init(this.glContext);
        programV.AddShader(vertex);
        programV.AddShader(fragment);
        programV.LinkProgram();
        programV.UseProgram();

        this.draw = Object.create(Draw);
        this.draw.Init(this.glContext,programV);

        var data = new Float32Array([-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0]);
        this.draw.SetAttribute("pos",data,2);

        var dataCoor = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);
        this.draw.SetAttribute("texPos",dataCoor,2);

        var indicesData = new Uint8Array([0, 1, 2, 0, 2, 3]);
        this.draw.SetElementIndex(indicesData);

        /**
         * 创建贴图
         */

        var imageload = Object.create(ImageLoad);
        ImageLoad.Init(imageSrc,this);
    },

    CallBack: function (img) {
        var texture = Object.create(GLTexture);
        texture.Init(this.glContext, img, this.glContext.TEXTURE0);
        
        this.draw.SetUniformTexture("mainTexture", texture, 0);
        this.draw.DoDraw();

        this.OnLoadImage();
    },

    OnLoadImage : function(){

    }
};