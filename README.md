# RedWebImage

#### Demo [演示](https://redknotmiaoyuqiao.github.io/RedWebImage/index.html "主页")

这是一个很有意思的项目，基于 WebGL 的滤镜系统，我们将使用 OpenGL ES 作为硬件加速，做一个高性能的 img 标签。你可以使用这个 img 标签完成非常多，非常炫酷的效果，例如，动态的高斯模糊，漩涡效果等。

#### 我们的小工具
- 使用默认Shader：我们默认写了一些Shader，这些Shader放在了 /shader 文件夹之下。我们在发布的时候，把这些文件的内容写成了 js 的变量，在 /build/red-web-shader-lib.js 里面，其实就是把这些文件的内容用引号阔了起来。你如果想使用，直接在你的 Html 页面里引入这个 js 文件就行了。

- 自定义Shader：如果你觉得我写的 Shader 太差劲，或者你想要什么新的效果，需要自己写 Shader ，那么也很容易。/shader 文件夹之下有两个文件夹 Fragment 和 Vertex 。你直接把你需要的 Shader 写进去就好了，注意，文件不要加后缀，开头也不要以数字什么的开头，因为我们的工具会把你的文件名当成变量名。写好之后，就可以用我们的工具把 Shader 文件变成 js 的变量，写到 /build/red-web-shader-lib.js 里面。

- 我们的工具是这个，/build.jar ，这是一个 Java 写的小工具，所以需要你的电脑安装 jre ，最好是 Java8 ，写好自己的的 Shader 以后，你就可以用这个工具了
````
java -jar build.jar shader
````
用这行命令就可以了。这行命令会把原先的 /build/red-web-shader-lib.js 删除掉，然后根据 /shader 下的内容，重新生成一个。

- 使用的时候，要引入 /build 下面的两个 js 文件，我们的小工具除了把 Shader 文件写入 /build/red-web-shader-lib.js 中之外，还有一个功能是把我们的源文件写入 /build/red-web-image.js 里面。我们的项目源码在 /lib 文件夹之下，如果你改变了我们的项目源码，那么你可能需要下面这个命令。
````
java -jar build.jar all
````

#### 使用指南

- 使用 SimpleRwi : 我们目前提供了一个简单的接口类，这个类会加载一个固定的 Vertex Shader ，这个 Shader 是 /shader/Vertex/base，然后你要指定一个 Fragment Shader 。这个类会默认传入两个 Attribute 变量，分别是代表矩形四个点的 pos ，然后是代表纹理坐标的 texPos。这个类还会传入两个 Uniform 变量，一个是代表 Canvas 大小的 vec3 变量 resolution ，其中 resolution 的 x 和 y 代表长和宽，z 的值是 1.0。另一个 Uniform 变量是 globalTime ，是一个时间戳。你可以设置一个定时器，然后不断传这个值，这样就可以实现动画了。

````
var SobelImage = Object.create(SimpleRwi);
//第一个参数是Canvas的id，第二个是 Fragment Shader 的名字
SobelImage.Init("SobelImage", "sobel");

//传入一个 Float 类型的 Uniform 变量
SobelImage.draw.SetUniformFloat("r", 1.0);

//传入一张图片
var imageload = Object.create(ImageLoad);
//第一个参数是图片URl，支持跨域，第二个是 Uniform 变量名，第三个是相应的 SimpleRwi 对象
ImageLoad.Init(img_src, "iChannel0", 1, SobelImage);
````

#### License

    The MIT License (MIT)

    Copyright (c) Safety System Technology

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included
    in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
    FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
    ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
