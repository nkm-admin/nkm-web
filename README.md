# nkm后台管理系统初始化模版-web端

* 脚手架采取3.x，项目已配置vue-router + vuex + eslint + axios + element-ui + sass(scss)

* store、router已采取自动注入

## 安装项目依赖
```
yarn
or
npm install
```

### 启动项目
```
yarn start
or
npm run start
```

### 打包项目
```
yarn build
or
npm run build
```

### Lints and fixes files
```
yarn run lint
or
npm run lint
```

## 目录文件说明
* src：项目源码
   - api：存放所有的请求，按模块编写，入口文件为`index.js`
   - assets：静态文件目录
      1. scss：公用的scss文件，`variables.scss`已在全局引入，无需引入，每个页面都可以直接使用里面的变量
      1. images：图片资源
      1. svg-icon: 存放svg图标，文件名为调用名
   - components：公用组件目录，目录命名为大驼峰，自动注册
      1. 每个组件建立一个文件夹，文件夹名字采用大驼峰，组件入口为：`index.vue`，组件采取自动注册
      1. svg-icon: svg图标组件，已全局注册，调用方式：`<x-svg-icon icon-name="name"></x-svg-icon>`,`icon-name`传入`src/assets/svg-icon`目录下的文件名即可调用
   - directive：全局指令
   - filters：全局过滤器
   - modules：所有的业务页面，具体可参考系统管理部分
      1. 每个模块的`xxx.store.js`为vuex模块，无序引入，利用`require.context`完成自动注入，目录名为store模块名
      1. 每个模块的`xxx.router.js`为路由模块
   - pages：系统主要页面
      1. error：系统错误页面
      1. login：登录页面
      1. main：主题框架页面
   - router：项目主路由
   - store：vuex目录
   - utils：项目公用js和公用配置
      1. index.js：项目公用js和需要的配置
      1. axios.js：axios的一些基础配置
   - main.js：vue项目入口文件
   - style.scss：element-ui样式变量文件
* .env.development：开发环境变量文件
* .env.production：生产环境变量文件
* .env.test：测试环境变量文件
* vue.config.js：项目配置文件，具体使用说明可查看[https://cli.vuejs.org/zh/config/#vue-config-js](https://cli.vuejs.org/zh/config/#vue-config-js)

## 参考指南
* [vuejs风格指南查看](https://cn.vuejs.org/v2/style-guide/)
* [eslint风格指南](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)
* [css风格指南查看](https://codeguide.bootcss.com/#css)
* [Element-UI官网](http://element-cn.eleme.io/#/zh-CN/component/installation)
* 缩进为2个空格
