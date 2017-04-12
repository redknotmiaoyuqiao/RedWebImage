/**
 * 封装了 OpenGL 的 Context
 */

var GLContext = {

    glContext : null,
    docCanvas : null,

    Init : function(canvasId){
        this.docCanvas = document.getElementById(canvasId);

        this.glContext = this.docCanvas.getContext("experimental-webgl") || this.docCanvas.getContext("experimental-webgl");
    }
};