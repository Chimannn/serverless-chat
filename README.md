
## 10分钟完成一个无服务端的实时聊天室搭建

- 基于ChatEngine.io服务
- Vue3 + Vite 搭建工程
- 引入 react-chat-engine-pretty 快速实现聊天界面
- 引入 veaury 让上述的React包能在Vue工程内运行

#### 1.使用Vite创建Vue工程及npm安装相应包

```javascript
npm install vite@latest
...
npm install axios react-chat-engine-pretty veaury
```

#### 2.创建登录注册页以及聊天室页

```
src/
├── App.vue
├── assets
├── main.js
├── pages
│   ├── AuthPage
│   │   ├── api.js
│   │   └── index.vue
│   └── ChatsPage
│       └── index.vue
└── style.css
```

#### 3.将登录接口连接到ChatEngine.io服务
- 先去到<a href="https://chatengine.io">chatengine官网</a>注册你的个人账户
- 创建项目，获得 "Project ID" 和 "Private Key"
- 然后在api.js文件配置接口

> 至此已实现登录页的登录与注册功能

#### 4.聊天室页的搭建

- 引入 react-chat-engine-pretty 和 veaury

```javascript
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";

components: {
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
},
```
```html
<PrettyChatWindow
    :projectId="state.projectId"
    :username="username"
    :secret="secret"
/>
```

#### 5.运行： npm run dev

### Done✅