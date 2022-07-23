# Fleet
Fleet 能够帮助你快速构建页面，让你只需要专注页面UI设计和数据请求即可。

> Fleet 是心血来潮下的作品，不适用于生产环境。

## 安装

```
npm i fleetjs
```



## 使用教程

引入 fleet.css 和 fleet.js 

```html
<link rel="stylesheet" href="/node_modules/fleetjs/dist/css/fleet.css">
```

```html
<script src="/node_modules/fleetjs/dist/fleet.js"></script>
```
or
```javascript
import Fleet from '/node_modules/fleetjs/fleet.esm.js';
```



### Fleet何如工作？

一个例子搞懂Fleet 如何工作。

```html
<div class="box" data-fleet="useFleet">
  <p :title="hello" $="showText">Fleet 使用。</p>
  <button @click="changeTitle">点我</button>
</div>
```

```javascript
class UseTest extends Fleet {
  $init() {
    this.data = {
      hello: "Fleet之属性绑定"
    };
  }

  changeTitle(e) {
    const p = this.$showText;
    const btn = e.target;

    console.log(p, btn);

    this.data.hello = "hello发生了改变……";
  }
}

const test = new UseTest("useFleet");
console.log(test);
```
![image-20220714105334149](README.assets/image-20220714105334149.png)

如上所示，

`data-fleet` 为标记Fleet的作用域。

`:` 为属性绑定。其作用与vue类似。

`@` 为函数绑定。其作用与vue类似。所引用函数的`this`指向为Fleet 的实例。

`$` 为元素标记符。标记的元素都会加载都Fleet的实例上，并以`$`符为开头。

实现了Fleet的实例 `UseTest` 通过`$init()` 方法初始化`data`数据。
