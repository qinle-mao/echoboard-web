### 1. Create Vue Project

``` shell
npm install -g @vue/cli
vue create <project_name>
cd <project_name>
```
### 2. Reorganize Repositories
Show the current file structure:
``` shell
npm install mddir -g
mddir
```
The new `web` project structure:

``` 
|-- web
    |-- .gitignore
    |-- babel.config.js
    |-- jsconfig.json
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- vue.config.js
    |-- mock
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- api
        |-- assets
        |   |-- fonts
        |   |-- imgs
        |-- components
        |-- router
        |-- store
        |-- styles
        |-- utils
        |-- views
    |-- static
```
### 3. Add Packages & Basic Initialization
``` shell
npm install vue-router --save
```

```shell
npm install vuex@next --save
```

```shell
npm install less less-loader --save
```

```shell
npm install axios vue-axios --save
```

```shell
npm install lottie-web --save
```

```shell
npm install async-mutex --save
```
### 4. Define Global Style

style reference: https://gitee.com/ant-design/ant-design

Create `less` file - `./styles/common.less`, then add global reference:

```shell
npm install style-resources-loader vue-cli-plugin-style-resources-loader --save
```

in `vue.config.js`, add:

```js
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/commons.less')]
    }
  }
}
```

### 5. Import Font Icons

Use icon font: https://www.iconfont.cn/,

download the project to `./assets/fonts/icon`.

```vue
<!-- current way -->
<style>
    @import '../assets/fonts/icons/iconfont.css';
</style>
<span class="iconfont icon-xxx"></span>

<!-- better way, but errors to be solved -->
<script src="../assets/fonts/icons/iconfont.js"></script>
<style>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
<template>
    <svg class="icon" aria-hidden="true">
    	<use xlink:href="#icon-xxx"></use>
	</svg>
</template>
```

```
.icon-right
.icon-left
.icon-close
.icon-heart
.icon-discussion
.icon-add
.icon-error-fill
.icon-info-fill
.icon-success-fill
```

### 6. Views Organization

```
|-- EchoBoard
    |-- MessageBoard
    |   |-- NewCard
    |   |-- CardDetail
    |   |-- NoteCard
    |   |-- PhotoCard
    |-- TopBar
    |-- FootBar
|-- Other Components
	|-- BoardButton
	|-- BoardModal
	|-- BoardViewer
```

### 7. Create Components

#### 7.1 TopBar

```vue
<template>
    <div class="top-bar">
        <!-- contents  -->
    </div>
</template>
```

then register it to routes

#### 7.2 BoardButton



#### 7.3 BottomBar



#### 7.4 MessageCard

flex grammar: https://www.runoob.com/w3cnote/flex-grammar.html

justify content: https://www.runoob.com/cssref/css3-pr-justify-content.html

fonts download: https://www.fonts.net.cn/fonts-zh-1.html

```less
<style>
@font-face {
    font-family: <font_name>;
    src: url('font_path');
}
</style>
```

grid grammar

#### 7.5 PopUp

setup grammar

css transition

### 8. Mock Data Simulation

```shell
npm install mockjs --save
```
### Define API
utils -> env.js, utils -> axios.js, api -> index.js

### Lottei Animation
https://lottiefiles.com/featured lottie-web