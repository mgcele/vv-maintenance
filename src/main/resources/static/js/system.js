
/// <reference path="../package/jquery.min.js" />
/// <reference path="../package/jquery.cookie.js" />

var System = {};
//System.Object
(function () {
    var _init = false;

    System.Object = function (prop) {
        var _base = this.prototype;
        _init = true;
        var proto = new this();
        _init = false;
        for (var name in prop) {
            proto[name] = typeof prop[name] == "function" &&
            typeof _base[name] == "function" ?
                (function (name, fn) {
                    return function () {
                        var tmp = this.base;
                        this.base = _base[name];
                        var ret = fn.apply(this, arguments);
                        this.base = tmp;
                        return ret;
                    };
                })(name, prop[name]) : prop[name];
        }

        function cls() {
            if (!_init && this.ctor)
                this.ctor.apply(this, arguments);
        }
        cls.prototype = proto;
        cls.constructor = cls;
        cls.Extends = arguments.callee;
        return cls;
    } .apply(Object, []);
})();

//System.List
(function () {
    var _init = false;

    System.List = function (prop) {
        var _base = this.prototype;
        _init = true;
        var proto = new this();

        _init = false;
        for (var name in prop) {
            proto[name] = typeof prop[name] == "function" &&
            typeof _base[name] == "function" ?
                (function (name, fn) {
                    return function () {
                        var tmp = this.base;
                        this.base = _base[name];
                        var ret = fn.apply(this, arguments);
                        this.base = tmp;
                        return ret;
                    };
                })(name, prop[name]) : prop[name];
        }

        function cls() {
            if (!_init && this.ctor)
                this.ctor.apply(this, arguments);
        }
        cls.prototype = proto;
        cls.constructor = cls;
        cls.Extends = arguments.callee;
        return cls;
    } .apply(Array, []);
})();

//---------------------System namespace

//---------------------静态方法
System.$ = function (id) {
    return document.getElementById(id);
};


System.isnull = function (a) {
    if (typeof (a) == "undefined") {
        return true;
    } else if (a == "") {
        return true;
    } else if (a == null) {
        return true;
    }

    return false;
};

System.getProperty = function(obj,propertyName){
	   var ps = propertyName.split(".");
	   
	   var item = obj;
	   for(var i=0;i<ps.length;i++){
		   item = item[ps[i]];
		   if(System.isnull(item)){
			   return null;
		   }
	   }
	   
	   return item;
	};

	System.setProperty = function(obj,propertyName,value){
		   var ps = propertyName.split(".");
		   
		   var item = obj;
		   for(var i=0;i<ps.length-1;i++){
			   item = item[ps[i]];
			   if(System.isnull(item)){
				   return null;
			   }
		   }
		   
		   return item[ps[ps.length-1]] = value;
	};

System.isGuid = function (guid)
{
    if(System.isnull(guid))
    {
        return false;
    }

    if(guid.length!=36)
    {
        return false;
    }

    var lens = [8,13,18,23];

    for(var i=0;i<lens.length;i++)
    {
        if (guid[lens[i]] != "-")
        {
            return false;
        }
    }

    return true;
};

System.isDateTime = function (reObj) {

    var regex = new RegExp("^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$");

    var match = regex.exec(reObj);

    return match != null && match.length > 0;

};

System.Declare = function (ns) {
    ///<summary>声明命名空间</summary>
    ///<param name="ns" type="string">命名空间，如：Netsharp.Core</param>
    var ar = ns.split('.');
    var root = window;
    for (var i = 0, len = ar.length; i < len; ++i) {
        var n = ar[i];
        if (!root[n]) {
            root[n] = {};
            root = root[n];
        }
        else {
            root = root[n];
        }
    }
};

System.ExecuteScript = function (script) {
    ///<summary>运行传入的脚本内容</summary>
    ///<param name="script" type="string">需要执行的脚本内容</param>
    if (!script) return;
    var head = document.getElementsByTagName("head")[0] || document.documentElement,
				scriptEle = document.createElement("script");

    scriptEle.type = "text/javascript";
    try {
        scriptEle.appendChild(document.createTextNode(script));
    }
    catch (exxx) {
        scriptEle.text = script;
    }

    head.insertBefore(scriptEle, head.firstChild);
    try {//增加控制，防止执行关闭页签后的执行错误
        head.removeChild(scriptEle);
    }
    catch (exxx) { }
};


System.Debugger = function (key) {
    if (window.location.href.indexOf(key) > 0) {
        debugger;
    }
};

//---------------------静态方法


//----------------------基础类------------

System.KeyValuePair = System.Object.Extends({
    ctor: function (key, value) {
        if (key && value) {
            this.key = key;
            this.value = value;
        }
    },
    key: null,
    value: null
});

