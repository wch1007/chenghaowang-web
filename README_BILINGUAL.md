# Bilingual Personal Website / 双语个人网站

## 概述 (Overview)

这是王城昊的个人网站，现已支持中英文双语版本。

This is Chenghao Wang's personal website, now supporting both Chinese and English versions.

## 网站结构 (Website Structure)

```
chenghaowang-web/
├── index.htm              # 中文主页 (Chinese Homepage)
├── about/                 # 中文关于页面 (Chinese About Page)
│   └── index.htm
├── works/                 # 中文作品页面 (Chinese Works Page)
│   └── index.htm
├── portfolio/             # 中文项目集 (Chinese Portfolio)
├── assets/                # 共享资源 (Shared Resources)
│   └── files/             # 简历文件 (Resume Files)
│       ├── Chenghao_s_CV__2410_.pdf       # 英文简历
│       └── 王城昊简历_2503.pdf             # 中文简历
├── en/                    # 英文版本 (English Version)
│   ├── index.htm          # 英文主页 (English Homepage)
│   ├── about/             # 英文关于页面 (English About Page)
│   │   └── index.htm
│   ├── works/             # 英文作品页面 (English Works Page)
│   └── portfolio/         # 英文项目集 (English Portfolio)
├── wp-content/            # WordPress 主题资源 (Theme Resources)
├── wp-includes/           # WordPress 核心资源 (Core Resources)
└── CNAME                  # 域名配置 (Domain Configuration)
```

## 访问方式 (Access URLs)

### 中文版 (Chinese Version)
- 主页: `https://www.chenghaowang.top/` 或 `https://www.chenghaowang.top/index.htm`
- 关于: `https://www.chenghaowang.top/about/`
- 作品: `https://www.chenghaowang.top/works/`

### 英文版 (English Version)
- Homepage: `https://www.chenghaowang.top/en/` 或 `https://www.chenghaowang.top/en/index.htm`
- About: `https://www.chenghaowang.top/en/about/`
- Works: `https://www.chenghaowang.top/en/works/`

## 语言切换 (Language Switching)

每个页面右上角都有语言切换按钮：
- 中文页面显示 "EN" 按钮，点击切换到英文
- 英文页面显示 "中文" 按钮，点击切换到中文

Each page has a language switcher in the top-right corner:
- Chinese pages show "EN" button to switch to English
- English pages show "中文" button to switch to Chinese

## 技术特点 (Technical Features)

1. **静态网站** (Static Website)
   - 纯 HTML/CSS/JavaScript
   - 无需服务器端处理
   - 可直接部署到 GitHub Pages、Netlify 等静态托管服务

2. **共享资源** (Shared Resources)
   - CSS、JavaScript、图片等资源在中英文版本间共享
   - 减少重复文件，节省空间

3. **SEO 友好** (SEO Friendly)
   - 清晰的 URL 结构
   - 独立的中英文页面
   - 搜索引擎易于索引

4. **响应式设计** (Responsive Design)
   - 支持桌面、平板、手机等多种设备
   - Bootstrap 框架支持

## 本地预览 (Local Preview)

### 方法 1: 直接打开
双击 `index.htm` 文件即可在浏览器中打开

### 方法 2: 使用本地服务器
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server -p 8000

# 使用 VS Code Live Server 扩展
# 右键点击 index.htm -> Open with Live Server
```

然后访问:
- 中文版: `http://localhost:8000/`
- 英文版: `http://localhost:8000/en/`

## 部署 (Deployment)

### GitHub Pages
1. 将整个 `chenghaowang-web` 目录推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支 (main/master) 作为源
4. 访问 `https://yourusername.github.io/chenghaowang-web/`

### 自定义域名
1. 在 `CNAME` 文件中设置你的域名（已设置为 `www.chenghaowang.top`）
2. 在域名提供商处配置 DNS 记录
3. 等待 DNS 生效

## 维护说明 (Maintenance Notes)

### 更新内容
1. **中文内容**: 编辑根目录下的 HTML 文件
2. **英文内容**: 编辑 `en/` 目录下的对应 HTML 文件
3. **共享资源**: 编辑 `assets/`、`wp-content/`、`wp-includes/` 目录

### 添加新页面
1. 在根目录创建中文页面
2. 在 `en/` 目录创建对应的英文页面
3. 更新导航菜单链接
4. 添加语言切换按钮

### 注意事项
- 保持中英文页面结构一致
- 更新资源路径时注意相对路径
- 图片、CSS、JS 等资源使用绝对路径或正确的相对路径

## 联系方式 (Contact)

- Email: 18501284401@163.com / wch1007@uw.edu
- WeChat: wch18501284401
- Website: https://www.chenghaowang.top

## 版权声明 (Copyright)

© 2025 CHENGHAO WANG

本网站内容仅供个人展示与学习研究使用，未经授权不得用于商业用途。

This website content is for personal showcase and academic research only. Commercial use without authorization is prohibited.

