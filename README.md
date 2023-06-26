# *coder station* 前台系统笔记



## 准备工作



1. **启动服务器**

首先从资料拿到服务器的项目目录server(express+mongo)，进入项目根目录，安装依赖：

```js
npm i
```

启动服务器：

```js
npm start
```

如果看到控制台如下的输出：

```js
服务器端已启动，监听 7001 端口...
coderstation 数据库已经连接...
```

说明服务器已经启动成功。



2. **数据恢复**

在课件资料中，你还能看到提前准备好了一些数据，coderstationData，接下来可以将数据进行一个恢复。

首先需要你安装 *Mongodb*：*https://www.mongodb.com/*

![image-20221109142847200](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-062847.png)

接下来下载 mongodb

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-062943.png" alt="image-20221109142943156" style="zoom:50%;" />

*Mac* 系统建议放置到 /usr/local/mongodb

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-063106.png" alt="image-20221109143105682" style="zoom:50%;" />

要启动 mongodb，需要 bin 目录下面的 mongod

后期可能会用到很多其他的可执行文件

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-063207.png" alt="image-20221109143207171" style="zoom:50%;" />

新版本的 mongodb，有一个特点就是 bin 目录下面的可执行文件大大减少，如果想要补全，需要自己去官网下载，下载下来是一个压缩包，解压就会得到一堆可执行文件，放入到 *Mongodb* 安装目录的 *bin* 目录下面

![image-20221109143317367](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-063317.png)

启动 *Mongodb*，使用 *Mongod* 可执行文件

```js
./mongod -f 配置文件地址
例如：
./mongod -f /usr/local/mongodb/mongodb.conf
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-063605.png" alt="image-20221109143605101" style="zoom:50%;" />

配置文件的内容如下：

```js
systemLog:
  destination: file # 日志输出方式。file/syslog,如果是file，需指定path，默认是输出到标准输出流中
  path: /usr/local/mongodb/mongod.log  # 日志路径
  logAppend: true # 启动时，日志追加在已有日志文件内还是备份旧日志后，创建新文件记录日志, 默认false

net:
  port: 27017 # 监听端口，默认27017
  bindIp: 127.0.0.1 # 绑定监听的ip，设置为127.0.0.1时，只会监听本机
  maxIncomingConnections: 65536 # 最大连接数，可接受的连接数还受限于操作系统配置的最大连接数
  wireObjectCheck: true # 校验客户端的请求，防止错误的或无效BSON插入,多层文档嵌套的对象会有轻微性能影响,默认true

processManagement:
  fork: true  # 后台运行

security:
  authorization: disabled  # enabled/disabled # 开启客户端认证

storage:
  dbPath: /usr/local/mongodb/data # 数据库地址
```

> 注意：*Windows* 下面自带配置文件，后缀为 cfg，然后还有就是 *windows* 下面的配置文件的格式会有一些区别



建议安装一个数据库可视化工具，这个自由选择：

- *robo3t*
- *stduio3t*：基础功能是免费的，*https://studio3t.com/*
- *compass*：mongo 官方推出的可视化工具
- *navicat*



关于数据的恢复，这边需要使用到一个可执行命令，*mongorestore*，还需要保证 *mongodb* 的数据库服务器是启动起来的

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-064349.png" alt="image-20221109144349195" style="zoom:50%;" />

```js
mongorestore -h dbhost -d dbname --dir dbdirectory
例如：
./mongorestore -h localhost:27017 -d coderstation2 --dir /Users/jie/Desktop/coderstationData
```

如果你在恢复数据的时候，名字取了其他名字，服务器那边也需要修改成对应的名字：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-09-064932.png" alt="image-20221109144932400" style="zoom:50%;" />



## 项目笔记

1. 有关 *CSS*

当我们书写 *CSS* 的时候，如果 *CSS* 文件名包含 *module*，格式为 *xxx.module.css*，那么说明该 *CSS* 是一个局部的 *CSS* 样式文件，类似于 *vue* 组件里面的 *scoped*



2. *Icon*

如果要使用 *Icon*，*Antd* 为我们提供了很多实用的 *Icon*，对应的地址为：*https://ant.design/components/icon/*

每一个 *Icon*，使用之前需要引入，例如：

```js
import { UserOutlined } from "@ant-design/icons";
```



3. 请求转发

   1.简单配置代理，直接在package.json配置文件中添加proxy属性，值就为你要代理的目标服务器地址。

   2.在 *src* 目录下面新建一个 *setupProxy* 的文件，在该文件中进行请求转发的配置在使用的时候，还需要安装一个插件 *http-proxy-middleware*，配置示例如下：

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app){
    app.use(createProxyMiddleware("/res", {
        target: "http://127.0.0.1:7001",
        changeOrigin : true
    }),createProxyMiddleware("/api", {
        target: "http://127.0.0.1:7001",
        changeOrigin : true
    }),createProxyMiddleware("/static", {
        target: "http://127.0.0.1:7001",
        changeOrigin : true
    }))
}
```



4. 如何渲染出 *svg* 图片

之前在使用 *vue* 做个人博客的时候，如果想要渲染一段 *html* 或者 *svg*，需要使用 *v-html*

