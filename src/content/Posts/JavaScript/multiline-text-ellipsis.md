---
title: '多行文本省略号之二分法'
date : '2024-4-14'
tags : ['Notes', 'JavaScript']
desc : '这是一篇迟到的文章。本文分享了一种 JavaScript 处理多行文本溢出的方案，利用二分法减少了 DOM 操作……'
draft: false
---

## 前言

多行文本溢出省略是前端开发中一个经典问题。CSS 提供了 `-webkit-line-clamp` 方案，但它存在明显局限——无法自定义省略后的交互（比如「展开/收起」按钮），也难以在文本截断时做额外的逻辑处理。

当时我在做一个 Vue 组件库，需要实现一个 `Paragraph` 组件：支持多行截断、展开收起、复制等功能。于是我选择用 JavaScript 来控制文本截断，核心思路是 **二分查找**。

## CSS 方案的局限

先回顾一下纯 CSS 的多行省略：

```css
.ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

这个方案简洁高效，但有几个问题：

1. **无法插入自定义内容**：省略号是浏览器渲染的，你无法在 `...` 后面放一个「展开」按钮
2. **无法感知截断状态**：CSS 不会告诉你文本到底有没有被截断
3. **兼容性依赖**：`-webkit-line-clamp` 虽然主流浏览器都支持了，但它始终是非标准属性

如果只需要纯展示的省略，CSS 方案足够了。但如果需要交互能力，就得 JavaScript 上场。

## 核心思路：二分查找截断点

一个朴素的想法是：逐字符缩短文本，每次检查容器是否溢出，直到刚好不溢出为止。但逐字符遍历的时间复杂度是 O(n)，对于长文本来说 DOM 操作太多，性能堪忧。

**二分查找**可以将复杂度降到 O(log n)：

1. 设 `start = 0`，`end = 文本总长度`
2. 取中点 `mid`，将文本截取到 `mid` 位置并加上 `...`
3. 检查容器的 `scrollHeight` 是否超过最大高度
4. 超过则缩小右边界 `end = mid`，否则扩大左边界 `start = mid + 1`
5. 循环直到 `start >= end`，此时 `start - 1` 就是截断点

```ts
function truncateMultilineText(
  container: HTMLElement,
  textNode: HTMLElement,
  maxHeight: number,
  flag: boolean = false,
) {
  let start = 0
  let end = originalText.length

  while (start < end) {
    const mid = Math.floor((start + end) / 2)

    truncatedText = originalText.slice(0, mid).concat('...')
    textNode.innerText = truncatedText
    container.scrollHeight > maxHeight
      ? (end = mid)
      : (start = mid + 1)
  }

  let finalText = originalText.slice(0, start - 1).concat('...')
  const isEqual = truncatedText.length - 2 === originalText.length
  let _moreable = props.moreable

  // 如果容器变宽后文本已经不需要截断了，隐藏「展开」按钮
  if (flag && isEqual) {
    finalText = originalText
    _moreable = false
  }

  moreable.value = _moreable
  textNode.innerText = finalText
}
```

为什么用 `start - 1`？因为循环结束时 `start` 的位置刚好会导致溢出，所以退一个字符才是安全的截断点。

## 最大高度的计算

截断的判断依据是容器的 `scrollHeight` 是否超过了允许的最大高度。这个最大高度通过 `行数 × 行高` 算出来：

```ts
const { fontSize, lineHeight } = getComputedStyle(node)
const maxHeight = props.rows * parseFloat(lineHeight)

container.style.maxHeight = `${maxHeight}px`
```

这里有个注意点：`getComputedStyle` 返回的 `lineHeight` 可能是 `normal`。如果你的样式没有显式指定 `line-height`，`parseFloat('normal')` 会返回 `NaN`。所以实际使用时，最好确保目标元素有明确的 `line-height` 值。

## 响应式处理

窗口大小变化时，容器宽度可能变化，截断位置也得跟着更新。我用 VueUse 的 `useElementSize` 监听容器宽度，配合防抖来避免频繁计算：

```ts
const { width } = useElementSize(container)
const { execute } = debounce(truncateMultilineText, 200)

watch(width, (newVal, oldVal) => {
  if (isOpen.value) return
  if (newVal - oldVal > _fontSize) {
    // 容器变宽，可能不需要截断了
    execute(container, node, maxHeight, true)
  } else if (container.scrollHeight > maxHeight) {
    // 容器变窄，需要重新截断
    execute(container, node, maxHeight)
  }
})
```

这里有个细节：当容器变宽时传入 `flag = true`，函数内部会判断截断后的文本是否已经等于原文，如果是就直接显示全文并隐藏「展开」按钮。容器变窄时不需要这个判断，直接重新截断即可。

另外，用 `fontSize` 作为阈值来过滤微小的宽度变化，避免不必要的重算。

## 展开与收起

展开收起的逻辑相对直观：

```ts
watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      node.innerText = originalText
      container.style.maxHeight = 'none'
    } else {
      container.style.maxHeight = `${maxHeight}px`
      truncateMultilineText(container, node, maxHeight, true)
    }
    emit('changeOpen', newVal)
    emit('update:open', newVal)
  },
  { immediate: true },
)
```

展开时恢复原文，取消高度限制；收起时重新设置高度限制并执行截断。用 `v-model:open` 支持双向绑定，方便外部控制状态。

需要注意 `immediate: true`——组件挂载时就执行一次截断，确保初始渲染正确。

## 与复制功能的互斥

组件同时支持 `copyable`（复制）和 `moreable`（展开收起）两个能力，但它们是互斥的：

```ts
const copyable = !moreable.value && props.copyable
```

原因是：如果文本处于截断状态，复制按钮复制的是截断后的文本（带 `...`），这显然不是用户期望的行为。而如果要复制原文，又需要额外维护一份数据，增加了复杂度。所以直接让两个功能互斥，保持简洁。

## 性能分析

对于一段 1000 个字符的文本：

- **逐字符遍历**：最坏情况需要 1000 次 DOM 操作
- **二分查找**：最多 `⌈log₂(1000)⌉ = 10` 次 DOM 操作

每次 DOM 操作都涉及修改 `innerText` 和读取 `scrollHeight`，会触发浏览器回流。10 次和 1000 次的差距在性能上是显著的。

不过也要承认，即使是二分法，每次迭代都在触发回流。如果追求极致性能，还有其他思路：

- **Canvas 测量**：用 `measureText` 预估文本宽度，完全避免 DOM 操作。但无法准确处理 CJK 字符混排、字体加载等情况
- **预估算法**：先根据容器宽度和字体大小粗略估算截断位置，再在小范围内微调。实现更复杂，但 DOM 操作更少

对于大多数场景，二分法已经是一个不错的平衡点。

## 总结

这个方案的核心就是 **用二分查找代替逐字符遍历来寻找截断点**，将 O(n) 的 DOM 操作降到 O(log n)。再配合响应式监听和防抖，保证窗口变化时也能正确截断。

回头看，这个方案并不复杂，但它解决了 CSS 方案无法覆盖的交互场景。有时候前端开发就是这样——看似简单的需求，背后需要在性能、体验和实现复杂度之间做取舍。
