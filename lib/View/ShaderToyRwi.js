/**
 * 事实上，这是一个很有趣的类，你可以用它来轻松移植shaderToy上的shader
 */

var ShaderToyRwi = {

    canvasId : null,
    FilterName : null,

    glContext : null,

    draw : null,

    START_TIME : 0,

    Init : function(canvasId,FilterName){
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
        
        /**
         * 设置顶点
         */
        var data = new Float32Array([-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0]);
        this.draw.SetAttribute("pos",data,2);

        /**
         * 设置默认纹理坐标
         */
        var dataCoor = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);
        this.draw.SetAttribute("texPos",dataCoor,2);

        /**
         * 设置顶点索引
         */
        var indicesData = new Uint8Array([0, 1, 2, 0, 2, 3]);
        this.draw.SetElementIndex(indicesData);

        /**
         * 设置Canvas实际大小
         */
        var iResolution = new Float32Array([glContextD.docCanvas.width * 1.0, glContextD.docCanvas.height * 1.0, 1.0]);
        this.draw.SetUniformVec3("iResolution",iResolution);

        /**
         * 缓存开始绘制的时间
         */
        this.START_TIME = Date.parse(new Date()) / 1000; 

        /**
         * 传入iGlobalTime
         */
        var iGlobalTime = (Date.parse(new Date()) / 1000) - this.START_TIME;
        this.draw.SetUniformFloat("iGlobalTime",iGlobalTime);
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