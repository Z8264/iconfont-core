# 安装

## 本地安装

```
npm install --save-dev iconfont-core
```

我们建议使用本地安装，避免引入破坏式变更(breaking change)的依赖时，导致使用不同iconfont-core版本的项目构建失败。

通常，iconfont-core 通过运行 npm scripts，来完成构建任务

package.json

```
"scripts":{
  "buildicon": "icon2font --config icon2font.config.js""
}
```

## 全局安装

```
npm install --global iconfont-core
```

这种安装方式，将使iconfont-core在全局环境下可用。