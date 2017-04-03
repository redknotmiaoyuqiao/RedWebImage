/**** 创建时间：2017-04-04 06:31:06 ****/

/**** GLBuffer.js ****/

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

/**** GLProgram.js ****/

var GLProgram = {
    programId : null,
    context : null,
    shaderList : new Array(),

    Init : function(context){
        this.context = context;
        this.programId = this.context.createProgram();
    },

    AddShader : function(shader){
        this.shaderList.push(shader.shaderId);
    },

    LinkProgram : function(){
        for(var i=0;i<this.shaderList.length;i++){
            this.context.attachShader(this.programId, this.shaderList[i]);
        }
        this.context.linkProgram(this.programId);
    },

    UseProgram : function(){
        this.context.useProgram(this.programId);
    }
};

/**** GLShader.js ****/

var GLShader = {

    shaderId : null,
    context : null,
    source : null,

    Init : function(context,shaderType){
        this.context = context;
        this.shaderId = this.context.createShader(shaderType);
    },

    Init : function(context,shaderType,source){
        this.context = context;
        this.shaderId = this.context.createShader(shaderType);
        this.source = source;
        this.context.shaderSource(this.shaderId, this.source);
    },

    SetSourceByText : function(source){
        this.source = source;
        this.context.shaderSource(this.shaderId, this.source);
    },

    CompileShader : function(){
         this.context.compileShader(this.shaderId);
         var error = this.context.getShaderInfoLog(this.shaderId);
         if(error != ""){
             console.error(error);
         }
    }
};

/**** GLTexture.js ****/

var GLTexture = {
    textureId : null,
    context : null,
    texUnit : null,

    Init : function(context){
        this.context = context;
        this.textureId = this.context.createTexture();
    },

    SetImage : function(img,texUnit){
        this.texUnit = texUnit;
        
        this.context.pixelStorei(this.context.UNPACK_FLIP_Y_WEBGL, 1);
        this.context.activeTexture(texUnit);
        this.context.bindTexture(this.context.TEXTURE_2D, this.textureId);

        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.LINEAR);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.LINEAR);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);

        this.context.texImage2D(this.context.TEXTURE_2D, 0, this.context.RGBA, this.context.RGBA, this.context.UNSIGNED_BYTE, img);
    }
};

/**** Draw.js ****/

var Draw = {
    context : null,
    program : null,

    indexBuffer : null, 

    backgroundR : 1.0,
    backgroundG : 1.0,
    backgroundB : 1.0,
    backgroundA : 1.0,

    Init : function(context,program){
        this.context = context;
        this.program = program;

        this.program.UseProgram();

        var indicesData = new Uint8Array([0, 1, 2, 0, 2, 3]);
        this.indexBuffer = Object.create(GLBuffer);
        this.indexBuffer.Init(this.context);
        this.indexBuffer.SetBufferData(indicesData,this.context.ELEMENT_ARRAY_BUFFER);
    },

    SetElementIndex : function(indexBuffer){
        this.indexBuffer = indexBuffer;
    },

    SetAttribute : function(name, buffer){
        this.context.bindBuffer(buffer.bufferType, buffer.bufferId);

        var Location = this.context.getAttribLocation(this.program.programId,name);
        this.context.vertexAttribPointer(Location, buffer.size, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(Location);
    },

    SetUniformTexture : function(name, texture){
        this.context.bindTexture(this.context.TEXTURE_2D, texture.textureId);
        var texLocation = this.context.getUniformLocation(this.program.programId, name);
        this.context.uniform1i(texLocation, 0);
    },

    SetBackgroundColor : function(R,G,B,A){
        this.backgroundR = R;
        this.backgroundG = G;
        this.backgroundB = B;
        this.backgroundA = A;
    },

    DoDraw : function(){
        this.program.UseProgram();

        this.context.clearColor(this.backgroundR,this.backgroundG,this.backgroundB,this.backgroundA);
        this.context.clear(this.context.COLOR_BUFFER_BIT);

        this.context.drawElements(this.context.TRIANGLES, this.indexBuffer.data.length, this.context.UNSIGNED_BYTE, 0);
    }
};

/**** LoadImage.js ****/

var LoadImage = {

    src : null,
    context : null,

    Load : function(src,object){
        this.src = src;
        
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.src;
        img.onload = function() {
            object.ImageCallBack(img);
        };
    }
};

/**** SimpleImage.js ****/

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
        vertexShader.Init(this.context,this.context.VERTEX_SHADER,document.getElementById("vshader").textContent);
        vertexShader.CompileShader();
        fragmentShader = Object.create(GLShader);
        fragmentShader.Init(this.context,this.context.FRAGMENT_SHADER,document.getElementById("fshader").textContent);
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
