var ImageLoad = {
    url : null,
    Init : function (url,name,unit,rwi){
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = function() {
            rwi.ImgLoadCallBack(name,unit,img)
        };
    }
};