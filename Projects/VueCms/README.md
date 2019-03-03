# 这是一个 Vue 学习项目

## 拓展：[主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

## 如何通过命令行把修改过后的代码上传到远端仓库

1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页 App 组件

1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
    + 在制作购物车小图标的时候，操作会相对多一些
    + 先把扩展图标的 css 样式拷贝到项目中
    + 拷贝扩展字体库 ttf 文件到项目中
    + 为购物车小图标添加如下样式 "mui-icon mui-icon-extra mui-icon-extra-cart"
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabber 为 router-link

## 设置路由高亮

## 点击 tabber 中的路由链接，展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播图数据
1. 获取数据，使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项

## 改造 九宫格 区域

## 改造 新闻资讯 路由链接

## 新闻资讯页面制作
1. 绘制页面，使用 mui 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link ,同时在跳转的时候应该提供唯一的 ID 标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中手动导入 comment 组件
    + `import comment from './comment.vue`
3. 在父组件中使用 'components’ 属性将导入的 comment 组件注册为自己的子组件
4. 将注册子组件的注册名称以标签形式在页面中引用即可

## 获取所有的评论数据显示到页面中
1. getComment

## 实现点击加载更多评论的功能
1. 为加载更多按钮绑定点击事件，在事件中请求下一页数据
2. 点击加载更多，让 pageIndex++ ，然后重新调用 this.getComment() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的 concat 方法拼接上新数据

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空则 Toast 提示用户评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论 ok 后，重新刷新列表，以查看最新的评论
    + 如果调用 getComment 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
    + 换一种思路，当评论成功后在客户端手动拼接出一个最新的评论对象，然后调用数组的 unshift 方法，把最新的评论追加到 data 中 comments 的开头，这样就能完美实现刷新评论列表的需求; 

## 改造图片分析按钮为路由的链接并显示对应的组件页面
1. 制作顶部的滑动条
2. 制作底部的图片列表

### 制作顶部滑动条的坑们：
1. 需要借助于 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过查看官方文档发现这是 JS 组件，需要被初始化
    + 导入 mui.js
    + 调用官方提供的方式去初始化:
    ```
    mui('.mui-scroll-wrapper').scroll({
        // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值 0.0006
        deceleration: 0.0005
    });
    ```
4. 在初始化滑动条的时候导入的 mui.js，但是控制台报错：`mui.min.js:946 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
    + 经过合理的推断，觉得可能是 mui.js 中用到了 `'caller', 'callee', 'arguments' `，但是，webpack 打包好的 bundle.js 中式默认开启严格模式的，所以这两者冲突了
    + 解决方案：
        1. 把 mui.js 中的非严格模式的代码改掉，但不现实
        2. 把 webpack 打包时候的严格模式禁用掉
    + 最终使用了方案 2 移除严格模式，使用这个插件 `babel-plugin-transform-remove-strict-mode`
5. 刚进入图片分享页面的时候，滑动条无法正常工作，经过分析发现如果要初始化滑动条，必须要等到 DOM 元素加载完毕，所以把初始化滑动条的代码搬到了 mounted 生命周期函数中
6. 当滑动条调试 ok 后，发现 tabbar 无法正常工作，这时候需要把每个 tabbar 按钮的样式 'mui-tab-item' 重新改下名字
7. 获取所有分类，并渲染分类列表

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-ui 提供的现成的组件 'Lazyload'
2. 根据'Lazyload'的使用文档尝试使用
3. 

### 实现了图片列表的懒加载改造和样式美化

## 实现了点击图片跳转到图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面
1. 使用插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用 vue-preview 渲染数据
3. 注意：每个图片数据对象中必须有 w 和 h 属性

## 绘制商品列表页面基本结构并美化

## 尝试在手机上去进行项目的预览和测试
1. 要保证自己的手机可以正常运行
2. 要保证手机和开发项目的电脑处于同一个局域网环境中
3. 打开自己项目中的 package,json 文件，在 dev 脚本中添加一个 --host 指令，把当前电脑的 IP 地址设置为 --host 的指令值
    + 如何查看自己电脑所处局域网的 IP 地址，在 cmd 终端中运行 'ipconfig' 查看