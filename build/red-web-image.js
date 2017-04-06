/**** 创建时间为:2017-04-06 09:10:55 ****/


/**** GLProgram.js ****/

/**
 * 封装了Program Redknot编写
 */
var GLProgram = {

    glContext : null,
    programId : null,
    shaderList : null,

    Init : function(glContext){
        this.glContext = glContext;
        this.programId = this.glContext.createProgram();
        this.shaderList = new Array();
    },

    AddShader : function(shader){
        this.shaderList.push(shader);
    },

    LinkProgram : function(){
        for(var i=0;i<this.shaderList.length;i++){
            this.glContext.attachShader(this.programId, this.shaderList[i].shaderId);
        }
        this.glContext.linkProgram(this.programId);
    },

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

/**** Draw.js ****/

/**
 * 封装了一次绘制过程 Redknot编写
 */
var Draw = {

    glContext : null,
    program : null,

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
     * 设置绘制索引
     */
    SetElementIndex : function(data){
        var buffer = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ELEMENT_ARRAY_BUFFER, buffer);
        this.glContext.bufferData(this.glContext.ELEMENT_ARRAY_BUFFER, data, this.glContext.STATIC_DRAW);
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

        var draw = Object.create(Draw);
        draw.Init(this.glContext,programV);

        var data = new Float32Array([-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0]);
        draw.SetAttribute("pos",data,2);

        var indicesData = new Uint8Array([0, 1, 2, 0, 2, 3]);
        draw.SetElementIndex(indicesData);

        this.glContext.clearColor(1.0,1.0,0.0,1.0);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);

        this.glContext.drawElements(this.glContext.TRIANGLES, indicesData.length, this.glContext.UNSIGNED_BYTE, 0);
    }
};
