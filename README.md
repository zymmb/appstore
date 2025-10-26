# App Store

这是一个基于 JavaScript 的静态应用商店项目，部署在 GitHub Pages 上。

## 部署指南

1. 将项目代码推送到 GitHub 仓库。
2. 在仓库设置中启用 GitHub Pages。
3. 数据将通过 GitHub Actions 自动缓存到 `data/apps.json`。


4. 访问 `<your-github-username>.github.io/<your-repo-name>` 查看项目。


# 静态应用商店

这是一个基于JavaScript的静态应用商店项目，可以部署在GitHub Pages上。

## 功能特性

- 应用列表展示
- 搜索和过滤功能
- 分类浏览
- 响应式设计

## 项目结构
```bash
app-store/
├── index.html # 主页面
├── styles.css # 样式文件
├── script.js # 主要逻辑
├── data/
│ └── apps.json # 应用数据存储
├── .github/
│ └── workflows/
│ └── cache-data.yml # 数据缓存工作流
└── README.md # 项目说明
```

## 部署说明

1. 将项目推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 数据将通过GitHub Actions自动缓存和更新

## 数据管理

应用数据存储在 `data/apps.json` 文件中，可以通过以下方式管理：

- 手动编辑JSON文件
- 通过GitHub Actions自动更新
- 使用GitHub Issues收集用户提交的应用信息



## 贡献

欢迎贡献代码！




20251026 21:08:10 debug_v0.0.1

## 修复的问题

- ✅ 修复了404路径错误
- ✅ 优化了数据加载逻辑
- ✅ 添加了错误处理机制
- ✅ 改进了响应式设计

## 部署说明

1. 将整个项目推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages：
   - Source: GitHub Actions
   - Branch: main
3. 访问 `https://<username>.github.io/<repository-name>/`

## 项目特性

- 📱 响应式设计
- 🔍 实时搜索和过滤
- 🎯 分类浏览
- ⚡ 快速加载
- 🎨 现代化UI设计

## 文件结构

```
app-store/
├── index.html              # 主页面
├── styles.css              # 样式文件
├── script.js               # 主要逻辑
├── data/
│   └── apps.json          # 应用数据
├── .github/
│   └── workflows/
│       └── deploy.yml     # 部署配置
└── README.md               # 项目说明
```

## 技术栈

- HTML5 + CSS3 + JavaScript
- Font Awesome图标
- GitHub Pages + GitHub Actions