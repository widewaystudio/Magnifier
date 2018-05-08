// 查询字符串长度
function bytesLength(str) {
    var len = str.length;
    for (var i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
            len++;
        }
    }
    return len;
}

// 为元素绑定事件

function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attchEvent) {
        elem.attchEvent('on' + type, function() {
            handle.call(elem);
        });
    } else {
        elem['on' + type] = handle;
    }
}

// 继承
function inherit(Target, Origin) {
    function Temp() {};
    Temp.prototype = Origin.prototype;
    Target.prototype = new Temp();
    Target.prototype.constuctor = Target;
    Target.prototype.uber = Origin.prototype;

}

// 检查数据类型
function checkType(para) {
    var type = {
        "[object Object]": "对象",
        "[object Array]": "数组",
        "[object Boolean]": "布尔包装类",
        "[object Number]": "数字包装类",
        "[object Null]": "Null",
        "[object String]": "字符串包装类"
    }
    if (typeof(para) == "object") {
        var str = Object.prototype.toString.call(para);
        str = type[str];
    } else {
        str = typeof(para);
    }
    return str;
}


// 对象深度克隆
function objectClone(Target, Origin) {
    var Temp = Target || {},
        toStr = Object.prototype.toString,
        str = "[object Array]";

    for (var key in Origin) {
        if (Origin.hasOwnProperty([key])) {
            if (Origin[key] !== "null" && typeof(Origin[key]) == "object") {
                // if(toStr.call(Origin[key]) == str){
                //  Temp[key] = [];
                // }else{
                //  Temp[key] = {};
                // }
                Temp[key] = (toStr.call(Origin[key]) == str) ? [] : {};
                objectClone(Temp[key], Origin[key]);
            } else {
                Temp[key] = Origin[key];
            }
        }
    }
    return Temp;
}

// 取消事件监测

function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagetion();
    } else {
        event.cancelBubble = true;
    }
}
//取消默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }

}


function getScrollOffset() {
    if (window.pageXoffset) {
        return {
            x: window.pageXoffset,
            y: window.pageYoffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        };
    }
}


function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        };
    } else {
        if (document.compatMode = "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            };
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            };
        }
    }

}

function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}

// 获取的元素在文档中的left 和 top
function getElementPosition(elem) {
    if (elem.offsetParent.tagName == "BODY") {
        return {
            x: elem.offsetLeft,
            y: elem.offsetTop
        };
    }
    return {
        x: elem.offsetLeft + (function(elem) {
            return getElementPosition(elem);
        }(elem.offsetParent)).x,
        y: elem.offsetTop + (function(elem) {
            return getElementPosition(elem);
        }(elem.offsetParent)).y
    };
}

//取消监听事件封装函数
function cancelEvent(elem, type, fn) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, fn, false);
    } else {
        elem.detachEvent(type, fn);
    }

}

//函数记忆功能

function memorize(fn) {
    var cache = {};
    return function() {
        var key = arguments.length + Array.prototype.join.call(arguments);
        if (cache[key]) {
            return cache[key];
        } else {
            cache[key] = fn.apply(this, arguments);
            return cache[key];
        }
    }
}

// 柯里华函数
function FixedParmasCurry(fn) {
    var _arg = Array.prototype.slice.call(arguments, 1);
    return function() {
        var newArg = _arg.concat(Array.prototype.slice.call(arguments, 0));
        return fn.apply(this, newArg);
    }


}

function Curry(fn, length) {

    var len = length || fn.length;
    return function() {
        var l = arguments.length;
        if (l < length) {
            var combined = [fn].concat(Array.prototype.slice.call(arguments, 0));
            return Curry(FixedParmasCurry.apply(this, combined), length - l);
        } else {
            return fn.apply(this, arguments);
        }
    }


}

// requestAnimframe 方法

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback){
		window.setTimeout(callback, 1000 / 60);
	};
})

// 取消AnimFrame事件
window.cancelAnimFrame = (function(){
	return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(id){
		window.clearTimeout(id);
	};
})