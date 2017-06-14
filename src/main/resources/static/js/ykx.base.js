!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        t    = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
        t.com = e();
    }
}(function () {
    var com = window.com || {};
    com.ykx = com.ykx || {};

    /**
     * 系统环境对象
     * @constructor
     */
    com.ykx.Env = {
        isWeixinEnv     : function () {
            var micromessenger = "micromessenger/";
            var ua             = navigator.userAgent.toLowerCase();
            var index          = ua.indexOf(micromessenger);
            if (index < 0) {
                return false; // 非微信环境
            }
            var start   = index + micromessenger.length;
            var version = ua.substring(start, start + 3);
            version     = parseFloat(version);
            return version >= 5.0;
        },
        isMobile        : function (checkStr) {
            checkStr = checkStr || "";
            checkStr = $.trim(checkStr);
            if (checkStr.length != 11) {
                return false;
            }
            var regExp = /^1[34578]\d{9}$/;
            return regExp.test(checkStr);
        },
        // 姓名中不能有特殊符号和空白字符
        UserNameCheckReg: new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\\s]"),
        isValidUserName : function (userName) {
            userName = userName || "";
            if (userName.length > 0) {
                userName = $.trim(userName);
            }
            if (userName.length == 0) {
                return false;
            }
            return !com.ykx.Env.UserNameCheckReg.test(userName);
        },
        isValidPassword : function (pwd) {
            pwd = pwd || "";
            return /^[^\s]{6,16}$/.test(pwd);
        },
        isCarNo         : function (str) {
            str = str || "";
            if (str.length > 0) {
                str = $.trim(str);
            }
            // 仅适用于民用车辆
            return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Za-z0-9]{6}$/.test(str);
        }
    };
    /*******************alipay支付组件*****************/
    com.ykx.Alipayer = function () {
        this.pay = function (billType, billId) {
            window.location.href = "/aliPay/pay/" + billType + "/" + billId;
        }
    };

    /*******************微信支付组件*****************/
