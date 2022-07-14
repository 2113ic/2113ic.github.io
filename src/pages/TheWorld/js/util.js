const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

/**
 * 异步读取文件
 * @param {object} file 文件对象
 * @returns file的promise
 */
function readFileAsync(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = evt => resolve(evt.target.result);
        reader.readAsText(file);
    });
}

/**
 * 文件下载
 * @param {String} content 需要下载的文件的内容
 * @param {String} filename 需要下载的文件名
 */
 function fileDownload(content, filename) {
    // 创建隐藏的可下载链接
    let eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    let blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 移除
    document.body.removeChild(eleLink);
}

/**
 * 克隆节点
 * @param {element} node 需要克隆的节点
 * @param {number} num 克隆数量
 * @param {Boolean} deep 可选。克隆深度。默认为false
 * @param {element} parentNode 可选。需要克隆到的节点。默认值为父节点。
 * @param {pattern} pattern 可选。插入方式。默认为添加到末尾。
 */
function cloneNode(node, num, deep, parentNode, pattern) {
    const container = parentNode || node.parentNode;
    const pat = pattern || "append";
    deep = deep || false;
    
    for (let i = 0; i < num; i++) {
        const cloneNode = node.cloneNode(deep);
        container[pat](cloneNode);
    }
}

/**
 * 拖拽
 * @param {element} element 拖拽区域的元素
 * @param {function} handleEvent 拖拽文件的事件处理函数
 */
function drop(element, handleEvent) {
    element.addEventListener("dragenter", dragenter);
    element.addEventListener("dragover", dragover);
    element.addEventListener("drop", drop);

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;
        handleEvent(files);
    }
}

/**
 * 为元素设置样式
 * @param {element} ele 元素
 * @param {Object} obj 包含键值对的对象。
 */
function elementStyle(ele, obj) {
    Object.entries(obj).forEach((item) => {
        const [key, value] = item;
        ele.style[key] = value;
    });
}


/**
 * 获取json文件的数据。
 * @param {String} url url
 * @returns p
 */
async function getJsonData(url) {
    return await (await fetch(url)).json();
}