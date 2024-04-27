---
title: '折腾|一次原生项目的最佳实践的探索'
date : '2023-5-23'
cover: 'htmlPlus.webp'
tags : ['JavaScript']
desc : '关于我重构项目时的一番折腾……'
---

## 前言

因为一些原因，前些天，我在重构以前写的一个期末大作业项目😣。

刚开始重构项目，我就开始怀念vue了😂

我选择元素时是这样做的：

```js
const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

$('.box').xxx
```

全局暴露 `$`、 `$$` 方法来方便获取元素。

emmm，这样其实也还行，对于原生项目来说……

不过，我的折腾病，可不允许我就这样。

## 设想

原生项目似乎没有组件的概念，我最多是见过使用 `<iframe>` 来达成组件效果的（我也不确定这样做是不是为了组件化）。

UI 组件化似乎没法达成了，但我想了想业务逻辑还是有可能的。

可以写一个类，用面向对象的思维，把某一个 html 范围的业务逻辑写在一个类里面。

我就暂且称之为“模块”吧。

```js
class ExampleBox {
  constructor(selector) {
    this.$el = document.querySelector(selector)
  }
}

new ExampleBox('.example-box')
```

这样就可以在 `ExampleBox` 里面使用 `this.$el.querySelector('xxx')` 获取对应 html 内的元素了，并且可以把该元素直接挂在 `ExampleBox` 实例里面。

## ref 指令

但这样还是不方便……还是需要自己写 `querySelector`。

是否可以直接在 html 上标记元素，然后就可以在 `ExampleBox` 实例里面拿到元素？就像 vue 的 ref 属性一样。

开搞~

设想：在 html 标签上通过 `data-ref` 标记该元素，然后 `new ExampleBox()` 时候调用 `this.$el.querySelector()` 获取该元素，并将 `data-ref` 的值作为 key 放在实例上。

实现：

```html
<div class="example-box">
  <p data-ref="question">问世间帅为何物？</p>
</div>
```

```js
class Base {
  constructor(selector) {
    this.$el = document.querySelector(selector)
    this.initRef()
  }
  
  initRef() {
    const refNodes = this.getNodeAll('[data-ref]')

    for (let node of refNodes) {
      const key = node.dataset.ref
      this[key] = node
    }
  }

  getNode(selector) {
    return this.$el.querySelector(selector)
  }

  getNodeAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
}
```

```js
class ExampleBox extends Base {
  constructor(selector) {
    super(selector)
  }
}

console.log(new ExampleBox('.example-box'))
```

打印 `ExampleBox` 实例就可以看到：

![Alt text](/images/html-plus/1.png)

看来是成功了😂。

上面写了一个 `Base` 的基础类可以让每一个“模块”继承以获得 `ref` 指令的功能。

## event 指令

不用10分钟的时间就完成上面的 `ref` 指令功能，我已经开始飘了，我脑子🧠又产生了大量想法。

于是我又用5分钟实现了 `event` 指令（事件绑定）功能。

```html
<div class="example-box">
  <p data-ref="question">问世间帅为何物？</p>

  <button data-event="click:showAnswer">点我查看答案</button>
</div>
```

```js
// base

initEvent() {
  const eventNodes = this.getNodeAll('[data-event]')

  for (let node of eventNodes) {
    const [eventName, methodName] = node.dataset.event.split(':')

    node.addEventListener(eventName, this[methodName].bind(this))
  }
}
```

```js
class ExampleBox extends Base {
  constructor(selector) {
    super(selector)
  }

  showAnswer() {
    this.question.innerHTML = '唯默小言独占也。'
  }
}

console.log(new ExampleBox('.example-box'))
```

`data-event` 指令使用 `:` 来区分不同的参数。

## clone & bind 指令

上面的 `ref` 和 `event` 指令都很顺利，令我我折腾病大发作。

我继续观察我要重构的原生项目，看看还有哪些痛点，需要解决。

果不奇然，项目都是发送请求，拿到响应数据之后就开始根据数据克隆对应数量的 html 节点，然后`$('...').innerHTML= [数据]` 😓

如果有 `clone` 和 `bind` 指令就可以解决这个问题了🧐。

设想：

```html
<ul class="example-box">
  <template data-clone="listItem1:true:arr">
    <li data-target="listItem">
      <p data-bind="innerHTML:name"></p>

      <template data-clone="spanItem:false:images">
        <p data-target="spanItem" data-bind="innerHTML:$item"></p>
      </template>
    </li>
  </template>
</ul>
```

```js
const dataObj = {
  arr: [
    {
      name: 'xiaoyan-1',
      images: [1, 2, 3],
    },
    {
      name: 'xiaoyan-2',
      images: [4, 5, 6],
    },
    {
      name: 'xiaoyan-3',
      images: [7, 8, 9],
    },
  ],
}
```

`data-clone` 应该只用在 `<template>` 上。

从上面 html 可以看到该指令有三个参数，分别是：

- listItem/spanItem 用来识别克隆的目标，与对应 `<template>` 的第一个元素的 `data-target` 对应
- true/false 表示是否进行深度克隆
- arr/images 都是进行克隆的数据，且是一个数组。

`data-bind` 的第一个参数是元素的属性，例如：innerHTML、innerText、className、id……，第二个参数是需要绑定的数据。

例如：`arr` 有三个元素，就意味会会把 `<li>` 克隆3次，并把克隆的结果添加到父元素内。注意：`arr` 第一个元素的数据就对应着第一个克隆的 `<li>` 节点，所以 `bind` 指令就能正确地绑定数据。

细心的同学可能发现了 `bind` 指令有一个特殊的参数（`$item`），它用于绑定对应的数组元素。这不好解释，我直接上一个效果图，估计就能看明白了。

![Alt text](</images/html-plus/2.png>)

由于，实现这两个指令的代码有点长，就不放在这文章里面了。

感兴趣的可以查看：[项目地址](<https://github.com/2113ic/dot/tree/master/public/package/htmlPlus>)

## 结论

其实这个东西（Base类）没啥大用，不过能满足我的折腾病了。

真要用在实际项目，还是用框架方便🤣
