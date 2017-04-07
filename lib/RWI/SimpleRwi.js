/**
 * 封装了Program Redknot编写
 */
var SimpleRwi = {

    canvasId : null,
    FilterName : null,

    glContext : null,

    draw : null,

    Init : function(canvasId,FilterName)
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

        draw = Object.create(Draw);
        draw.Init(this.glContext,programV);

        var data = new Float32Array([-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0]);
        draw.SetAttribute("pos",data,2);

        var dataCoor = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);
        draw.SetAttribute("texPos",dataCoor,2);

        var indicesData = new Uint8Array([0, 1, 2, 0, 2, 3]);
        draw.SetElementIndex(indicesData);

        draw.SetClearColor(0.0,1.0,0.0,1.0);


        //var imageLoad = Object.create(ImageLoad);
        //imageLoad.Init("http://image.dcniupai.com/o_1bcukhfu5vn0dsl1gnd1pcd1b5411m.jpg",this);
        /**
         * 创建贴图
         */
        /*
        var img = new Image();
        img.crossOrigin = "Anonymous";
    
        console.log(this);
        img.onload = function(){
            console.log(this);
        }

        img.src = "http://image.dcniupai.com/o_1bcukhfu5vn0dsl1gnd1pcd1b5411m.jpg";

        var texture = Object.create(GLTexture);
        texture.Init(this.glContext, img, this.glContext.TEXTURE0);

        draw.SetUniformTexture("mainTexture",texture ,0);
        draw.DoDraw();
        */

        var img = Object.create(ImageLoad);
        img.Init("http://image.dcniupai.com/o_1bcukhfu5vn0dsl1gnd1pcd1b5411m.jpg",this);
        
    },

    CallBack : function(img){
        var texture = Object.create(GLTexture);
        texture.Init(this.glContext, img, this.glContext.TEXTURE0);

        draw.SetUniformTexture("mainTexture",texture ,0);
        draw.DoDraw();
    }
};