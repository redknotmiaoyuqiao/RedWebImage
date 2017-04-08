/**** 创建时间为:2017-04-09 05:01:47 ****/


/**** GLProgram.js ****/

/**
 * 封装了Program Redknot编写
 */
var GLProgram = {

    glContext : null,
    programId : null,
    shaderList : null,

    /**
     * 初始化
     */
    Init : function(glContext){
        this.glContext = glContext;
        this.programId = this.glContext.createProgram();
        this.shaderList = new Array();
    },

    /**
     * 添加一个Shader
     */
    AddShader : function(shader){
        this.shaderList.push(shader);
    },

    /**
     * 编译shander
     */
    LinkProgram : function(){
        for(var i=0;i<this.shaderList.length;i++){
            this.glContext.attachShader(this.programId, this.shaderList[i].shaderId);
        }
        this.glContext.linkProgram(this.programId);
    },

    /**
     * 将此Program设置为当前
     */
    UseProgram : function(){
        this.glContext.useProgram(this.programId);
    }
};

/**** GLShader.js ****/

/**
 * 封装了Shader Redknot编写
 */
var GLShader = {

    glContext : null,
    type : null,
    source : null,

    shaderId : null,

    /**
     * Shader 的编译链接
     */
    Init : function(glContext,type,source){
        this.glContext = glContext,
        this.type = type;
        this.source = source;

        if (type == "vertex") {
            this.type = this.glContext.VERTEX_SHADER;
        } 
        else if (type == "fragment") {
            this.type = this.glContext.FRAGMENT_SHADER;
        }
        else {
            return;
        }

        this.shaderId = this.glContext.createShader(this.type);
        this.glContext.shaderSource(this.shaderId, this.source);
        this.glContext.compileShader(this.shaderId);

        var error = this.glContext.getShaderInfoLog(this.shaderId);
        if(error != ""){
            console.error(error);
        }
    }
};

/**** GLTexture.js ****/

var GLTexture = {

    glContext : null,
    textureId : null,

    /**
     * 构建Texture
     */
    Init : function(glContext,img,texUnit){
        this.glContext = glContext;

        this.textureId = this.glContext.createTexture();

        this.glContext.pixelStorei(this.glContext.UNPACK_FLIP_Y_WEBGL, 1);
        this.glContext.activeTexture(texUnit);
        this.glContext.bindTexture(this.glContext.TEXTURE_2D, this.textureId);

        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_MIN_FILTER, this.glContext.LINEAR);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_MAG_FILTER, this.glContext.LINEAR);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_WRAP_S, this.glContext.CLAMP_TO_EDGE);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_WRAP_T, this.glContext.CLAMP_TO_EDGE);

        this.glContext.texImage2D(this.glContext.TEXTURE_2D, 0, this.glContext.RGBA, this.glContext.RGBA, this.glContext.UNSIGNED_BYTE, img);
    } 
    
};

/**** Draw.js ****/

/**
 * 封装了一次绘制过程 Redknot编写
 */
var Draw = {

    glContext : null,
    program : null,
    indicesData : null,

    R : 1.0,
    G : 1.0,
    B : 1.0,
    A : 1.0,

    Init : function(glContext,program){
        this.glContext = glContext;
        this.program = program;
    },

    /**
     * 创建并绑定一个ARRAY_BUFFER
     */
    SetAttribute : function(name,data,size){
        var buffer = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, buffer);
        this.glContext.bufferData(this.glContext.ARRAY_BUFFER, data, this.glContext.STATIC_DRAW);

        var Location = this.glContext.getAttribLocation(this.program.programId,name);
        this.glContext.vertexAttribPointer(Location, size, this.glContext.FLOAT, false, 0, 0);
        this.glContext.enableVertexAttribArray(Location);
    },

    /**
     * 设置Float
     */
    SetUniformFloat : function(name,data){
        var floatLocation = this.glContext.getUniformLocation(this.program.programId, name);
        this.glContext.uniform1f(floatLocation, data);
    },

    /**
     * 设置绘制索引
     */
    SetElementIndex : function(data){
        this.indicesData = data;
        var buffer = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ELEMENT_ARRAY_BUFFER, buffer);
        this.glContext.bufferData(this.glContext.ELEMENT_ARRAY_BUFFER, data, this.glContext.STATIC_DRAW);
    },

    /**
     * 设置Texture
     */
    SetUniformTexture : function(name, texture, texUnit){
        this.glContext.bindTexture(this.glContext.TEXTURE_2D, texture.textureId);
        
        var texLocation = this.glContext.getUniformLocation(this.program.programId, name);
        this.glContext.uniform1i(texLocation, texUnit);
    },

    /**
     * 设置清屏颜色
     */
    SetClearColor : function(R,G,B,A){
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    },

    /**
     * 提交一次绘制
     */
    DoDraw : function(){
        this.glContext.clearColor(this.R, this.G, this.B, this.A);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);

        this.glContext.drawElements(this.glContext.TRIANGLES, this.indicesData.length, this.glContext.UNSIGNED_BYTE, 0);
    }
};

/**** ImageLoad.js ****/

var ImageLoad = {
    url : null,
    Init : function (url,rwi){
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = function() {
            rwi.CallBack(img)
        };
    }
};

/**** SimpleRwi.js ****/

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
