var Filter = {

    context : null,
    name : null,
    program : null,

    Init : function(context,name){
        var vertexShaderSource = eval("vertex_" + name);
        var fragmentShaderSource = eval("fragment_" + name);

        this.context = context;

        this.program = Object.create(GLProgram);
        this.program.Init(this.context);

        var vertexShader = Object.create(GLShader);
        vertexShader.Init(this.context,this.context.VERTEX_SHADER,vertex_wave);
        vertexShader.CompileShader();
        var fragmentShader = Object.create(GLShader);
        fragmentShader.Init(this.context,this.context.FRAGMENT_SHADER,fragment_wave);
        fragmentShader.CompileShader();

        this.program.AddShader(vertexShader);
        this.program.AddShader(fragmentShader);

        this.program.LinkProgram();
    }
};