/****
 * 单张图片，单次处理的简单Image
****/
var SimpleImage = {

    canvasId : null,
    context : null,

    mainTexture : null,

    draw : null,

    Init : function(canvasId){
        this.canvasId = canvasId;

        var canvasElement = document.getElementById(this.canvasId);
        this.context = canvasElement.getContext('webgl' || 'experimental-webgl');



        
        var program = Object.create(GLProgram);
        program.Init(this.context);
        program.LinkProgram();

        draw = Object.create(Draw);
        draw.Init(this.context,program);
    },

    SetImageUrl : function(imgUrl){
        var imageLoad = Object.create(LoadImage);
        imageLoad.Load(imgUrl,this);
    },

    ImageCallBack : function(img){
        //构建mainTexture
        var texture = Object.create(GLTexture);
        texture.Init(this.context);
        texture.SetImage(img,this.context.TEXTURE0);

        this.mainTexture = texture;


        draw.SetBackgroundColor(1.0, 0.0, 0.0, 1.0);
        draw.DoDraw();
    }
}