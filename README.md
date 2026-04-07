# 🧠 心理 AI 助手 - 管理后台

一个基于 Vue 3 + Element Plus 的心理健康 AI 助手管理平台，提供数据分析、知识文章管理、咨询记录、情绪日志等功能。

## ✨ 特性

- 🚀 **现代化技术栈**：Vue 3 + Vite + Element Plus
- 📊 **数据可视化**：ECharts 图表展示情绪趋势、用户活跃度等数据
- 💬 **AI 心理咨询**：集成 AI 对话功能，提供在线心理咨询服务
- 📝 **知识文章管理**：心理健康知识的创建、编辑、分类管理
- 📅 **咨询记录**：用户咨询会话的管理和查看
- 🎭 **情绪日志**：用户情绪记录的查看和分析
- 🔐 **权限管理**：完善的登录认证和权限控制
- 🎨 **响应式设计**：适配不同屏幕尺寸

## 🛠️ 技术栈

- **前端框架**：Vue 3.5.30
- **构建工具**：Vite 8.0.0
- **UI 组件库**：Element Plus 2.13.5
- **状态管理**：Pinia 3.0.4
- **路由管理**：Vue Router 4.6.4
- **HTTP 请求**：Axios 1.13.6
- **图表库**：ECharts 6.0.0
- **富文本编辑器**：WangEditor 5.1.23
- **CSS 预处理器**：Sass + Less
- **流式请求**：@microsoft/fetch-event-source

## 📦 项目结构

```
ai-vue/
├── src/
│   ├── api/              # API 接口定义
│   │   ├── admin.js      # 后台管理接口
│   │   └── frontend.js   # 前端用户接口
│   ├── assets/           # 静态资源
│   │   └── images/       # 图片资源
│   ├── components/       # 公共组件
│   │   ├── Sidebar.vue   # 侧边栏
│   │   ├── Navbar.vue    # 导航栏
│   │   ├── ArticleDialog.vue  # 文章弹窗
│   │   └── ...
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia 状态管理
│   ├── utils/            # 工具函数
│   │   └── request.js    # HTTP 请求封装
│   ├── views/            # 页面组件
│   │   ├── dashboard.vue        # 数据分析
│   │   ├── knowledge.vue        # 知识文章
│   │   ├── consultations.vue    # 咨询记录
│   │   ├── emotional.vue        # 情绪日志
│   │   ├── conultation.vue      # AI 咨询对话
│   │   ├── login.vue            # 登录
│   │   └── ...
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── public/             # 公共资源
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
└── README.md          # 项目说明
```

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 📱 功能模块

### 1. 数据分析 (Dashboard)
- 系统概览统计
- 情绪趋势分析图表
- 咨询会话统计
- 用户活跃度趋势

### 2. 知识文章管理
- 文章列表展示
- 文章创建/编辑/删除
- 文章分类管理
- 富文本编辑器支持

### 3. 咨询记录
- 用户咨询会话列表
- 会话详情查看
- 会话删除管理

### 4. 情绪日志
- 用户情绪记录列表
- 情绪数据分析
- 情绪趋势图表

### 5. AI 心理咨询
- 实时 AI 对话
- 流式响应展示
- 会话历史管理
- 情绪分析集成

## 🔧 环境配置

项目使用环境变量配置，后端 API 地址通过 Vite 代理配置：

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://159.75.169.224:1235',
      changeOrigin: true
    }
  }
}
```

## 🌐 部署

### 部署到 Vercel
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 部署到 Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## 📄 许可证

MIT License

## 👨‍💻 开发者

- GitHub: [@odn775](https://github.com/odn775/ai-vue)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：这是一个心理健康 AI 助手的管理后台系统，需要配合后端 API 服务使用。
