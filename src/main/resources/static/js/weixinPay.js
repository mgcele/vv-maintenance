// 微信支付辅助类
var WeixinPayer = System.Object.Extends({
    orderId     : null,
    pid         : null,
    onPaySuccess: null, // 订单支付回调函数
    onSuccess   : null,
    onCancel    : null,
    onFail      : null,
    pay         : function (billType, billId) {
        var me       = this;
        this.orderId = billId;
        if (!this.validate()) {
            return;
        }
        if (!me.onSuccess && typeof me.onSuccess != 'function') {
            me.onSuccess = function (billId) {
                window.location.replace("/nav/weixin/order/orderSuccess?orderId=" + billId);
            };
        }
        if (!me.onCancel && typeof me.onCancel != 'function') {
            me.onCancel = function (billId) {
                window.location.replace("/nav/weixin/order/orderCancel?type=order&id=" + billId);
            };
        }
        if (!me.onFail && typeof me.onFail != 'function') {
            me.onFail = me.onCancel;
        }

        var url = "/weixin/pay/" + billType + "/" + billId;
        var options = {
            dataType: "json",
            type    : "GET",
            url     : url,
            success : function (result) {
                if (result.type == 'info') {
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
                        return false;
                    }
                    me.onFail();
                }
            },
            error   : function (xhr, type) {
                alert(JSON.stringify(xhr));
                me.onFail();
            }
        };
        $.ajax(options);
    },
    weixinPay   : this.pay,
    doPay       : function (jsPay) {
        var me = this;

        delete jsPay.appId;
        jsPay.timestamp = jsPay.timeStamp;
        delete jsPay.timeStamp;

        jsPay.complete = function (res) {
            var onComplete = null;
            if (res.errMsg == "chooseWXPay:ok") {
                onComplete = me.onSuccess;
            } else if (res.errMsg == "chooseWXPay:cancel") {
                onComplete = me.onCancel;
            } else if (res.errMsg == "chooseWXPay:fail") {
                onComplete = me.onFail;
            }
            // 如果未定义跳转页面，使用缺省的跳转页面
            if (!onComplete) {
                onComplete = me.onSuccess;
            }
            if (onComplete && typeof onComplete == 'function') {
                onComplete.call(null, me.orderId);
            }
        };
        //
        if (typeof jWeixin != 'undefined') {
            jWeixin.chooseWXPay(jsPay);
        }
    },
    validate    : function () {
        var micromessenger = "micromessenger/";
        var ua             = navigator.userAgent.toLowerCase();
        var index          = ua.indexOf(micromessenger);
        if (index < 0) {
            alert("请从微信浏览器进入");
        }
        var start   = index + micromessenger.length;
        var version = ua.substring(start, start + 3);
        version     = parseFloat(version);
        return version >= 5.0;
    }
});
