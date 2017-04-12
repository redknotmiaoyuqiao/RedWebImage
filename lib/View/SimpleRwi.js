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

        var glContextD = Object.create(GLContext);
        glContextD.Init(canvasId);
        this.glContext = glContextD.glContext;

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
        ImageLoad.Init(imageSrc,"mainTexture",0,this);
    },

    ImgLoadCallBack: function (name,unit,img) {
        var texture = Object.create(GLTexture);
        texture.Init(this.glContext, img, unit);
        
        this.draw.SetUniformTexture(name, texture, unit);
        this.draw.DoDraw();

        this.OnLoadImage();
    },

    OnLoadImage : function(){

    }
};