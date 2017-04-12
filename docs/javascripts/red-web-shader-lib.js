/**** 创建时间为:2017-04-12 23:37:40 ****/

/**** Vertex ****/
var vertex_aberration = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_brown = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_cameo = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_contrast = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_gaussian_blur = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_gray = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_inverse = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_polygonization = "";
var vertex_redgreen = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
var vertex_water = "";
var vertex_wave = "attribute vec2 pos;attribute vec2 texPos;varying vec2 varyTexPos;void main(){    gl_Position = vec4(pos.xy,0.0,1.0);    varyTexPos = texPos;}";
/**** Vertex ****/

/**** Fragment ****/
var fragment_aberration = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;uniform float iGlobalTime;void main(){    vec2 uv = varyTexPos.xy;	float amount = 0.0;		amount = (1.0 + sin(iGlobalTime*6.0)) * 0.5;	amount *= 1.0 + sin(iGlobalTime*16.0) * 0.5;	amount *= 1.0 + sin(iGlobalTime*19.0) * 0.5;	amount *= 1.0 + sin(iGlobalTime*27.0) * 0.5;	amount = pow(amount, 3.0);	amount *= 0.05;	    vec3 col;    col.r = texture2D( mainTexture, vec2(uv.x+amount,uv.y) ).r;    col.g = texture2D( mainTexture, uv ).g;    col.b = texture2D( mainTexture, vec2(uv.x-amount,uv.y) ).b;	col *= (1.0 - amount * 0.5);	    gl_FragColor = vec4(col,1.0);}";
var fragment_brown = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    mat4 brown = mat4(                    0.5, 0.4, 0.2, 0.0,                    0.4, 0.3, 0.2, 0.0,                    0.4, 0.3, 0.2, 0.0,                    0.0, 0.0, 0.0, 1.0);    vec4 rgb = texture2D(mainTexture, varyTexPos);    gl_FragColor = rgb * brown;}";
var fragment_cameo = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    vec2 TexSize = vec2(1.5,1.5);    vec2 tex = varyTexPos;    vec2 upLeftUV = vec2(tex.x-1.0/TexSize.x,tex.y-1.0/TexSize.y);    vec4 curColor = texture2D(mainTexture,varyTexPos);    vec4 upLeftColor = texture2D(mainTexture,upLeftUV);     vec4 delColor = curColor - upLeftColor;     float h = 0.3*delColor.x + 0.59*delColor.y + 0.11*delColor.z;    vec4 bkColor = vec4(0.5, 0.5, 0.5, 1.0);    gl_FragColor = vec4(h,h,h,0.0) +bkColor;}";
var fragment_contrast = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;float uT = 1.5;  void main(){    vec3 rgb = texture2D(mainTexture, varyTexPos).rgb;    vec3 target = vec3(0.0,0.0,0.0);      gl_FragColor = vec4(mix(target,rgb,uT),1.0); }";
var fragment_gaussian_blur = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    mat4 gray = mat4(                    0.3, 0.6, 0.1, 0.0,                    0.3, 0.6, 0.1, 0.0,                    0.3, 0.6, 0.1, 0.0,                    0.0, 0.0, 0.0, 1.0);    vec4 rgb = texture2D(mainTexture, varyTexPos);    gl_FragColor = rgb * gray;}";
var fragment_gray = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    mat4 gray = mat4(                    0.3, 0.6, 0.1, 0.0,                    0.3, 0.6, 0.1, 0.0,                    0.3, 0.6, 0.1, 0.0,                    0.0, 0.0, 0.0, 1.0);    vec4 rgb = texture2D(mainTexture, varyTexPos);    gl_FragColor = rgb * gray;}";
var fragment_inverse = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    vec4 rgb = texture2D(mainTexture, varyTexPos);    vec4 colorOut = vec4(1.0 - rgb.r, 1.0 - rgb.g, 1.0 - rgb.b, 1.0);    gl_FragColor = colorOut;}";
var fragment_polygonization = "";
var fragment_redgreen = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;void main(){    mat4 redgreen = mat4(                    0.0, 1.0, 0.0, 0.0,                    1.0, 0.0, 0.0, 0.0,                    0.0, 0.0, 1.0, 0.0,                    0.0, 0.0, 0.0, 1.0                    );    vec4 rgb = texture2D(mainTexture, varyTexPos);    gl_FragColor = rgb * redgreen;}";
var fragment_water = "";
var fragment_wave = "precision lowp float;varying vec2 varyTexPos;uniform sampler2D mainTexture;uniform float floatVal;void main(){    float stongth = 0.5;    vec2 uv = varyTexPos.xy;    float waveu = sin((uv.y + floatVal) * 20.0) * 0.5 * 0.05 * stongth;    gl_FragColor = texture2D(mainTexture, uv + vec2(waveu, 0.0));}";
/**** Fragment ****/
