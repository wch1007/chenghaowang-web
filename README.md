# Chenghao Wang — Personal Portfolio

王城昊（Caelan）的双语个人网站，聚焦产品、AI Agent、智能硬件、机器人与跨学科创业实践。

在线访问：<https://wch1007.github.io/chenghaowang-web/>

## 内容结构

- **Journey**：倒序履历，阿里巴巴默认展开，附各阶段照片与机构标识
- **Practice & Ventures**：阿里巴巴 Accio Work、汤问、K老师 AI 英语资料、HerOS
- **Selected Work**：旋转齿盘切换八个学生项目，在同一舞台展开本地详情与图片
- **Capabilities**：六个能力维度、具体方法与工具、对应项目证据
- **Honors**：荣誉按时间倒序逐行进入
- **Last Page**：个人叙事、运动与公益教学照片、联系方式

## 体验

- 中文 / English 一键切换，并支持 `?lang=en` 直达英文版
- 响应式桌面与移动端布局
- 齿盘拖动 / 滚轮 / 键盘切换、图文位置过渡、逐行揭示、无缝跑马灯
- 尊重系统的 `prefers-reduced-motion` 动效偏好，并提供暂停动态效果按钮
- 固定 Accio Work 深色薄荷绿主调，荧光绿和紫色仅作局部点缀，见 `DESIGN.md`
- 无构建步骤、无外部前端依赖，适合 GitHub Pages 直接托管

## 本地预览

在仓库根目录启动任意静态服务器，然后打开首页。例如：

```bash
python -m http.server 4173
```

主入口为 `index.html`。旧站文件仍保留在仓库中作为历史归档，但不会覆盖新版首页。

静态检查：

```bash
node scripts/validate.mjs
node --check assets/site.js
```

项目正文和图片均保存在本站。简历、奖学金申请等私人原件不纳入发布文件。

## 联系

- Email: 18501284401@163.com
- WeChat: 18501284401
- GitHub: <https://github.com/wch1007>
- Portfolio archive: <https://flowus.cn/share/3e3108b0-6b78-4ec3-9e72-011baad222e9>