System.Dictionary = System.Object.Extends({

    ctor: function () {
        this.innerValues = new Array();
    },

    byKey: function (key) {
        for (var i = 0; i < this.innerValues.length; i++) {

            var kv = this.innerValues[i];
            if (kv.key == key) {

                return kv.value;
            }
        }

        return null;
    },
    byIndex: function (index) {

        return this.innerValues[index];

    },

    add: function (key, value) {

        if (this.byKey(key) != null) {
            return;
        }

        var kv = new System.KeyValuePair();
        kv.key = key;
        kv.value = value;

        this.innerValues.push(kv);
    },

    tryGet: function (key, value) {

        for (var i = 0; i < this.innerValues.length; i++) {

            var kv = this.innerValues[i];
            if (kv.key == key) {

                value = kv.value;

                return true;
            }
        }

        return false;
    },

    getLength: function () {
        return this.innerValues.length;
    },

    count: function (filter) {
        return this.getLength();
    }
});


System.StringBuilder = System.Object.Extends({

    ctor: function () {
        this.innerValue = "";
        this.newLine = "\r\n";

    },

    append: function (value) {
        this.innerValue += value;
    },

    appendLine: function (value) {
        this.innerValue += (value + this.newLine);
    },

    ToString: function () {
        return this.innerValue;
    }
});

//-------------------------------------------------------------------------------------------------------------------------------

System.Url = {

    rootPath: null,
    queryString: null,
    virtualPath: null,

    GetVirtualPath: function () {
        ///<returns type="string"/>
        if (this.virtualPath) return this.virtualPath;

        if (!this.rootPath) {
            var f = location.pathname;
            if (location.pathname.indexOf('/') == 0) {
                f = location.pathname.substring(1);
            }

            if (f.indexOf('/') >= 0) {
                f = f.substring(0, f.indexOf('/'));
            }
            this.rootPath = '/' + f;
        }

        var s = location.protocol + '//' + location.host;

        s += this.rootPath;
        if (this.rootPath == "/") this.virtualPath = s;
        else {
            this.virtualPath = s + '/';
        }
        return this.virtualPath;
    },

    ParseUrl: function (url) {
        var result = {};
        var loc = url;
        if (loc.indexOf("?") > -1) {
            var l = loc.lastIndexOf("#") > -1 ? loc.lastIndexOf("#") : loc.length;
            var param_str = loc.substring(loc.indexOf("?") + 1, l);
            var params = param_str.split("&");
            for (var x = 0; x < params.length; x++) {
                params[x] = params[x].split("=");
                result[params[x][0]] = params[x][1];
            }
        }
        return result;
    },

    Get: function (key) {

        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            var x = unescape(r[2]);
            return decodeURI(x);
        }
        else {
            return null;
        }

    },

    Replace: function (url, key, val) {
        //替换指定传入参数的值,Key为参数,Val为新值
        var re = eval('/(' + key + '=)([^&]*)/gi');
        var nUrl = url.replace(re, key + '=' + val);
        return nUrl;
    },
    GetQueryStringItems: function (url) {
        var u = url || location.href;
        var obj = this.ParseUrl(u);
        return obj;
    },

    Combine: function (url, param) {
        ///<summary>组合Url</summary>
        ///<param name="url" type="string">原始的url，如：Default.aspx</param>
        ///<param name="param" type="object">参数对象，如：{ID:'XXXX',Type:'New'}</param>
        ///<returns type="string"/>

        var ar = [];
        url = this.getUrl(url);
        if (param) {
            for (var i in param) {
                if (typeof param[i] == 'string' ||
                    typeof param[i] == 'boolean' ||
                    typeof param[i] == 'number') {
                    ar.push(i + "=" + param[i].toString());
                }
            }
        }
        var m = '';
        if (ar.length > 0) {
            m = ar.join('&');
        }

        if (url.indexOf('?') > 0) {
            url += '&' + m;
        }
        else {
            url += '?' + m;
        }

        return url;
    },

    join: function (url, parmeters) {
        if (url.indexOf("?") > 0) {
            return url + "&" + parmeters;
        }
        else {
            return url + "?" + parmeters;
        }
    },

    getUrl: function (url) {

        if (window.location.hostname == "localhost" || window.location.hostname.indexOf('192.168') == 0) {

            return url;
        }

        var path = "/";

        if (path[path.length - 1] != '/') {
            path += "/";
        }

        if (url[0] == '/') {
            url = url.substring(1);
        }

        path += url;

        return path;
    }
};

//-------------------------------------------------------------------------------------------------------------------------------

