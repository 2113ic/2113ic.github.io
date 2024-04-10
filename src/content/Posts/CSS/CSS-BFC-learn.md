---
title: BFC 介绍及其应用
date : 2023-7-16
tags : ['CSS', 'Notes']
desc : BFC（Block Formatting Contexts 块级格式化上下文）是 CSS 中的一个重要概念。它是页面上一个独立的渲染区域，如果一个元素具有 BFC 特性，则内部子元素在任何情况下都不会影响到外部元素，也不会被外部元素影响。
---

## 概念

BFC（Block Formatting Contexts 块级格式化上下文）是 CSS 中的一个重要概念。它是页面上一个独立的渲染区域，如果一个元素具有 BFC 特性，则内部子元素在任何情况下都不会影响到外部元素，也不会被外部元素影响。

例如：

1. **处理浮动问题**：当父元素包含浮动元素时，父元素的高度坍塌，这导致父元素无法包裹子元素。但是，当父元素具有 BFC 特性时，它会包含浮动元素并计算其高度，解决了这个问题。

2. **防止边距重叠**：在普通流中，相邻两个元素的 margin 可能会重叠。但是，当两个元素属于不同的 BFC 时，它们的边距不会重叠。

## 元素在什么时候具有 BFC 特性？

- `html` 根元素。天生具有。
- `float` 的值不为 none。
- `position` 的值不为 relative、static。
- `overflow` 的值为 auto、scroll、hidden。
- `display` 的值为 inline-block、table-cell、table-caption、flex、grid。

## BFC 与布局

```html
<div class="demo">
  <img src="./example.jpg" />
  <div class="content">
    BFC（Block Formatting Contexts 块级格式化上下文）是 CSS
    中的一个重要概念。它是页面上一个独立的渲染区域，如果一个元素具有 BFC
    特性的话，内部子元素在任何情况下都不会影响到外部的元素。
  </div>
</div>

<style>
  img {
    float: left;

    width: 100px;
    margin-right: 12px;
  }

  .content {
    overflow: hidden;
  }
</style>
```

上面代码，img 设置了 `float` 属性具有了 BFC 和原有的浮动特性，所以 img 会尽可能地靠左浮动。

此时 div.content 的文字会受到 img 的 `float` 属性环绕 img，但是 div.content 设置了 `overflow` 属性也具有 BFC 特性：BFC 元素的子元素不会受到外部元素的影响。所以 div.content 就不会环绕 img。

可以通过改变 img 宽度大小会发现 div.content 内容是自适应的。如果元素之间需要间隔，这里推荐在 img 中设置 `margin` 属性或其他，但是不推荐在 div.content 上设置 `margin-left`，因为该值必须是浮动元素的宽度加上间隙的大小，可复用性差。
