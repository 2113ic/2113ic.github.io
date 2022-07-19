const Fleet = (function (global) {
  "use strict";
  const $ = el => document.querySelector(el);
  const $$ = el => document.querySelectorAll(el);
  HTMLElement.prototype.$ = $;
  HTMLElement.prototype.$$ = $$;

  const isArray = Array.isArray;

  function isUndefined(f) {
    return f === undefined || f === null;
  }

  function isTrue(f) {
    return f === true;
  }

  function isFalse(f) {
    return f === false;
  }

  function isString(f) {
    return typeof f === 'string';
  }

  function isFunction(f) {
    return typeof f === 'function';
  }

  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }


  /* -------------------------------------------------------- **
   *  工具类
   * -------------------------------------------------------- */
  class Utils {

    $getElement(f) {
      return isString(f) ? $(f) : f;
    }

    /**
     * 为元素添加属性
     * @param {Element} ele 元素
     * @param {Object} options 属性配置
     * @returns 元素
     */
    $addAttrs(ele, options) {

      for (const [key, value] of Object.entries(options)) {
        if (key === 'style') {
          Object.assign(ele.style, value);
          continue;
        }
        ele[key] = value;
      }
      return ele;
    }


    /**
     * 创建元素
     * @param {String} ele 元素
     * @param {Object} options element属性
     * @returns element
     */
    $createElement(ele, options) {
      const el = document.createElement(ele);

      if (!options) return el;

      for (const [key, value] of Object.entries(options)) {
        if (key === 'style') {
          Object.assign(el.style, value);
          continue;
        }
        el[key] = value;
      }
      return el;
    }


    /**
     * 克隆节点
     * @param {Element} node 需要克隆的节点
     * @param {Number} num 克隆数量
     * @param {Boolean} deep 可选。克隆深度。默认为false
     * @returns fragment 文档片段
     */
    $cloneNode(node, num, deep) {
      const fragment = document.createDocumentFragment();
      deep = deep || false;

      for (let i = 0; i < num; i++) {
        fragment.append(node.cloneNode(deep));
      }

      return fragment;
    }


    /**
     * 读取文件
     * @param {object} file 文件对象
     * @returns file promise
     */
    $readFile(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = evt => resolve(evt.target.result);
        reader.readAsText(file);
      });
    }


    /**
     * 文件下载
     * @param {String} content 内容
     * @param {String} filename 文件名
     */
    $fileDownload({ url, content, fileName } = {
      url: null, content: '', filename: "未知文件"
    }) {
      let eleLink = document.createElement('a');
      eleLink.download = fileName;
      eleLink.style.display = 'none';

      if (url) {
        eleLink.href = url;
      } else if (content) {
        let blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
      }

      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    }


    async $getJsonData(url) {
      return await (await fetch(url)).json();
    }


    async $getTextData(url) {
      return await (await fetch(url)).text();
    }


    /**
     * 获得地址中对应参数的值
     * @param {Sting} name 字段名
     * @returns 值，失败返回 null
     */
    $getUrlParam(name) {
      const search = location.search;
      const parmas = search.slice(1).split('&').map(item => item.split('='));
      const result = parmas.find(param => param[0] == name);

      return result ? decodeURIComponent(result[1]) : null;
    }


    /**
     * 设置 cookie
     * @param {String} name 键
     * @param {String} value 值
     * @param {*} options cookie 的配置
     */
    $setCookie(name, value, options = {}) {
      options = {
        path: '/',
        "max-age": 3600 * 24 * 7,
        ...options
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }


    /**
     * 获得对应名字的 cookie 值
     * @param {String} name 获得 cookie
     * @returns 对应的 cookie 值
     */
    $getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    /**
     * 删除 cookie
     * @param {String} name cookieName
     */
    $deleteCookie(name) {
      this.$setCookie(name, "", {
        'max-age': -1
      });
    }


    /**
     * 提取字符串中的所有数字，并以字符串形式返回
     * @param {String} str 字符串
     * @returns 字符串中的所有数字
     */
    $getNumberByString(str) {
      return /\d+/.exec(str)[0];
    }


    /**
     * 为函数包装延时执行的功能
     * @param {Function} f 延迟执行的函数
     * @param {Number} ms 延迟毫秒
     * @returns 经过包装的函数
     */
    $delay(f, ms) {
      return new Proxy(f, {
        apply(target, thisArg, args) {
          setTimeout(() => target.apply(thisArg, args), ms);
        }
      });
    }


    /**
     * 为函数添加缓存功能
     * @param {Function} func 需要包装的函数
     * @returns 包装过的函数
     */
    $cachingDecorator(func) {
      const cache = new Map();

      return function () {
        const key = [].join.call(arguments);
        if (cache.has(key)) {
          return cache.get(key);
        }

        const result = func.apply(this, arguments);

        cache.set(key, result);
        return result;
      };
    }


    /**
     * 防抖包装器
     * @param {Function} func 需要包装的函数
     * @param {Number} ms 毫秒
     * @returns 包装过的函数
     */
    $debounce(func, ms) {
      let timeout;

      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
      };
    }


    /**
     * 节流包装器
     * @param {Function} func 需要包装的函数
     * @param {*} ms 毫秒
     * @returns 包装过的函数
     */
    $throttle(func, ms) {
      let isThrottled = false,
        savedArgs,
        savedThis;

      function wrapper() {
        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;
          return;
        }
        isThrottled = true;

        func.apply(this, arguments);

        setTimeout(function () {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }

      return wrapper;
    }


    /**
     * 获得动态的元素集合
     * @param {String} el 元素的选择符
     * @param {String} model 模式。["class"|"tag"|"name"]
     * @returns el 的集合，失败返回 null
     */
    $getDynamicNode(el, model) {
      model = model || "class";

      return (model == "class")
        ? this.getElementsByClassName(el)
        : (model == "tag")
          ? this.getElementsByTagName(el)
          : (model == "name")
            ? document.getElementsByName(el)
            : null;
    }


    /**
     * 清除元素集合中特定的”类“标记
     * @param {Element} lists 元素集合
     * @param {String} flag 需要清除的标记
     */
    $clearFlag(lists, flag) {
      [...lists].forEach(item => {
        if (item.classList.contains(flag)) {
          item.classList.remove(flag);
        }
      });
    }
  }


  /* -------------------------------------------------------- **
   *  Fleet
   * -------------------------------------------------------- */
  class Fleet extends Utils {

    constructor(f) {
      super();
      this._init(f);
    }

    _init(f) {

      if (!f) {
        throw new TypeError('Invalid params, is not an string!');
      }

      this.elm = this.$getElement('[data-fleet="' + f + '"]');

      if (!this.elm) {
        throw new ReferenceError(`'${f}' is not defined!`);
      }

      this.$init && !this.$init() && this._initData();
      this.elm.fNode = new Set();
      this._initNodes();
    }

    _initNodes(nodes = this.elm.children) {
      for (const node of nodes) {
        const hasChildren = node.children.length > 0;

        if (hasChildren) {
          this._initNodes(node.children);
        }

        this._processNode(node);
      }
    }

    _initData() {
      this.data ??= {};

      if (!isObject(this.data)) {
        throw new TypeError('Invalid params, `this.data` must be an object!');
      }

      this.data = this._initDataProxy(this.data);
    }

    _initDataProxy(data) {
      if (!isObject(data)) return data;

      for (const [key, value] of Object.entries(data)) {

        if (isArray(value)) {
          const result = Array.from(value, val => this._initDataProxy(val));

          data[key] = this._setDataProxy(result);
        }

        if (value.constructor === Object) {
          data[key] = this._initDataProxy(value);
        }
      }

      return this._setDataProxy(data);
    }

    _setDataProxy(dataProxy) {
      const that = this;

      return new Proxy(dataProxy, {
        get(...args) {
          return Reflect.get(...args);
        },
        set(...args) {
          that._dataProxySetHeadle(args);
          return Reflect.set(...args);
        }
      });
    }

    _dataProxySetHeadle([target, key, value]) {
      const oldVal = target[key].toString();
      const newVal = value;

      [...this.elm.fNode].findIndex(el => {
        const attrs = el.attributes;
        const flag = [...attrs].findIndex(attr => (
          attr.value === oldVal ||
          new RegExp("\\b" + oldVal + "\\b").test(attr.value)
        ));

        if (attrs[flag].value === oldVal) {
          attrs[flag].value = newVal;
          return true;
        }

        if (attrs.getNamedItem("class")) {
          el.classList.replace(oldVal, newVal);
          return true;
        }

        if (attrs.getNamedItem("style")) {
          el.style.cssText = el.style.cssText.replace(oldVal, newVal);
          return true;
        }
        return flag !== -1;
      });
    }

    _processNode(node) {
      const nodeStr = node.outerHTML;
      const bindAttrReg = /(?<=(?<flag>[$:@])(?<bindName>\w*)=")(?<bindVal>[^"]+)/g;
      const bindAttrs = nodeStr.match(/[$:@]/g);
      const bindAttrNum = bindAttrs ? bindAttrs.length : 0;

      for (let i = 0; i < bindAttrNum; i++) {
        const groups = bindAttrReg.exec(nodeStr).groups;

        if (groups.flag === "$") {
          this._processRef(node, groups);
          continue;
        }

        if (groups.flag === "@") {
          this._processEvent(node, groups);
          continue;
        }

        if (groups.flag === ":") {
          this.elm.fNode.add(node);
          this._processBind(node, groups);
          continue;
        }
      }
    }

    _processRef(node, { flag, bindVal }) {
      this["$" + bindVal] = node;
      node.removeAttribute(flag);
    }

    _processEvent(node, { flag, bindName, bindVal }) {

      if (!this[bindVal]) {
        throw new ReferenceError(bindVal + ' is not defined')
      }

      node.addEventListener(bindName, this[bindVal].bind(this));
      node.removeAttribute(flag + bindName);
    }

    _processBind(node, { flag, bindName, bindVal }) {
      const val = this._bindValueHeadle(bindVal.trim());

      if (bindName === "class") {
        node.classList.add(val);
      }
      else if (bindName === "style") {
        node.style.cssText += val;
      }
      else {
        node.setAttribute(bindName, val);
      }
      node.removeAttribute(flag + bindName);
    }

    _bindValueHeadle(val) {
      let exp = val;

      if (isFunction(this.data[exp]) &&
        exp.indexOf('(') === -1 &&
        exp.indexOf(')') === -1) {
        exp = `${exp}()`;
      }

      return new Function('data', 'return data.' + exp)(this.data);
    }

  }


  /* -------------------------------------------------------- **
   *  轻提示
   * -------------------------------------------------------- */
  class LightTip extends Utils {

    info(msg) {
      const elm = this._create(msg);

      this._checkReplace(elm);
      this._add(elm, 'f-msg-info');
      this._remove(elm);
    }


    success(msg) {
      const elm = this._create(msg);

      this._checkReplace(elm);
      this._add(elm, 'f-msg-success');
      this._remove(elm);
    }


    error(msg) {
      const elm = this._create(msg);

      this._checkReplace(elm);
      this._add(elm, 'f-msg-error');
      this._remove(elm);
    }


    warning(msg) {
      const elm = this._create(msg);

      this._checkReplace(elm);
      this._add(elm, 'f-msg-warning');
      this._remove(elm);
    }


    _create(msg) {
      const config = {
        "innerHTML": msg,
        "className": "f-msg"
      };

      return this.$createElement('div', config);
    }


    _checkReplace(elm) {
      const fmsg = $$('.f-msg');

      if (fmsg.length > 0) {
        elm.style.top = 64 * fmsg.length + 'px';
      }
    }


    _add(elm, type) {
      document.body.append(elm);
      elm.classList.add(type);
    }


    _remove(elm) {
      setTimeout(() => elm.classList.add('f-msg-insert'), 20);
      setTimeout(() => elm.classList.add('f-msg-leave'), 3000);
      setTimeout(() => elm.remove(), 3200);
    }

  }

  /* -------------------------------------------------------- **
   *  分页器
   * -------------------------------------------------------- */
  class Pagination extends Utils {

    constructor(p) {
      super();
      this.init(p);
    }


    init(p) {
      this.paramHandle(p);
      this.initConfig();

      if (this.info.total !== 0) {
        this.initInfo();
        this.initEvents();
        this.initList();
        
        this.nums = this.pager.getElementsByClassName("number");
        this.more = this.pager.getElementsByClassName("more");
        this.info.cur = 1;
      }
    }


    paramHandle(p) {

      if (!p) {
        throw new TypeError('Invalid params');
      }

      if (p.pageCount && !p.pageCount % 2 === 0) {
        throw new TypeError('Invalid page count, must be odd.');
      }

      if (p.pageCount && !p.pageCount < 7) {
        throw new RangeError('Invalid page count, must be at least 7.');
      }

      this.initParam(p);
    }


    initParam(p) {
      this.el = this.$getElement('[data-pagination="' + p.el + '"]');
      this.info = {
        limit: p.limit || 10,
        total: p.total,
        pageCount: p.pageCount || 7,
        pages: Math.ceil(p.total / (p.limit || 10)),
      };
      this.half = Math.floor(p.pageCount || (7 / 2));
      this.singlePageHide = p.singlePageHide || false;
      this.jump = p.jump || (() => {});
      [this.prevBtn, this.pager, this.nextBtn] = [...this.el.children];
    }


    initConfig() {

      if (this.info.pages <= 1 && this.singlePageHide) {
        this.el.style.display = 'none';
      }
    }


    initInfo() {
      const that = this;

      Object.defineProperty(this.info, "cur", {
        get() {
          return this._cur;
        },

        set(cur) {
          this._cur = cur;
          that.$clearFlag(that.nums, "active");
          that.updatePage(cur);
          that.updateDisableState();
          that.jump.call(that, that.info);
          that.nums[that.getLiIndex(cur)].classList.add('active');
        }
      });
    }


    initList() {
      const { pageCount, pages } = this.info;
      const li = this.$createElement('li', { className: "number" });
      const cloneCount = pages <= pageCount ? pages : pageCount + 2;
      const liFragment = this.$cloneNode(li, cloneCount, true);

      this.liFragmentHandle(liFragment);
      this.pager.append(liFragment);
    }


    liFragmentHandle(liFragment) {
      const { pageCount, pages } = this.info;

      if (pages <= pageCount) return;

      const list = liFragment.children;
      const [first, last] = [list[0], list[list.length - 1]];
      const [before, after] = [list[1], list[list.length - 2]];

      first.classList.add('first');
      last.classList.add('last');

      first.innerHTML = 1;
      last.innerHTML = pages;

      before.className = 'more';
      after.className = 'more';
    }


    initEvents() {
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.nextBtn.addEventListener('click', this.next.bind(this));
      this.pager.addEventListener('click', this.pageList.bind(this));
    }


    prev() {
      this.info.cur -= 1;
    }


    next() {
      this.info.cur += 1;
    }


    pageList(e) {
      const target = e.target;
      if ((!target.classList.contains('number')) ||
        target.classList.contains('active')) return;

      this.info.cur = +target.innerHTML;
    }


    updatePage(cur) {
      const _getPagerNumber = this.$cachingDecorator(this.getPagerNumber);

      const rountNum = _getPagerNumber.call(this, cur);
      const list = [...this.nums]
        .filter(item => item.className == 'number');

      rountNum.forEach((num, i) => list[i].innerHTML = num);
      this.updateMoreState(cur, rountNum);
    }


    updateMoreState(cur, rountNum) {
      const { pages, pageCount } = this.info;

      if (pages > pageCount) {
        const [before, after] = [this.more[0], this.more[1]];
        const rountNumLast = rountNum[rountNum.length - 1];

        [before, after].forEach(item => item.hidden = true);

        if (pages - rountNumLast > 1) {
          after.hidden = false;
        }

        if (cur >= pageCount - 1) {
          before.hidden = false;
        }
      }
    }

    getPagerNumber(cur) {
      const { pageCount, pages } = this.info;

      if (pages <= pageCount) {
        return Array.from(Array(pages), (_x, i) => i + 1);
      }

      if (cur < pageCount - 1) {
        return Array.from(Array(pageCount - 2), (_x, i) => i + 2);
      }

      if (cur > pages - this.half) {
        cur = pages - this.half;
      }

      return this.getRountNumber(cur).filter(num => 1 < num && num < pages);
    }


    getRountNumber(cur) {
      const pagerNum = [];

      for (let i = this.half - 1; i > 0; i--) {
        pagerNum.push(cur - i);
      }

      for (let i = 0; i <= this.half - 1; i++) {
        pagerNum.push(cur + i);
      }

      return pagerNum;
    }


    getLiIndex(cur) {
      return [...this.nums].findIndex(item => item.innerHTML == cur);
    }


    updateDisableState() {
      const { cur, pages } = this.info;

      if (cur !== 1 || cur !== pages) {
        this.prevBtn.removeAttribute('disabled');
        this.nextBtn.removeAttribute('disabled');
      }
      if (cur === 1) {
        this.prevBtn.setAttribute('disabled', 'disabled');
      }
      if (cur === pages) {
        this.nextBtn.setAttribute('disabled', 'disabled');
      }
    }

  }

  /* -------------------------------------------------------- **
   *  表单验证
   * -------------------------------------------------------- */
  class FormValidator extends Utils {

    constructor(form, options) {
      super();
      this._init(form, options);
    }


    _init(form, rules) {
      this.elm = this.$getElement('[data-form="' + form + '"]');
      this.rules = this._initRules(rules);
      this.fields = this.elm.$$('[data-validate]');
      this.LightTip = new Fleet.LightTip();
      this.bindEvents();
    }

    _initRules(rules) {
      return {
        name: {
          required: true,
          pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{2,8}$/,
          message: '请输入2-8位中文、英文、数字',
          empty: '请输入姓名'
        },
        account: {
          required: true,
          pattern: /^[a-zA-Z0-9]{4,12}$/,
          message: '请输入正确的账号',
          empty: '请输入账号'
        },
        phone: {
          required: true,
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号码',
          empty: '请输入手机号码'
        },
        email: {
          required: true,
          pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
          message: '请输入正确的邮箱地址',
          empty: '请输入邮箱地址'
        },
        password: {
          required: true,
          pattern: /^[a-zA-Z0-9_.@#$%^&*]{6,20}$/,
          message: '请输入6-20位英文、数字、特殊字符',
          empty: '请输入密码'
        },
        confirm: {
          required: true,
          pattern: /^[a-zA-Z0-9_.@#$%^&*]{6,20}$/,
          message: '请输入6-20位英文、数字、特殊字符',
          empty: '请输入确认密码'
        },
        captcha: {
          required: true,
          pattern: /^\d{4}$/,
          message: '请输入4位数字验证码',
          empty: '请输入验证码'
        },
        agree: {
          required: true,
          message: '请勾选同意协议',
          empty: '请勾选同意协议'
        },
        ...rules
      };
    }

    bindEvents() {
      this.elm.addEventListener('submit', this.submit.bind(this));
    }

    submit(e) {
      e.preventDefault();
      const result = [];

      this.fields.forEach(item => {
        const name = item.localName;
        const type = item.getAttribute('data-validate');

        if (name === 'input') {
          result.push(this.validate(item, type));
        }

        if (name === 'select') {
          result.push(this.select(item));
        }

        if (name === 'textarea') {
          result.push(this.textarea(item));
        }
      });

      if (!result.includes(false)) {
        this.elm.submit();
      }
    }

    validate(item, type) {
      const { required, pattern, message, empty } = this.rules[type];
      const value = item.value;

      if (required && value.trim() === '') {
        this.LightTip.error(empty || '该项不能为空');
        return false;
      }

      if (pattern && !pattern.test(value)) {
        this.LightTip.error(message);
        return false;
      }

      if (type === 'confirm') {
        const password = this.form.$('[data-validate="password"]').value;

        if (password !== value) {
          this.LightTip.error('两次输入的密码不一致');
          return false;
        }
      }

      return true;
    }

    select(e) {
      const target = e.target;
      const type = target.getAttribute('data-validate');

      if (type === 'required') {
        return this.validate(target, type);
      }
    }


    textarea(e) {
      const target = e.target;
      const type = target.getAttribute('data-validate');

      if (type === 'required') {
        return this.validate(target, type);
      }
    }

  }

  /* -------------------------------------------------------- **
   *  选项卡切换器
   * -------------------------------------------------------- */
  class TabSwitcher extends Utils {

    constructor(tabs, flag) {
      super();
      this.init(tabs, flag);
    }

    init(tabs, flag) {
      this.initParams(tabs, flag);
      this.initEvents();
    }

    initEvents() {
      this.tabs.forEach(tab => {
        tab.addEventListener('click', this.toggle.bind(this, tab));
      });
    }

    toggle(tab) {
      const tabName = tab.getAttribute('data-tab');
      const filters = $$('[data-filter]');
      const target = [...filters].find(item => (
        item.getAttribute('data-filter') === tabName
      ));

      this.$clearFlag(filters, this.flag);
      this.$clearFlag(this.tabs, this.flag);
      target.classList.add(this.flag);
      tab.classList.add(this.flag);
    }

    initParams(tabs, flag) {

      if (!tabs) {
        throw new TypeError('Invalid params, is not an string!');
      }

      this.elm = this.$getElement('[data-tabs="' + tabs + '"]');
      this.tabs = this.elm.$$('[data-tab]');
      this.flag = flag || 'active';
    }
  }

  Fleet.Utils = Utils;
  Fleet.LightTip = LightTip;
  Fleet.Pagination = Pagination;
  Fleet.FormValidator = FormValidator;
  Fleet.TabSwitcher = TabSwitcher;

  return Fleet;
})(this);