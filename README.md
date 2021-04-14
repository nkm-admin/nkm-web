# nkm后台管理系统-web端

* 测试账号：testAdmin/nkm-123456
* 脚手架采取3.x，项目已配置vue-router + vuex + eslint + axios + element-ui + sass(scss)
* store、router已采取自动注入
* 服务端仓库地址：[https://github.com/nkm-admin/nkm-server-ts](https://github.com/nkm-admin/nkm-server-ts)

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
```
nkm-admin-client
├─.browserslistrc
├─.editorconfig
├─.env.development // 开发环境变量
├─.env.production // 生产环境变量
├─.env.test // 测试环境变量
├─.eslintignore
├─.eslintrc.js
├─.postcssrc.js
├─LICENSE
├─README.md
├─babel.settings.js
├─jsconfig.json
├─package.json
├─vue.settings.js
├─yarn.lock
├─src
|  ├─App.vue
|  ├─settingssettings.js // 项目主要默认配置文件
|  ├─main.js
|  ├─utils // 公用工具类
|  |   ├─const.js
|  |   ├─cookie.js
|  |   ├─crypto.js
|  |   ├─index.js
|  |   └regexp.js
|  ├─store
|  |   ├─getters.js
|  |   ├─index.js
|  |   ├─modules
|  |   |    ├─authen.js
|  |   |    └widget.js
|  ├─router
|  |   └index.js
|  ├─request
|  |    └index.js
|  ├─pages
|  |   ├─main
|  |   |  ├─index.vue
|  |   |  ├─components
|  |   |  |     ├─BreadCrumb.vue
|  |   |  |     ├─Menu
|  |   |  |     |  ├─index.vue
|  |   |  |     |  └menuItem.vue
|  |   ├─login // 登录页
|  |   |   ├─index.vue
|  |   |   └login.router.js
|  |   ├─error // 系统错误页面
|  |   |   ├─error.router.js
|  |   |   ├─error.scss
|  |   |   ├─forbidden.vue
|  |   |   └notFound.vue
|  ├─modules // 所有业务页面，具体可参考系统管理部分
|  |    ├─system // 系统管理
|  |    |   ├─system.router.js
|  |    |   ├─user // 用户管理
|  |    |   |  ├─.router.js
|  |    |   |  ├─index.vue
|  |    |   |  ├─user.store.js
|  |    |   |  ├─components
|  |    |   |  |     └registered.vue
|  |    |   ├─role // 角色管理
|  |    |   |  ├─.router.js
|  |    |   |  ├─index.vue
|  |    |   |  └role.store.js
|  |    |   ├─resource // 资源管理
|  |    |   |    ├─.router.js
|  |    |   |    ├─index.vue
|  |    |   |    ├─resource.store.js
|  |    |   |    ├─components
|  |    |   |    |     └edit.vue
|  |    |   ├─dictionary  // 数据字典
|  |    |   |     ├─.router.js
|  |    |   |     ├─dictionary.store.js
|  |    |   |     └index.vue
|  |    ├─personalCenter  // 个人中心
|  |    |       ├─index.vue
|  |    |       ├─personal.router.js
|  |    |       ├─personal.store.js
|  |    |       ├─components
|  |    |       |     ├─information.vue
|  |    |       |     └security.vue
|  |    ├─dashboard  // 仪表盘
|  |    |     ├─dashboard.router.js
|  |    |     └index.vue
|  ├─filters // 全局指令
|  |    └index.js
|  ├─directive // 全局过滤器
|  |     └index.js
|  ├─components
|  |     ├─XDialog.vue
|  |     ├─XDotTag.vue
|  |     ├─index.js
|  |     ├─XTableContainer  // 布局组件
|  |     |        └index.vue
|  |     ├─XSvgIcon
|  |     |    ├─index.js
|  |     |    └index.vue
|  |     ├─XPagination
|  |     |      └index.vue
|  |     ├─XIcon
|  |     |   └index.vue
|  ├─assets
|  |   ├─svg-icon // svg图标
|  |   |    ├─icon-403-color.svg
|  |   |    ├─icon-404-color.svg
|  |   |    ├─icon-500-color.svg
|  |   |    └qq.svg
|  |   ├─scss // 项目公用scss
|  |   |  ├─class.scss
|  |   |  ├─element-ui-reset.scss
|  |   |  ├─global.scss
|  |   |  ├─iconfont.scss
|  |   |  ├─index.scss
|  |   |  ├─reset.scss
|  |   |  └variables.scss
|  |   ├─images
|  ├─api // 项目所有请求目录
|  |  ├─index.js
|  |  ├─personalCenter.js
|  |  ├─system
|  |  |   ├─dictionary.js
|  |  |   ├─resource.js
|  |  |   ├─role.js
|  |  |   └user.js
├─public
|   ├─favicon.ico
|   └index.html
```
### 其他目录说明
- assets：静态文件目录
  1. scss：公用的scss文件，`variables.scss`已在全局引入，无需引入，每个页面都可以直接使用里面的变量
  1. svg-icon: 存放svg图标，文件名为调用名
- components：公用组件目录，目录命名为大驼峰，自动注册
  1. 每个组件建立一个文件夹，文件夹名字采用大驼峰，组件入口为：`index.vue`，组件采取自动注册
  1. svg-icon: svg图标组件，已全局注册，调用方式：`<x-svg-icon icon-name="name"></x-svg-icon>`,`icon-name`传入`src/assets/svg-icon`目录下的文件名即可调用
- modules：
  1. 每个模块的`xxx.store.js`为vuex模块，无序引入，利用`require.context`完成自动注入，目录名为store模块名
  1. 每个模块的`xxx.router.js`为路由模块
* vue.settings.js：项目配置文件，具体使用说明可查看[https://cli.vuejs.org/zh/config/#vue-config-js](https://cli.vuejs.org/zh/config/#vue-config-js)

## 参考指南
* [vuejs风格指南查看](https://cn.vuejs.org/v2/style-guide/)
* [eslint风格指南](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)
* [css风格指南查看](https://codeguide.bootcss.com/#css)
* [Element-UI官网](http://element-cn.eleme.io/#/zh-CN/component/installation)
