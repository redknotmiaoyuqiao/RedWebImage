var ShaderToyRwi = {

    canvasId : null,
    FilterName : null,

    glContext : null,

    draw : null,

    Init : function(canvasId,FilterName){
        this.canvasId = canvasId;
        this.FilterName = FilterName;

        var canvasElement = document.getElementById(canvasId);
        this.glContext = canvasElement.getContext("experimental-webgl") || canvasElement.getContext("experimental-webgl");

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


        
    }
};