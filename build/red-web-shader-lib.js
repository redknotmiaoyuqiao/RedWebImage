/**** 创建时间为:2017-04-08 04:29:57 ****/

/**** Vertex ****/
var vertex_cameo = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_contrast = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_gray = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_inverse = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_wave = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
/**** Vertex ****/

/**** Fragment ****/
var fragment_cameo = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    vec2 TexSize = vec2(1.5,1.5);    vec2 tex = varyTexPos;    vec2 upLeftUV = vec2(tex.x-1.0/TexSize.x,tex.y-1.0/TexSize.y);    vec4 curColor = texture2D(mainTexture,varyTexPos);    vec4 upLeftColor = texture2D(mainTexture,upLeftUV);     vec4 delColor = curColor - upLeftColor;     float h = 0.3*delColor.x + 0.59*delColor.y + 0.11*delColor.z;    vec4 bkColor = vec4(0.5, 0.5, 0.5, 1.0);    gl_FragColor = vec4(h,h,h,0.0) +bkColor;}";
var fragment_contrast = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;float uT = 1.5;  void main(){    vec3 rgb = texture2D(mainTexture, varyTexPos).rgb;    vec3 target = vec3(0.0,0.0,0.0);      gl_FragColor = vec4(mix(target,rgb,uT),1.0); }";
var fragment_gray = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    vec4 rgb = texture2D(mainTexture, varyTexPos);    float gray = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;    gl_FragColor = vec4(gray, gray, gray, 1.0);}";
var fragment_inverse = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    vec4 rgb = texture2D(mainTexture, varyTexPos);    vec4 colorOut = vec4(1.0 - rgb.r, 1.0 - rgb.g, 1.0 - rgb.b, 1.0);    gl_FragColor = colorOut;}";
var fragment_wave = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;uniform float floatVal;void main(){    float stongth = 1.0;    vec2 uv = varyTexPos.xy;    float waveu = sin((uv.y + floatVal) * 20.0) * 0.5 * 0.05 * stongth;    gl_FragColor = texture2D(mainTexture, uv + vec2(waveu, waveu));}";
/**** Fragment ****/
