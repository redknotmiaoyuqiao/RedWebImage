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