在 *react* 中，可以通过如下的方式：

```react
 <div dangerouslySetInnerHTML={{ __html: captcha }}></div>
```



5. 关于 *redux* 中将异步获取到的数据填充到状态仓库

之前我们介绍了一种方式，是通过 *action* 来派发一个 *reducer* 从而实现状态填充。例如之前所写学生管理系统：

```js
export const updateUserInfoAsync =   createAsyncThunk('user/updateUserInfo',
    async (payload,thunkAPi) =>{
        // console.log(payload,'数据');
  			//发送ajax请求
        await updateUserInfo(payload.userId,payload.newUserInfo);
       	const {data} = await userInfoById(payload.userId)
       	//派发更新
        thunkAPi.dispatch(updateUser(data))
    }
)
```

也可以使用 *redux-toolkit* 官网所示例的方式：

```js

export const fetchTypeList = createAsyncThunk('type/fetchTypeList',
    async (_,thunkApi) =>{
        // console.log("_>>>>>",_); //dispatch触发调用传入的参数
        // console.log('thunkApi>>>',thunkApi);   //当前切片对象，里头有dispatch方法
        const {data} = await getType();
        //方法一配合dispatch，reducer使用
        // thunkApi.dispatch(setTypeList(data))  
        //方法二
  			// 填充返回的数据到状态仓库
        return data;
    }
)

// ....

		// 专门处理异步的 reducer
		//方法一，即将弃用
    // extraReducers:{
    //     [fetchTypeList.fulfilled](state,{payload}){
    //         state.typeList = payload;
    //     }
    // },
    //方法二，builder对象调用action
    extraReducers(builder){
        builder.addCase(fetchTypeList.fulfilled,(state,{payload})=>{
            state.typeList = payload;
        })
    }

```



6. 关于使用自定义图标字体

首先可以在 *iconfont* 上面下载你喜欢的图标字体：*https://www.iconfont.cn/*

选择了需要下载的图标字体后，添加到购物车，之后可以选择下载代码

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-11-064915.png" alt="image-20221111144914697" style="zoom:50%;" />

下载完成后，是一个压缩包，解压之后会得到一些 *CSS、JS、ttf* 一类的文件，首先我们需要将 *ttf* 字体文件添加到我们的项目中

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-11-065018.png" alt="image-20221111145017874" style="zoom:50%;" />

还需要将一些样式放置到我们的项目中，注意，需要将 *src* 中的 *url* 路径进行一下修改

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-11-065229.png" alt="image-20221111145228623" style="zoom:50%;" />

修改完之后，就可以在我们的代码中使用这些样式类，例如：

```html
<span class="iconfont iconfont-jiangbei"></span>
```



7. 关于 *markdown* 的编辑器

我们在项目中会频繁的使用到 *markdown* 的编辑器，我们使用的是 *toast-ui edior*，官网地址：*https://ui.toast.com/tui-editor/*

我们这一次会使用到的是 *react* 版本的编辑器，可以参阅如下链接：

- 关于 *react markdown* 编辑器的使用：*https://github.com/nhn/tui.editor/tree/master/apps/react-editor*
- 详细的配置项目：*https://nhn.github.io/tui.editor/latest/ToastUIEditor#focus*

大家在安装这个编辑器的时候，会遇到一个问题，如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-11-072713.png" alt="image-20221111152713064" style="zoom:50%;" />

该问题的出现是因为该插件内部仍然依赖 *React 17* 版本，解决方式也很简单，直接强制安装即可：

```js
npm install --save @toast-ui/react-editor --force
```

添加 *--force* 参数表示强制安装。



8. 关于使用 *toast-ui markdown editor* 时生成 *source map* 文件失败

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-11-120547.png" alt="image-20221111200546585" style="zoom:50%;" />

出现该问题的根源在于找不到 *purify.js.map* 文件，解决方案参考了 *https://github.com/nhn/tui.editor/issues/2137*

最直接的方案就是不生成 *sourcemap* 文件

```js
"start": "GENERATE_SOURCEMAP=false node scripts/start.js",
```



9. Cross-Origin Read Blocking (CORB) 已屏蔽 MIME 类型为 text/html 的跨域响应

![image-20221112105645409](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-12-025645.png)

参阅官网：

- *https://chromium.googlesource.com/chromium/src/+/refs/heads/main/services/network/cross_origin_read_blocking_explainer.md*
- *https://chromestatus.com/feature/5629709824032768*

简单来讲，这是一种新的 *Web* 平台安全功能，*CORB* 的目的是防止浏览器向网页接收某些跨源网络响应，因为这些响应可能包含敏感信息，而且现有的网页功能不需要这些响应。

**什么样的内容会被 *CORB-protected* ？**

当跨域请求回来的数据 *MIME type* 同跨域标签应有的 *MIME* 类型不匹配时，浏览器会启动 *CORB* 保护数据不被泄漏.
例如: *script* 标签请求的响应是 *json*. *img* 标签请求回来的是 *json*.

**如何解决？**

如果是请求我们自己的服务器出现这样的问题，那就调整服务器的 *MIME* 信息。





