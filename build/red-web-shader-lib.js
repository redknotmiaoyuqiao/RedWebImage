/**** 创建时间为:2017-04-08 03:21:12 ****/

/**** Vertex ****/
var vertex_gray = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_inverse = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_wave = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
/**** Vertex ****/

/**** Fragment ****/
var fragment_gray = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    vec4 rgb = texture2D(mainTexture, varyTexPos);    float gray = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;    gl_FragColor = vec4(gray, gray, gray, 1.0);}";
var fragment_inverse = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    vec4 rgb = texture2D(mainTexture, varyTexPos);    vec4 colorOut = vec4(1.0 - rgb.r, 1.0 - rgb.g, 1.0 - rgb.b, 1.0);    gl_FragColor = colorOut;}";
var fragment_wave = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;uniform float floatVal;void main(){    float stongth = 1.0;    vec2 uv = varyTexPos.xy;    float waveu = sin((uv.y + floatVal) * 20.0) * 0.5 * 0.05 * stongth;    gl_FragColor = texture2D(mainTexture, uv + vec2(waveu, waveu));}";
/**** Fragment ****/
