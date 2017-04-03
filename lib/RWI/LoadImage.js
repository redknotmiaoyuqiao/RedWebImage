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