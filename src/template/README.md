# x7-manage-vue3

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# 环境准备

```
node>16.x.x

```

# 项目开发规范

### 前端安装依赖工具优先级:pnpm->yarn->npm

### 项目说明

- 项目开发中，涉及到调用后端 api 数据统一归集到 apiService 目录下，根据业务模块可以在该目录下新建目录归集 api 请求。例如参考：apiService/userInfo

> 注意：api 请求统一归集到 apiService 目录下

- 项目中 elementui-plus 或者 vant-ui(响应式设计根据业务确实需要引入 H5 的 ui 插件的酌情引入，必须按需引入方式引入) 插件统一使用按需加载，该项目使用插件自动按需导入 ui 组件，无需再手动导入 ui 插件

- 项目开发过程定义路由统一使用路由懒加载方式导入

- 项目开发过程中，视图（views）下 vue 组件导入公共组件时统一按异步组件导入；异步组件参考[vue 异步组件教程](https://cn.vuejs.org/guide/components/async.html)

```
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})

```

- 项目开发过程中，图片统一约束使用图片懒加载;已封装图片懒加载自定义指令在文件夹 directives/common.js 下，在 vue 单文件组件使用如下

```
<img v-lazy="logo"
       alt="">
```

- 项目开发图片统一使用 svg 图标组件替代图片使用,使用方式查看 demo 路由演示页面。

- 使用第三方插件库尽量使用体积小的插件库

- 项目开发过程中，UI 的图标或者没有渐变色的图片以 svg 的格式下载下来，统一上传到阿里巴巴字体图标转字体使用；使用阿里巴巴字体图标需自己创建账由管理员添加到项目中。阿里巴巴字体图标需要下载到项目本地使用。

> ps:注意不要使用阿里链接

- 根据业务需要或者安全需求项目开发跟后端数据交互，协调确认接口是否加密验签

> warning:前端开发共同按这个约束自己

### 项目中 PWA 和 axios 封装说明

- 文件 apiService/http.js 中已添加支持取消重复请求功能;如果需要开启只需要调用接口时传入配置{cancelRequest:true}即可,详情参考[ricardo 的 btools](https://lqs5858.github.io/bt-tools/bt-tools/1.2.4/),例如：

```
this.$http.post('xx',data,{cancelRequest:true})
```

- 文件 apiService/http.js 中已添加支持取消重复请求；只需要调用接口时传入配置{cancelRequest:true}即可,详情参考文档[ricardo 的 bt-tools](https://lqs5858.github.io/bt-tools/bt-tools/1.2.4/),例如：

```
  $http.post('xx',data,{cancelRequest:true})

```

### 代码格式规范

- 项目中使用 eslint 代码约束审查，如果有特殊场景需要禁用 eslint 检查，建议局部禁用，禁止全局禁用 eslint；

- 为了保证代码风格不会相差太大，如果使用的 vscode 编辑器，建议统一使用 ricardo 提供的 setting.json 配置文件（包含 html 和 js 格式美化）+安装插件 volar+vetur+pritter，以确保开发过程格式化代码风格统一，方便后期项目维护和减少冲突

Example:

```json
{
  "git.autofetch": true,
  "editor.fontSize": 18,
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "files.autoSave": "afterDelay", //自动保存
  "vetur.format.defaultFormatter.html": "js-beautify-html", //html属性美化
  //新增
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur" // 使用 vetur 格式化规则
  },
  "vetur.format.defaultFormatterOptions": {
    //解决elint报字符串必须单引号问题
    "prettier": {
      "semi": false, //代码末尾加分号
      "singleQuote": true // js单引号
    },
    "js-beautify-html": {
      "wrap_attributes": "force-aligned" // 可以换成上面任意一种value
    }
  },
  // table自动补全html
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
  },
  "editor.snippetSuggestions": "top",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "workbench.colorTheme": "Atom One Light",
  "workbench.colorCustomizations": {
    "[Atom One Light]": {
      "editor.background": "#C7EDCC",
      "sideBar.background": "#C7EDCC",
      "activityBar.background": "#C7EDCC"
    }
  },
  "terminal.integrated.shell.osx": "/bin/sh",
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "editor.formatOnSave": true,
  "window.zoomLevel": 0,
  "dart.debugExternalLibraries": true,
  "dart.debugSdkLibraries": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "diffEditor.ignoreTrimWhitespace": false,
  "gitlens.hovers.currentLine.over": "line",
  "eslint.autoFixOnSave": true,
  "editor.tabSize": 2,
  "git.path": "D:Program FilesGitcmdgit.exe",
  "git.confirmSync": false
}
```

> warnging: 禁止全局禁用 eslint 根据业务需要可局部禁用 eslint

### 项目命名规范

- 项目中如果是 vue 单文件组件或者是视图（views）下文件夹/单文件组件，换句话说凡是 vue 文件或者 vue 目录，统一使用'-'横杠命名;

- 项目中如果是 js 文件或者是工具函数文件夹（utils）下 js 文件，换句话说就是凡是 js 文件或者 js 目录，统一使用小驼峰命名,如：'testName'

- 项目中样式类或 id 命名统一使用'-'横杠命名

> warning: vue 单文件组件，统一使用'-'横杠命名

### 项目分支管理规范

- 分支：'master'-该分支为主分支，禁止在主分支开发提交代码;当新功能开发测试通过后将代码合并到主分支发布生产

- 分支名：'test'->该分支为固定的提交测试分支,该分支原则上不做开发分支;开发迭代功能开发好之后,代码合并到测试分支提交测试

- 预发布分支：'uat'->该分支为固定预发布分支，禁止在该分支开发和提交代码，开发迭代功能开发好之后,代码合并到预发布分支发布预发布环境

- 新增功能开发，统一从 master 拉取新分支，新分支命名统一以'gitlab 注册名字-语义化'命名,分支命名确保语义化,让人一看就明白该分支的意义

> warning: 严禁在 master 分支开发提交代码，master 分支只用作发布生产；严禁在 test 分支开发提交代码，test 分支只用作提交测试发布

### 项目 CI/CD

- 仓库分支 test 配置 CI/CD 自动构建，自动发布测试环境测试验证

- 仓库分支 uat 配置 CI/CD 自动构建，自动发布验收环境验收

### 响应式 pc/h5/ipad 设计

- 响应式设计使用 vue 的命名视图结合 css3 的媒体查询实现；页面如果布局变化较少简单换行则使用 css3 媒体查询，如果布局变化很大则利用 vue 的命名视图渲染不同的 UI 组件(js&css 复用)。页面细微处微调通过 store 内的 screenSize 变量控制样式和 js

- 关于响应式设计 UI 插件使用，根据业务需要确实需要引入 h5 插件的可以引入 vantui 插件(但是前提是必须按需引入)

- 响应式设计采用固定像素 px 非 rem（纯 h5 项目会采用 rem） 屏幕适配
