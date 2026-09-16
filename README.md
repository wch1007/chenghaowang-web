# Chenghao Wang — Personal Portfolio

王城昊（Caelen）的双语个人网站，聚焦产品、AI Agent、智能硬件、机器人与跨学科创业实践。

在线访问：<https://wch1007.github.io/chenghaowang-web/>

## 内容结构

- **Journey**：倒序履历，阿里巴巴默认展开，附各阶段照片与机构标识
- **Practice & Ventures**：横向切换阿里巴巴 Accio Work、汤问、K老师 AI 英语资料、HerOS / SkinPilot、高原智卫、Pyroscope，详情常驻
- **Selected Work**：旋转齿盘切换十一个学生项目，包含 HOW MASTER（2022）与 Foodio（2024），在同一舞台展开本地详情、图片、视频及相关链接
- **Capabilities**：六个能力维度、具体方法与工具、对应项目证据
- **Honors**：22 项荣誉按时间倒序纵向循环，支持暂停与逐条浏览
- **Last Page**：经历如何塑造能力、19 张生活照片横向循环、完整联系方式

## 体验

- 中文 / English 一键切换，并支持 `?lang=en` 直达英文版
- 响应式桌面与移动端布局
- 四个整屏章节与原生滚动吸附，履历恢复纵向展开，齿盘拖动 / 滚轮 / 键盘切换、图文位置过渡、无缝轮播
- 宽屏首页人物与滚动条结合；荣誉轮播在 2.4 秒内加速到三倍速度
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

交互回归（测试依赖仅放在临时目录，不进入网站）：

```bash
npm install --prefix tmp/qa jsdom --no-save --ignore-scripts
node scripts/test-interactions.cjs
```

项目正文和图片均保存在本站。简历、奖学金申请等私人原件不纳入发布文件。

## 联系

- Email: 18501284401@163.com
- WeChat: 18501284401
- GitHub: <https://github.com/wch1007>
- LinkedIn: <https://www.linkedin.com/in/chenghao-wang-caelen/>
- Portfolio archive: <https://flowus.cn/share/3e3108b0-6b78-4ec3-9e72-011baad222e9>

