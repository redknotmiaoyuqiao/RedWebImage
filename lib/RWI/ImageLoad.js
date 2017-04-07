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