System.Data = {};
// 摘要: 
//     指定 .NET Framework 数据提供程序的字段、属性或 Parameter 对象的数据类型。
System.Data.DbType =
{
    // 摘要: 
    //     非 Unicode 字符的可变长度流，范围在 1 到 8,000 个字符之间。
    AnsiString: 0,
    //
    // 摘要: 
    //     二进制数据的可变长度流，范围在 1 到 8,000 个字节之间。
    Binary: 1,
    //
    // 摘要: 
    //     一个 8 位无符号整数，范围在 0 到 255 之间。
    Byte: 2,
    //
    // 摘要: 
    //     简单类型，表示 true 或 false 的布尔值。
    Boolean: 3,
    //
    // 摘要: 
    //     货币值，范围在 -2 63（即 -922,337,203,685,477.5808）到 2 63 -1（即 +922,337,203,685,477.5807）之间，精度为千分之十个货币单位。
    Currency: 4,
    //
    // 摘要: 
    //     表示日期值的类型。
    Date: 5,
    //
    // 摘要: 
    //     表示一个日期和时间值的类型。
    DateTime: 6,
    //
    // 摘要: 
    //     简单类型，表示从 1.0 x 10 -28 到大约 7.9 x 10 28 且有效位数为 28 到 29 位的值。
    Decimal: 7,
    //
    // 摘要: 
    //     浮点型，表示从大约 5.0 x 10 -324 到 1.7 x 10 308 且精度为 15 到 16 位的值。
    Double: 8,
    //
    // 摘要: 
    //     全局唯一标识符（或 GUID）。
    Guid: 9,
    //
    // 摘要: 
    //     整型，表示值介于 -32768 到 32767 之间的有符号 16 位整数。
    Int16: 10,
    //
    // 摘要: 
    //     整型，表示值介于 -2147483648 到 2147483647 之间的有符号 32 位整数。
    Int32: 11,
    //
    // 摘要: 
    //     整型，表示值介于 -9223372036854775808 到 9223372036854775807 之间的有符号 64 位整数。
    Int64: 12,
    //
    // 摘要: 
    //     常规类型，表示任何没有由其他 DbType 值显式表示的引用或值类型。
    Object: 13,
    //
    // 摘要: 
    //     整型，表示值介于 -128 到 127 之间的有符号 8 位整数。
    SByte: 14,
    //
    // 摘要: 
    //     浮点型，表示从大约 1.5 x 10 -45 到 3.4 x 10 38 且精度为 7 位的值。
    Single: 15,
    //
    // 摘要: 
    //     表示 Unicode 字符串的类型。
    String: 16,
    //
    // 摘要: 
    //     一个表示 SQL Server DateTime 值的类型。如果要使用 SQL Server time 值，请使用 System.Data.SqlDbType.Time。
    Time: 17,
    //
    // 摘要: 
    //     整型，表示值介于 0 到 65535 之间的无符号 16 位整数。
    UInt16: 18,
    //
    // 摘要: 
    //     整型，表示值介于 0 到 4294967295 之间的无符号 32 位整数。
    UInt32: 19,
    //
    // 摘要: 
    //     整型，表示值介于 0 到 18446744073709551615 之间的无符号 64 位整数。
    UInt64: 20,
    //
    // 摘要: 
    //     变长数值。
    VarNumeric: 21,
    //
    // 摘要: 
    //     非 Unicode 字符的固定长度流。
    AnsiStringFixedLength: 22,
    //
    // 摘要: 
    //     Unicode 字符的定长串。
    StringFixedLength: 23,
    //
    // 摘要: 
    //     XML 文档或片段的分析表示。
    Xml: 25,
    //
    // 摘要: 
    //     日期和时间数据。日期值范围从公元 1 年 1 月 1 日到公元 9999 年 12 月 31 日。时间值范围从 00:00:00 到 23:59:59.9999999，精度为
    //     100 毫微秒。
    DateTime2: 26,
    //
    // 摘要: 
    //     显示时区的日期和时间数据。日期值范围从公元 1 年 1 月 1 日到公元 9999 年 12 月 31 日。时间值范围从 00:00:00 到 23:59:59.9999999，精度为
    //     100 毫微秒。时区值范围从 -14:00 到 +14:00。
    DateTimeOffset: 27
};

Loglevel = undefined;

System.Log = {
    info: function (message) {

        //        if (typeof console == 'undefined')
        //        {
        //            return;
        //        }

        //        var d = new Date();
        //        var msg = message;
        //        console.info(msg);
    },
    assert: function (condition, message) {

        //        if (typeof console == 'undefined') {
        //            return;
        //        }

        //        console.assert(condition, message);
    }
};


System.LocalData = {
    storage: window.localStorage,
    get: function (key) {
        if (!this.storage)
            return null;
        return this.storage.getItem(key);
    },
    set: function (key, value) {
        if (!this.storage)
            return;
        this.storage.setItem(key, value);
    },
    remove: function (key) {
            if (!this.storage)
            return false;
        this.storage.removeItem(key);
    }
};


System.Cookies = {
    //    getCookieAdapter: function () {
    //        (function () { }).apply(jquery, arguments);
    //    },
    get: function (name) {

        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));

        if (arr != null) return unescape(arr[2]); return null;
    },
    set: function (name, value, expires) {

        this.remove(name);

        var Days = expires || 7;

        var exp = new Date();

        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    },
    remove: function (name) {

        var exp = new Date();

        exp.setTime(exp.getTime() - 1);

        var cval = this.get(name);

        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    }
};


String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};

String.format = function () {
    if (arguments.length == 0) return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