// 微信支付辅助类
    com.ykx.WeixinPayer = function (options) {
        options        = options || {};
        this.onSuccess = options.onSuccess; // 支付成功
        this.onCancel = options.onCancel; // 支付取消
        this.onFail = options.onFail || options.onCancel; // 支付失败
    };
    com.ykx.WeixinPayer.prototype.pay = function (billType, billId) {
        var me = this;
        if (!com.ykx.Env.isWeixinEnv()) {
            return false;
        }

        var url = "/weixin/pay/" + billType + "/" + billId;
        var options = {
            dataType: "json",
            type    : "GET",
            url     : url,
            success : function (result) {
                if (result.type == "info") {
                    var jsPay = result.data;
                    me.doPay(jsPay);
                } else {
                    var msg = result.message;
                    if (msg == "ACT_END") { // 活动下单次数超过渠道限制，转至活动结束页面
                        window.location.replace("/nav/weixin/act/actend");
                    } else if (msg.substr(0, 4) == "http") {
                        window.location.replace(msg);
                    } else if (msg == "001") {
                        alert("无效的支付参数！");
                    } else if (me.onFail) {
                        me.onFail(billType, billId);
                    }
                }
            },
            error   : function (xhr, type) {
                console.info(xhr);
                //alert(JSON.stringify(xhr));
            }
        };
        $.ajax(options);
    };

    com.ykx.WeixinPayer.prototype.doPay = function (jsPay) {
        var me = this;

        delete jsPay.appId;
        jsPay.timestamp = jsPay.timeStamp;
        delete jsPay.timeStamp;

        jsPay.complete = function (res) {
            var msg        = "";
            var onComplete = null;

            if (res.errMsg == "chooseWXPay:ok") {
                msg        = "订单支付成功！";
                onComplete = me.onSuccess;
            } else if (res.errMsg == "chooseWXPay:cancel") {
                msg        = "已下单：支付被取消";
                onComplete = me.onCancel;
            } else if (res.errMsg == "chooseWXPay:fail") {
                msg        = "已下单：支付失败";
                onComplete = me.onFail || me.onCancel;
            }
            // 如果未定义跳转页面，使用缺省的跳转页面
            if (!onComplete) {
                onComplete = me.onSuccess;
            }
            if (onComplete && typeof onComplete == 'function') {
                onComplete();
            }
            //
            //var payResult = {
            //    orderId: me.orderId,
            //    err_msg: encodeURI(res.errMsg)
            //};
            //var url       = "/weixin/onpayed";
            //$.ajax({
            //    contentType: "application/json",
            //    dataType   : "json",
            //    type       : "POST",
            //    url        : url,
            //    data       : JSON.stringify(payResult),
            //    success    : function (result) {
            //        if (result.type == 'info') {
            //            alert(msg);
            //            if (onComplete && typeof onComplete == 'function') {
            //                onComplete.call(null, me.orderId);
            //            }
            //        } else {
            //            alert(result.message);
            //            return false;
            //        }
            //    },
            //    error      : function (xhr, type) {
            //        alert(JSON.stringify(xhr));
            //        return false;
            //    }
            //});
        };

        // 调起微信支付
        if (typeof jWeixin != 'undefined') {
            jWeixin.chooseWXPay(jsPay);
        }
    };

    /**
     * 短信发送组件
     * @param phoneInputId
     * @param sendBtnId
     * @param codeInputId
     * @param usageMode
     * @returns {com.ykx.SmsCodeManager}
     * @constructor
     */
    com.ykx.SmsCodeManager = function (phoneInputId, sendBtnId, codeInputId, usageMode) {
        // [register,fallback,normal]
        usageMode = usageMode || "normal";

        this.contextPath = "";
        this.isVoiceSms  = false; // true表示语音验证码，false:表示短信验证码

        var stateInterval = null;
        var jqSendBtn     = $(sendBtnId);

        var oldBg = jqSendBtn.css("background-color");
        //
        this.init     = function (contextPath) {
            var me         = this;
            me.contextPath = contextPath;
            jqSendBtn.text("短信验证码");
            jqSendBtn.css("width", "9em");
            //jqSendBtn.css("background", oldBg + " url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAwADADAREAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAMGAQQCBQcI/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAfqkAAHltnCzMDBIvay2yzbgalVOWFLpUSZJFpcdbRAAX1SUAAf/xAAgEAABAwQCAwAAAAAAAAAAAAACAAMFBAYSFgETFCA2/9oACAEBAAEFAvaVCplri1lxay4tZcWsuKKCpibipPtCIWTwWCExeOq+0ZPC9AFdnjLs8lOCnjzvSV5qIq5dncWzuLZ3Fs7iiuaiVuT2/8QAGBEAAwEBAAAAAAAAAAAAAAAAACAhATD/2gAIAQMBAT8BelKXtq4//8QAFhEAAwAAAAAAAAAAAAAAAAAAMDFA/9oACAECAQE/AZUf/8QAKhAAAQMCAwYHAQAAAAAAAAAAAgADBAEFMTWUEiFRdIKyERQgMlJhoRD/2gAIAQEABj8C9T0OkyRFjR4zbnhGc2KkREWNelZpc9YazO56w1mdz1hrNLnrDTMOsyRKjSIzjnhJPbqJCQ4V6lcuSY7nFQSwLD6/tRHAcftW3kn+5tXLkmO5xVIvcX5Rb97XH4rdua4/JUIfcP7TgrbyT/c2nZ3k5EqO/GBulYwbdRISLGnUsqumjJZVdNGSyq6aMllV00ZJqd5ORFjsRjbrWSGxUiIhwp0+v//EAB8QAQABBAIDAQAAAAAAAAAAAAEAESFhwTHwIEFRcf/aAAgBAQABPyHyq1hMIqhegC2Z3Tc65udc3O6blWsJpFFL0RWwT2+I7qfZtjMo+Sj5Gc4qtMZnrxzYxiqcSonOCXaN9PJ/WJdvfbwfxiDU4FQOIBYRii+aslBvcFHjmdl1Ow6nYdTsOo1XzVkgt7Cq+f8A/9oADAMBAAIAAwAAABCSSSRLCTYTSkKJJSSST//EAB0RAAMAAQUBAAAAAAAAAAAAAAABERAgITFBYXH/2gAIAQMBAT8Q1O9FFFFCveHsQgt3MNi9LPhaPwTEb4IyMjIxGudf/8QAHBEAAwACAwEAAAAAAAAAAAAAAAERECEgQXGB/9oACAECAQE/EOSnZEREREOdY2ylNreEqMl9J9CGoJwqKioqG7z/AP/EACEQAQACAgEFAAMAAAAAAAAAAAERIQAxYRAgQVFxgbHB/9oACAEBAAE/EO4rtm88XwIULLLEAeX71ly4p4ciPbNd4vgFqWEMyBMSgRwEzO+ZhvhYtqQdmcDoLLLCplrlRpuENOEDEBAGDUwOjbi6fgnwf2+14MPnHXiwt9W0m6sqHpw8GVnOliqtJDxCnkX7PScuP3J+QxqBCzNJYhCyAwxPZy9evVxIWZpLEIQlAlmO7//Z')");
            //jqSendBtn.css("background-repeat", "no-repeat");

            jqSendBtn.unbind("click");
            jqSendBtn.bind("click", function () {
                me.sendCode();
            });
            //
            return me;
        };
        this.pause    = function () {
            jqSendBtn.prop("disabled", true);
            jqSendBtn.css("color", "#666");
            jqSendBtn.css("background-color", "#999");
        };
        this.resume   = function () {
            jqSendBtn.prop("disabled", false);
            jqSendBtn.css("color", "#000");
            jqSendBtn.css("background-color", oldBg);

            if (this.isVoiceSms) {
                jqSendBtn.text("语音验证码");
            } else {
                jqSendBtn.text("短信验证码");
            }
        };
        this.sendCode = function () {
            var me = this;
            me.pause();
            var phone = $(phoneInputId).val();
            if (!com.ykx.Env.isMobile(phone)) {
                alert("请输入正确的手机号码");
                me.resume();
                return;
            }
            var params      = {"phoneNumber": phone, "isVoice": this.isVoiceSms};
            var url         = me.contextPath + "/newaccount/sendCode/" + usageMode;
            var options     = {
                url        : url,
                type       : "POST",
                dataType   : "json",
                contentType: "application/json",
                data       : JSON.stringify(params)
            };
            options.success = function (result, jqXHR) {
                if (result != null && result.type != "info") {
                    jqSendBtn.time = 2;
                    stateInterval  = setInterval(function () {
                        if (jqSendBtn.time > 1) {
                            jqSendBtn.time--;
                        } else {
                            clearInterval(stateInterval);
                            me.resume();
                        }
                    }, 1000);
                    //
                    alert(result.message);
                } else {
                    jqSendBtn.time = 30;
                    stateInterval  = setInterval(function () {
                        if (jqSendBtn.time > 1) {
                            jqSendBtn.time--;
                            jqSendBtn.text("(" + jqSendBtn.time + ")");
                        } else {
                            clearInterval(stateInterval);
                            //
                            me.resume();
                        }
                    }, 1000);
                }
            };
            $.ajax(options);

            // 语音和短信轮换
            this.isVoiceSms = !this.isVoiceSms;

            return true;
        };

        this.checkCode = function () {
            var me      = this;
            var theCode = $(codeInputId).val();
            if (theCode == "") {
                return false;
            }
            var phone       = $(phoneInputId).val();
            var isValidCode = false;
            //
            $.ajaxSettings.async = false; // 设置同步
            var url = me.contextPath + "/newaccount/checkCode/" + phone + "/" + theCode;
            $.getJSON(url, function (result, jqXHR) {
                if (result != null && result.type != "info") {
                    alert("请输入有效的验证码");
                } else {
                    isValidCode = true;
                }
            });
            $.ajaxSettings.async = true; // 恢复为异步
            return isValidCode;
        };
        //
        return this;
    };

    return com;
});