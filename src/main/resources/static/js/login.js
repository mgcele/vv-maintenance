/**
 * 依赖的脚本： jquery,layer.js
 *
 * Created by kxh on 2015/8/1.
 */
(function (ns) {
    declare(ns);
    var modules = eval(ns);

    var Login = function (options) {
        options          = options || {};
        this.isLogin     = false;
        this.userId      = 0;
        this.ctxPath     = options.ctxPath || "";
        this.title       = options.title || '用户登录';
        this.dialogId    = "user_login_" + Math.round(Math.random() * 1000);
        this.account     = this.dialogId + "_name";
        this.pwd         = this.dialogId + "_pwd";
        this.dialogStyle = '<style>' + '*{ -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; }\n' + '#' + this.dialogId + ' { padding:0; margin:0 auto; width:90% }\n' + '#' + this.dialogId + ' li{ padding:0; margin:0; }\n' + '#' + this.dialogId + ' li{ list-style:none; position:relative; padding:1.5em 0 0 4em; font-size:1em; }\n' + '#' + this.dialogId + ' li input{ height:2em; line-height:2em; font-size:1em; width:100%; -webkit-border-radius:5px; -moz-border-radius:5px; border-radius:5px; border:1px solid #ccc; }\n' + '#' + this.dialogId + ' li label{ height:2em; line-height:2em; font-size:1em; position:absolute; left:0; }\n' + '#' + this.dialogId + ' button{ border-radius:5px; padding:0.4em 1.5em; border:1px solid #ccc; }\n' + '</style>';
        this.dlgDomHtml  = '<ul><li><label>手机号：</label> <input type="tel" required="required" maxlength="11" id="' + this.account + '"/></li><li><label>密码：</label> <input type="password" required="required" id="' + this.pwd + '"/></li><li><a href="/nav/weixin/user/regist">立即注册</a></li></ul>';

        this.init();
    };

    Login.prototype.init = function () {
        var me = this;
        me.isUserLogined();
    };

    /**
     * 判断当前用户是否登录
     */
    Login.prototype.isUserLogined = function () {
        var me  = this;
        var url = me.ctxPath + "/weixin/isOnline";
        $.getJSON(url, function (res) {
            console.info(res);
            if (res.type == 'info' && res.data > 0) {
                me.userId  = res.data;
                me.isLogin = me.userId > 0;
                console.info("已登录");
            }
        });
    };

    /**
     * 创建对话框dom对象，只创建一次
     */
    Login.prototype.createDialog = function () {
        var me = this;
        if (!me.dialogDom) {
            $(me.dialogStyle).appendTo(document.head);
            me.dialogDom = $(me.dlgDomHtml).appendTo(document.body);
            me.dialogDom.attr("id", me.dialogId);
        }
    };

    /**
     * 显示登录窗口
     */
    Login.prototype.showDialog = function (callback) {
        var me = this;
        me.createDialog();

        me.loginDialog = Layer.dialog({
            dom   : me.dialogDom,
            title : me.title,
            area  : ['90%', '260px'],
            offset: ['', ''],
            btn   : ['取消', '登录'],
            no    : function (index) {
                var name        = document.getElementById(me.account).value;
                var pwd         = document.getElementById(me.pwd).value;
                var isAutoLogin = true;
                doLogin.call(me, name, pwd, isAutoLogin, function () {
                	callback();
                    me.loginDialog.hide();
                });
            }
        });
    };

    function doLogin(name, pwd, isautologin, callback) {
        var me     = this;
        var url    = me.ctxPath + "/user/login";
        var params = {
            loginName: name,
            password : pwd,
            atlogin  : !!isautologin
        };
        $.post(url, params, function (res) {
            console.info(res);
            if (res.type == 'info') {
                //alert('登录成功！');
            	me.isUserLogined();
                callback();
            }else{
            	alert(res.message);
            }
        });
    }

    modules['Login'] = Login;

    function declare(ns) {
        var ar   = ns.split('.');
        var root = window;
        for (var i = 0, len = ar.length; i < len; ++i) {
            var n = ar[i];
            if (!root[n]) {
                root[n] = {};
            }
            root = root[n];
        }
    }
}("com.ykx.user"));