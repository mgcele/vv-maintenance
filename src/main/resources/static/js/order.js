var com = window.com || {};
com.ykx = com.ykx || {};

/**
 * 系统环境对象
 * @constructor
 */
com.ykx.Env = {
        isWeixinEnv: function () {
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
        isMobile   : function (checkStr) {
                if (checkStr == null || checkStr.length != 11) {
                        return false;
                }
                checkStr   = $.trim(checkStr);
                var regExp = /^1[34578]\d{9}$/;
                return regExp.test(checkStr);
        },
        isCarNo    : function (str) {
                str = str || "";
                if (str.length > 0) {
                        str = $.trim(str);
                }
                // 仅适用于民用车辆
                return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Za-z0-9]{6}$/.test(str);
        }
};

com.ykx.Order = function (options) {
        options = options || {};

        this.goodsTypeId = options.goodsTypeId || 0;

        // 选择车型的触发对象id
        this.wrapperId           = options.wrapperId;
        // 选择服务的触发对象id
        this.goodsWrapperId      = options.goodsWrapperId;
        // 选择联系方式的触发对象id
        this.linkInfoWrapperId   = options.linkInfoWrapperId;
        // 订单金额
        this.orderPriceWrapperId = options.orderPriceWrapperId;
        // 选择车型的触发对象id
        this.carWrapperId        = options.carWrapperId;

        this.submitButtonId = options.submitButtonId;

        this.payWrapperId   = options.payWrapperId;
        //
        this.couponId       = options.couponId || 0;
        this.salesChannelId = options.scid || 0;

        // 登录控制器
        this.userLoginCtrl = new com.ykx.user.Login({});

        // 订单支付控制器
        var isWeixinEnv = com.ykx.Env.isWeixinEnv();
        this.orderPayer = isWeixinEnv ? new WeixinPayer() : new this.Alipayer();

        this.initOrderContext(this.render);
};

// 支付宝支付辅助类
com.ykx.Order.prototype.Alipayer = function () {
        this.pay = function (billType, orderId) {
                var url = "/aliPay/pay/order/" + orderId;
                window.location.replace(url);
        };
};

// 消息定义
com.ykx.Order.message = {
        shop     : {select: 'shop.select'},
        serverWay: 'serverWay.select'
};

com.ykx.Order.prototype.render = function () {
        var context = this.context;

        context._self = this;

        // 联系方式模型
        this.linkInfoView = React.render(React.createElement(this.LinkinfoListView, {
                ctx: context}), document.getElementById("divLinkInfo"));
        this.linkInfoCtrl = React.render(React.createElement(this.LinkinfoController, {
                ctx: context}), document.getElementById(this.linkInfoWrapperId));

        // 订单金额控制器
        this.orderPriceCtrl = React.render(
                React.createElement(this.OrderPriceController, {ctx: context}), document.getElementById(this.orderPriceWrapperId));

        // 服务项目模型
        this.goodsView = React.render(
                React.createElement(this.GoodsListView, {ctx: context}), document.getElementById("divGoods"));
        this.goodsCtrl = React.render(
                React.createElement(this.GoodsController, {ctx: context}), document.getElementById(this.goodsWrapperId));

        this.carTypeCtrl = React.render(
                React.createElement(this.CarTypeController, {ctx: context}), document.getElementById(this.carWrapperId));

        // 时间组件
        this.serviceTimeCtrl = React.render(
                React.createElement(this.ServiceTimeController, {ctx: context}), document.getElementById("timeSection"));

        this.paymentCtrl = new this.PaymentController().init(this.context);

        // 门店组件
        // test data
        // context.couponShops = [
        //         {shopId: 10, shopName: '门店1门店门店门店门店门店门店门店门店', shopLevel: 'S2', shopType: '挂牌', shopAddress: '地址在哪里？'},
        //         {shopId: 11, shopName: '门店2', shopLevel: 'S3', shopType: '合作', shopAddress: '地址在哪里？？？'}
        // ];

        // // 是否支持选择门店
        // this.supportSelectShop = (context.couponShops || []).length > 0;
        // if (this.supportSelectShop) {
        //         this.supportOnSiteService = false;
        // }
        // // 特殊渠道下单，不支持上门
        // else if (context.couponProjectId == 128) {
        //         this.supportOnSiteService = false;
        // }
        // else {
        //         this.supportOnSiteService = true;
        // }
        // //
        // context.isSupportLiveService = this.supportOnSiteService;

        this.supportOnSiteService = context.isSupportLiveService;
        this.supportSelectShop    = (context.couponShops || []).length > 0;

        if (this.supportOnSiteService) {
                $("#hack_128").show();
                this.onsiteServerCtrl = React.render(
                        React.createElement(this.OnsiteServerController, {ctx: context}), document.getElementById("onsitesrv_panel"));
        }
        // this.supportSelectShop = true; // just for debug
        if (this.supportSelectShop) {
                var shopSelector = React.render(
                        React.createElement(this.ShopSelector, {ctx: context}), document.getElementById("divShopInfo"));
                this.shopCtrl    = React.render(React.createElement(this.ShopController, {
                                ctx: context, shopSelector: shopSelector}),
                        document.getElementById("shopWrapper"));
                $("#shopWrapper").parent().show();
        }

        $("#" + this.submitButtonId).click(function () {
                this.submit();
        }.bind(this));

        $("#pageLoading").hide();
};

/**
 * 获取所有需要提交的数据项
 * @returns {{goodsIds: null, linkInfoId: null, carTypeId: null}}
 */
com.ykx.Order.prototype.getNeedSubmitData = function () {
        var carTypeId = this.carTypeCtrl.getSubmitData();
        if (carTypeId == 0) {
                Toast.show("请选择车型！", null, "warn");
                return null;
        }
        var goodsIds = this.goodsCtrl.getSubmitData();
        if (goodsIds.length == 0) {
                Toast.show("请选择服务项目！", null, "warn");
                return null;
        }
        var paymentType = this.paymentCtrl.getPaymentType();
        var balance     = this.orderPriceCtrl.getSubmitData();
        var planTime    = this.serviceTimeCtrl.getSubmitData();
        var ct          = this.context.channelType;
        if (this.context.showPlanTime && ct != 'market' && !planTime) {
                Toast.show("请选择服务日期！", null, "warn");
                return null;
        }
        var onsiteService = null;
        if (this.supportOnSiteService) {
                onsiteService = this.onsiteServerCtrl.getSubmitData();
                if (onsiteService == null) {
                        Toast.show("请选择上门或到店！", null, "warn");
                        return null;
                }
        } else {
                onsiteService = false;
        }
        //晚上19:00后不能预约第二天的技师上门服务!
        var diff = new Date(new Date(planTime).format("yyyy-MM-dd")).valueOf() - new Date(new Date().format("yyyy-MM-dd")).valueOf();
        var diff_day = parseInt(diff/(1000*60*60*24));
        if(diff_day==1&&(new Date()).getHours()>=19&&onsiteService){
        	Toast.show("晚上19:00后不能预约第二天的技师上门服务!", 5000, "warn");
            return null;
      }
        var linkinfo = this.linkInfoCtrl.getSubmitData();
        if (linkinfo == null) {
                Toast.show("请设置您的联系方式！", 3000, "warn");
                return null;
        } else if (linkinfo.area.length == 0 && onsiteService) {
                Toast.show("请补全联系方式中的地址信息！", 3000, "warn");
                return;
        }
        // 选择的门店
        var shopId = 0;
        if (this.supportSelectShop && !onsiteService) {
                shopId = this.shopCtrl.getSubmitData();
                if (shopId == null) {
                        Toast.show("请选择服务门店", null, "warn");
                        return null;
                }
        }
        // 车牌号必须输入
        var plateNumber = $("#plateNumber").val();
        if (!com.ykx.Env.isCarNo(plateNumber)) {
                Toast.show("请输入正确的车牌号", null, "warn");
                return null;
        }
        return {
                linkInfo_id   : linkinfo.id || 0, // 联系方式id
                user_phone    : linkinfo.phoneNumber || '', // 手机号
                user_nickname : linkinfo.nickname || '', // 用户名
                user_address  : linkinfo.address || '', // 用户地址
                plate_number  : plateNumber, // 用户车牌号
                coupon_id     : this.couponId || 0, // 优惠券ID
                scid          : this.salesChannelId || 0, // 渠道id
                plan_time     : planTime || '', // 预约时间
                //balance       : balance || 0, // 使用的余额
                is_balance_pay: balance,   // 是否使用余额支付
                payment_type  : paymentType, // 支付类型
                goods_ids     : goodsIds, // 商品id集合，逗号分隔的字符串
                car_modelId   : carTypeId, // 车型id
                source_type   : com.ykx.Env.isWeixinEnv() ? 'weixin' : 'webmob',
                onsite_service: onsiteService, // 是否上门服务
                shopId        : shopId,
                areaId        : linkinfo.countyId
        };
};

/**
 * 提交订单
 */
com.ykx.Order.prototype.submit = function () {
        var $submit = $('#btnSubmit');
        $submit.prop({disabled: true});

        var me = this;

        var isWeixinEnv = com.ykx.Env.isWeixinEnv();
        if (isWeixinEnv) {
                doSubmit();
        } else {
                if (me.userLoginCtrl.isLogin) {
                        doSubmit();
                } else {
                        enableSubmit();
                        me.userLoginCtrl.showDialog(function () {
                                //登录后冲计算价格，回调函数
                                me.goodsCtrl.calculateOrderPrice();
                        });
                }
        }

        function enableSubmit() {
                $submit.prop({disabled: false});
        }

        function doSubmit() {
                var submitData = me.getNeedSubmitData();
                if (submitData == null) {
                        enableSubmit();
                        return;
                }

                var progress = Layer.load("正在提交订单");
                var url      = "/order10/create";
                var ajaxOpts = {
                        url        : url,
                        data       : JSON.stringify(submitData),
                        type       : "POST",
                        dataType   : "json",
                        contentType: "application/json;charset=UTF-8"
                };
                var req      = $.ajax(ajaxOpts);
                req.done(function (result) {
                        if (result.type != "info") {
                                progress.hide();
                                //
                                Toast.show(result.message, null, "warn");
                                enableSubmit();
                                return;
                        }

                        //me.tongji();

                        var order = result.data;
                        if (order == null) {
                                alert("下单失败");
                                return;
                        }

                        var orderId     = order.id;
                        var price       = order.price || 0;
                        var paymentType = order.paymentType;
                        var payId       = order.payId || 0; // 付款单id

                        if (paymentType != "alipay") {
                                progress.hide();
                        }

                        // 现金支付或支付金额为0时，不需要调起在线支付
                        var isCashPay = paymentType == 'cash' || price == 0;
                        if (isCashPay) {
                                var url = "/nav/weixin/order/orderSuccess?orderId=" + orderId;
                                window.location.replace(url);
                        } else {
                                me.orderPayer.pay("order", orderId);
                        }
                });
                req.fail(function (jqXHR, textStatus, errorThrown) {
                        alert("订单创建失败");
                        progress.hide();
                        enableSubmit();
                });
        }
};

/**
 * 车型选择组件
 */
com.ykx.Order.prototype.CarTypeController = React.createClass({displayName: "CarTypeController",
        getSubmitData     : function () {
                var car = this.state.selectedCar;
                if (car) {
                        return car.modelId;
                }
                return 0;
        },
        getContext        : function () {
                return this.props.ctx;
        },
        render            : function () {
                var car = this.state.selectedCar;

                if (car) {
                        return React.createElement("div", null, car.brandName, "  ", car.serialName, React.createElement("br", null), car.modelName);
                } else {
                        return React.createElement("div", null, React.createElement("span", null, "请选择车辆型号"));
                }
        },
        getInitialState   : function () {
                // 如果用户有缺省车型存在话，则默认显示
                var defaultCar = this.getUserDefaultCar();
                if (defaultCar) {
                        this.setProps({carId: defaultCar.modelId});
                }

                return {
                        carTypeSelector: null,
                        selectedCar    : defaultCar
                };
        },
        getUserDefaultCar : function () {
                var defaultCar = this.getContext().defaultCar;
                if (defaultCar) {
                        return {
                                brandName  : defaultCar.brandName,
                                serialName : defaultCar.serialName,
                                modelName  : defaultCar.modelName,
                                modelId    : defaultCar.modelId,
                                plateNumber: defaultCar.plateNumber
                        }
                }
                return null;
        },
        componentDidMount : function () {
                // 缺省的车车牌号
                var defaultCar = this.getContext().defaultCar;
                if (defaultCar) {
                        $("#plateNumber").val(defaultCar.plateNumber || "");
                }

                // 是否允许选择 选择汽车
                if (this.props.ctx.disableSettingCartype) {
                        return;
                }

                var appBaseUrl      = ""; // TODO context path
                var container       = "carCtrl";
                var alignEle        = "carSection";
                var carTypeSelector = new CarTypeSelector().init(appBaseUrl, container, alignEle, true);
                carTypeSelector.setModelSelectedHandler(this.onCarSelected);
                this.setState({carTypeSelector: carTypeSelector});
        },
        onCarSelected     : function (modelInfo) {
                var car = {
                        brandName : modelInfo.brandName,
                        serialName: modelInfo.serialName,
                        modelName : modelInfo.modelName,
                        modelId   : modelInfo.modelId,
                        isDefault : true
                };
                this.setState({selectedCar: car});
        },
        componentDidUpdate: function () {
                var car = this.state.selectedCar;
                // 需要同步刷新订单的服务项目
                if (car) {
                        var refGoods = this.getContext()._self.goodsCtrl;
                        refGoods.setProps({carId: car.modelId});
                }
        }
});

/**
 * 订单支付方式控制器
 */
com.ykx.Order.prototype.PaymentController = function () {
        var paymentItems     = {
                weixin: {
                        text          : "微信支付",
                        value         : "weixin",
                        bgClass       : "bgWeiXin",
                        bgClassChecked: "bgCheckedWeiXin"
                },
                cash  : {
                        text          : "现金支付",
                        value         : "cash",
                        bgClass       : "bgCash",
                        bgClassChecked: "bgCheckedCash"
                },
                alipay: {
                        text          : "支付宝支付",
                        value         : "alipay",
                        bgClass       : "bg",
                        bgClassChecked: "bgChecked"
                }
        };
        var paymentConfig    = {
                containerId: "paymentTypeWrapper",
                name       : "paymentType",
                height     : "34px",
                width      : 70 * 3,
                useOpacity : false,
                useRadius  : true,
                items      : [paymentItems.cash]
        };
        var paymentTypeGroup = new RadioGroup();
        this.init            = function (context) {
                var isWeixinEnv = com.ykx.Env.isWeixinEnv();
                paymentConfig.items.push(isWeixinEnv ? (paymentItems.weixin) : (paymentItems.alipay));
                var isOnlinePay = context.isOnlyOnlinePay || false;
                if (isOnlinePay) {
                        paymentConfig.items.shift();
                }
                paymentTypeGroup.init(paymentConfig);
                paymentTypeGroup.setValue(isWeixinEnv ? "weixin" : "alipay");

                return this;
        };

        // 默认为“现金”支付方式
        this.getPaymentType = function () {
                return paymentTypeGroup.getValue() || "cash";
        };
};

// 单选框组件
var __RadioGroup = React.createClass({displayName: "__RadioGroup",
        render         : function () {
                var items  = this.props.items || [];
                var radios = [];

                for (var i = 0; i < items.length; i++) {
                        var styles            = this.getStyles();
                        styles.span.b.display = this.state.selectedIndex == i ? "block" : "none";
                        var radio             = (
                                React.createElement("span", {key: i, onClick: this.handleClick.bind(this, i)}, 
                    React.createElement("i", {style: styles.span.i}, React.createElement("b", {style: styles.span.b})), 
                    React.createElement("label", {style: styles.span.label}, items[i])
                )
                        );
                        radios.push(radio);
                }

                return (React.createElement("div", {style: {position: 'relative'}}, radios));
        },
        getInitialState: function () {
                return {selectedIndex: -1};
        },
        handleClick    : function (index) {
                this.setState({selectedIndex: index});
                this.props.onChecked(index);
        },
        getStyles      : function () {
                var w  = 16; // 默认单选框宽高，像素为单位
                var ck = {
                        w: 8,
                        r: 4
                };

                var styles        = {};
                styles.span       = {};
                styles.span.i     = {
                        width        : w + 'px',
                        height       : w + 'px',
                        border       : '1px solid #ccc',
                        display      : 'inline-block',
                        verticalAlign: 'middle',
                        borderRadius : '2px'
                };
                styles.span.b     = {
                        display: 'none',
                        border : ck.r + 'px solid #B2A90B',
                        width  : ck.w,
                        height : ck.w,
                        margin : ((w - ck.w - 2) / 2) + 'px auto',
                };
                styles.span.label = {
                        marginLeft   : 0.5 * w + 'px',
                        marginRight  : w * 1.5 + 'px',
                        verticalAlign: 'middle',
                        display      : 'inline-block'
                };
                return styles;
        }
});

/**
 * 上门服务控制器
 */
com.ykx.Order.prototype.OnsiteServerController = React.createClass({displayName: "OnsiteServerController",
        selectedIndex: -1, // 0上门，1到店
        render       : function () {
                var items = ['技师上门', '我要到店'];
                return React.createElement(__RadioGroup, {items: items, onChecked: this.onChecked});
        },
        onChecked    : function (selectedIndex) {
                this.selectedIndex = selectedIndex;
                this.props.ctx._self.orderPriceCtrl.setProps({onsite: selectedIndex == 0});

                PubSub.publish(com.ykx.Order.message.serverWay, (selectedIndex == 0 ? "onsite" : "shop"));

                // this.props.ctx._self.linkInfoCtrl.setProps({isSupportLiveService: selectedIndex == 0});
        },
        getSubmitData: function () {
                return this.selectedIndex == -1 ? null : (this.selectedIndex == 0);
        }
});

/**
 * 订单金额计算控制器
 */
com.ykx.Order.prototype.OrderPriceController = React.createClass({displayName: "OrderPriceController",
        render                   : function () {
                var li_balance      = null,
                    li_onsite_fee   = null,
                    li_use_balance  = null,
                    li_discount_fee = null;

                var account_balance = this.props.ctx.userBalance || 0; // 用户帐户余额

                if (account_balance > 0) {
                        if (this.state.use_balance) {
                                li_use_balance = React.createElement("li", null, "使用余额:", React.createElement("i", null, "－¥ ", this.state.balance));
                        }
                        //account_balance = account_balance - this.state.balance;
                        li_balance = (React.createElement("li", null, 
                                React.createElement("span", null, "帐户余额："), React.createElement("strong", null, "¥ ", this.state.user_balance.toFixed(2)), 
                                React.createElement("i", {className: "balanceToggle", ref: "balanceSelecter", onClick: this.handleBalance}, "余额支付")
                        ));
                }
                if (this.state.discount_price > 0) {
                        li_discount_fee = React.createElement("li", null, "优惠金额:", React.createElement("i", null, "－¥ ", this.state.discount_price));
                }
                if (!!this.props.onsite) {
                        li_onsite_fee = React.createElement("li", null, React.createElement("span", null, "上 门 费:"), React.createElement("i", null, "¥ ", this.state.onsite_price));
                }
                return (
                        React.createElement("ul", {className: "order_price"}, 
                                li_balance, 
                                React.createElement("li", null, React.createElement("span", null, "订单原价:"), React.createElement("i", null, "¥ ", this.state.original_price)), 
                                li_onsite_fee, 
                                li_discount_fee, 
                                li_use_balance, 
                                React.createElement("li", {className: "emRedColor"}, 
                                        React.createElement("span", null, "应付金额:"), 
                                        React.createElement("i", {className: "emRedColor"}, "¥ ", this.state.settle_price)
                                )
                        )
                );
        },
        handleBalance            : function () {
                var isUsed    = this.state.use_balance;
                var $selecter = $(this.refs.balanceSelecter.getDOMNode());
                if (isUsed) {
                        $selecter.removeClass("selected");
                } else {
                        $selecter.addClass("selected");
                }
                this.setState({use_balance: !isUsed});
                this.loadData(this.props.goodsIds, !!this.props.onsite, !isUsed);
        },
        getInitialState          : function () {
                return {
                        original_price: 0, // 订单原价
                        discount_price: 0, // 优惠金额
                        balance       : 0, // 使用的余额
                        settle_price  : 0, // 应付金额
                        user_balance  : this.props.ctx.userBalance || 0, // 用户的帐户余额
                        use_balance   : false, // 是否使用余额支付，true使用，false不使用,
                        onsite_price  : !!this.props.onsite ? this.props.ctx.onSiteServicePrice : 0 // 上门服务费
                };
        },
        componentWillReceiveProps: function (nextProps) {
                var newGoodsId = nextProps.goodsIds;
                this.loadData(newGoodsId, !!nextProps.onsite, this.state.use_balance);
        },
        loadData                 : function (goodsIds, isOnsiteServer, useBalance) {
                if (!goodsIds) {
                        this.setState({
                                original_price: 0, // 订单原价
                                discount_price: 0, // 优惠金额
                                settle_price  : 0, // 应付金额
                                balance       : 0 // 使用的余额
                        });
                        return;
                }
                var url    = "/order10/calcprice";
                var params = {
                        couponProjectId: this.props.ctx.couponProjectId || 0,
                        goodsIds       : goodsIds,
                        onsiteService  : isOnsiteServer,
                        useBalance     : useBalance
                };
                $.post(url, params, function (data) {
                        // 刷新价格显示
                        this.setState({
                                original_price: data.originalPrice, // 订单原价
                                discount_price: data.discountPrice, // 优惠金额
                                onsite_price  : data.onsitePrice,
                                settle_price  : data.settlePrice, // 应付金额
                                balance       : data.balance, // 使用的余额
                                user_balance  : data.userBalance  // 用户的帐户余额
                        });
                }.bind(this), "json");
        },
        getSubmitData            : function () {
                //return this.state.balance;
                return this.state.use_balance;
        }
});

/**
 * 服务项目控制器
 */
com.ykx.Order.prototype.GoodsController = React.createClass({displayName: "GoodsController",
        getSubmitData            : function () {
                var goodsIds = '';
                var goods    = this.state.selectedGoods;
                if (goods) {
                        goods.forEach(function (item) {
                                goodsIds += ',' + item.goodsId;
                        });
                        goodsIds = goodsIds.length > 0 ? goodsIds.substr(1) : goodsIds;
                }
                return goodsIds;
        },
        getContext               : function () {
                return this.props.ctx;
        },
        render                   : function () {
                var defaultView = React.createElement("span", null, "请选择服务项目");
                var view        = null;

                var goods = this.state.selectedGoods;
                if (goods && goods.length > 0) {
                        view = (
                                React.createElement("ul", null, 
                                        goods.map(function (item) {
                                                return React.createElement("li", null, item.name, " / ¥ ", item.discount_price);
                                        })
                                )
                        );
                } else {
                        view = defaultView;
                }
                if (this.state.showPopup) {
                        return React.createElement("div", {onClick: this.handleClick}, view);
                } else {
                        return React.createElement("div", null, view)
                }
        },
        getInitialState          : function () {
                return {
                        showPopup    : false,
                        selectedGoods: []
                };
        },
        // 组件渲染前执行，仅执行一次
        componentWillMount       : function () {
                var ctx           = this.getContext();
                var needShowPopup = !ctx.isSpecialGoods || ctx.goodsNum > 0 || ctx.goodsTypeId > 0;
                needShowPopup     = needShowPopup || (ctx.couponId > 0 && ctx.isFree);

                // 对于优惠券下单，如果禁止选择车型的话，则服务项目一定可选
                needShowPopup = ctx.disableSettingCartype || needShowPopup;
                if (!needShowPopup) {
                        // 展示不可选的服务项目
                        this.renderSpecialGoods();
                } else {
                        var carTypeId = this.getUserDefaultCarType();
                        ctx._self.goodsView.setProps({carId: carTypeId});
                }

                this.setState({showPopup: needShowPopup});
        },
        // 在组件的更新已经同步到 DOM 中之后立刻被调用
        componentDidUpdate       : function () {
                this.calculateOrderPrice();
        },
        // 计算订单价格
        calculateOrderPrice      : function () {
                var goodsIds = this.getSubmitData();

                // 计算所选服务价格
                var opc = this.getContext()._self.orderPriceCtrl;
                opc.setProps({goodsIds: goodsIds});
        },
        // 在收到新的props时调用，初始化不调用
        componentWillReceiveProps: function (nextProps) {
                if (this.state.showPopup) {
                        var newCarTypeId = nextProps.carId;
                        this.setState({selectedGoods: null});
                        this.goodsView().setProps({carId: newCarTypeId});
                }
        },
        goodsView                : function () {
                return this.getContext()._self.goodsView;
        },
        handleClick              : function () {
                var me        = this;
                var carTypeId = this.props.carId || 0;
                // 加载用户的缺省车型，如果存在的话
                if (!carTypeId) {
                        carTypeId = me.getUserDefaultCarType(); // 车型ID
                }
                if (!carTypeId) {
                        Toast.show("请先选择车型！", null, "warn", function () {

                        });
                        return null;
                }
                // show dialog
                var dialog = Layer.dialog({
                        dom     : "#divGoodsWrapper",
                        title   : "请选择服务项",
                        area    : ['100%', '100%'],
                        closeBtn: [0, true],
                        no      : function () {
                                me.setState({selectedGoods: me.goodsView().getResultData()});
                                dialog.hide();
                        }
                });
        },
        getUserDefaultCarType    : function () {
                var ctx = this.getContext();
                // 加载用户的缺省车型，如果存在的话
                if (ctx.defaultCar) {
                        return ctx.defaultCar.modelId; // 车型ID
                }
                return 0;
        },
        // 展示不可选的固定服务项
        renderSpecialGoods       : function () {
                var me        = this;
                var ctx       = me.getContext();
                var url       = "/goods/modelId/goodsType";
                var carTypeId = me.getUserDefaultCarType();
                var params    = {
                        carTypeId      : carTypeId,
                        goodsTypeId    : ctx.goodsTypeId || 0,
                        couponProjectId: ctx.couponProjectId || 0
                };
                me.setState({selectedGoods: null});
                $.post(url, params, function (resp) {
                        console.info(resp);
                        var goodsClassList = resp.data;
                        var selectedGoods  = [];
                        for (var key in goodsClassList) {
                                var goodsList = goodsClassList[key];
                                for (var k = 0; k < goodsList.length; k++) {
                                        selectedGoods.push(goodsList[k]);
                                }
                        }
                        if (selectedGoods.length == 0) {
                                Toast.show("相关的服务项目设置不正确！", null, "warn", function () {
                                });
                                return;
                        }
                        me.setState({selectedGoods: selectedGoods});
                }.bind(this), "json");
        }
});

/**
 * 车型对应的所有服务项列表
 */
com.ykx.Order.prototype.GoodsListView = React.createClass({displayName: "GoodsListView",
        getContext               : function () {
                return this.props.ctx;
        },
        selectedGoods            : {},
        render                   : function () {
                var me         = this;
                var groupGoods = me.state.groupGoods;
                var view       = null;
                if (groupGoods && groupGoods.length > 0) {
                        view = (
                                React.createElement("table", {style: {width: '100%'}}, 
                                        groupGoods.map(function (item) {
                                                return me.renderGroupGoods(item);
                                        })
                                )
                        );
                }
                var style_no_service = {
                        padding   : '1em',
                        background: '#ffd600'
                };
                var style_tel        = {
                        color: '#307EBC'
                };
                return (
                        React.createElement("div", null, 
                                view, 
                                React.createElement("div", {style: style_no_service}, 
                                        React.createElement("span", null, "没有找到需要的服务？请拨打 "), 
                                        React.createElement("a", {style: style_tel, href: "tel:4000865191"}, "400-086-5191")
                                )
                        )
                );
        },
        renderGroupGoods         : function (item) {
                var me        = this;
                var goodsList = item.goodsList;
                var count     = goodsList.length;
                var ctx       = me.getContext();
                return (
                        React.createElement("tbody", null, 
                        React.createElement("tr", {className: "googsGroupHeader", key: "{item.id}"}, 
                                React.createElement("td", {colSpan: "2", style: {borderBottom: '1px solid #EEEEEE'}}, 
                                        React.createElement("strong", null, item.name), " | ", React.createElement("span", {
                                        className: "memoto"}, "共 ", React.createElement("strong", null, count), " 个服务项目")
                                )
                        ), 
                        goodsList.map(function (goods) {
                                // 用户使用优惠券或是一级会员时，不显示会员价
                                var levelCode    = ctx.userLevelCode || 0;
                                var discountView = null;
                                if (levelCode >= 30 && ctx.couponProjectId == 0) {
                                        discountView = (
                                                React.createElement("span", null, React.createElement("i", {className: "delete"}, '¥ ' + goods.price), React.createElement("br", null)))
                                }
                                return (
                                        React.createElement("tr", {className: "goodsListItem", onClick: me.onSelectGoods.bind(this, goods)}, 
                                                React.createElement("td", {className: "mulSelect", 
                                                    id: 'gid_' + goods.goodsId}, goods.name, React.createElement("br", null), React.createElement("i", null, goods.duration + '分钟')
                                                ), 
                                                React.createElement("td", null, React.createElement("i", null, discountView), React.createElement("span", {
                                                        className: "red"}, '¥' + goods.discount_price))
                                        )
                                );
                        })
                        )
                );
        },
        onSelectGoods            : function (goods) {
                var me  = this;
                var ctx = me.getContext();
                var gid = goods.goodsId;
                var max = ctx.goodsNum; // 最多可先选的商品数
                if (me.selectedGoods.hasOwnProperty(gid)) {
                        delete me.selectedGoods[gid];
                        $("#gid_" + gid).removeClass("mulSelected");
                } else {
                        var num = Object.keys(me.selectedGoods).length;
                        if (max > 0 && num >= max) {
                                Toast.show("只能选择" + max + "项商品");
                                return;
                        }

                        me.selectedGoods[gid] = goods;
                        $("#gid_" + gid).addClass("mulSelected");
                }
        },
        getResultData            : function () {
                var result = [];
                for (var key in this.selectedGoods) {
                        if (this.selectedGoods.hasOwnProperty(key)) {
                                result.push(this.selectedGoods[key]);
                        }
                }
                return result;
        },
        loadData                 : function (carTypeId) {
                var me  = this;
                var ctx = me.getContext();

                // 先清空之前选择的服务项目
                this.selectedGoods = {};
                this.setState({groupGoods: []});

                var goodsTypeId = ctx.goodsTypeId || 0;
                var url         = "/goods/modelId/goodsType";
                var params      = {
                        carTypeId      : carTypeId,
                        goodsTypeId    : goodsTypeId,
                        couponProjectId: ctx.couponProjectId || 0
                };
                $.post(url, params, function (resp) {
                        var goodsClassList = [];
                        var goodsList      = {};
                        for (var key in resp.data) {
                                var _classGoods = resp.data[key];
                                for (var i = 0; i < _classGoods.length; i++) {
                                        goodsList[_classGoods[i].goodsId] = _classGoods[i];
                                }
                                goodsClassList.push({
                                        'name'     : key,
                                        'goodsList': _classGoods
                                });
                        }
                        me.setState({groupGoods: goodsClassList});
                }.bind(this), "json");
        },
        getInitialState          : function () {
                var ctx = this.getContext();
                if (ctx && ctx.defaultCar) {
                        this.setProps({carId: ctx.defaultCar.modelId});
                }
                return {groupGoods: null};
        },
        componentWillReceiveProps: function (nextProps) {
                var newCarTypeId = nextProps.carId || 0;
                this.loadData(newCarTypeId);
        }
});

/**
 * 联系方式控制器
 */
com.ykx.Order.prototype.LinkinfoController = React.createClass({displayName: "LinkinfoController",
        render             : function () {
                var defaultView = React.createElement("span", null, "请设置联系方式");
                var view        = null;
                var linkInfo    = this.state.linkInfo;
                // 只有支持上门的服务，才允许设置地址
                if (linkInfo) {
                        var address = null;
                        if (this.enableSetAddress()) {
                                address = (
                                        React.createElement("span", null, React.createElement("br", null), (linkInfo.area ? (linkInfo.area + " / ") : "") + linkInfo.address));
                        }
                        view = (React.createElement("div", null, 
                                React.createElement("span", null, linkInfo.nickname + "  " + linkInfo.phoneNumber), address
                        ));
                } else {
                        view = defaultView;
                }

                return React.createElement("div", {onClick: this.handleClick}, view);
        },
        enableSetAddress   : function () {
                return this.props.ctx.isSupportLiveService || false;
        },
        handleClick        : function () {
                var me     = this;
                var userId = me.props.ctx.userId || 0;

                // 用户是否登录
                var isLogin = userId > 0;

                // 是否允许选择联系方式
                var allowSelectLinkInfo = isLogin && me.linkInfoView().hasLinks(); // && me.enableSetAddress()
                if (allowSelectLinkInfo) {
                        var dialog = Layer.dialog({
                                dom     : "#divLinkInfoWrapper",
                                title   : [" "],
                                closeBtn: false,
                                // title   : "选择联系方式",
                                // closeBtn: [0, true],
                                area    : ['100%', '100%'],
                                no      : function () {
                                        me.setState({linkInfo: me.getSelectedLinkInfo()}); // 刷新当前组件
                                        dialog.hide();
                                }
                        });
                } else {
                        me.linkInfoView().showNewLinkInfo(this.state.linkInfo, function (newLinkInfo) {
                                me.setState({linkInfo: newLinkInfo}); // 刷新当前组件
                        });
                }
        },
        getInitialState    : function () {
                var defaultLinkInfo = null;
                var linkinfos       = this.props.ctx.linkInfos || [];
                for (var i = 0; i < linkinfos.length; i++) {
                        if (linkinfos[i].isDefault) {
                                defaultLinkInfo = linkinfos[i];
                                break;
                        }
                }
                //if (!this.enableSetAddress()) {
                //    defaultLinkInfo = null;
                //}
                return {linkInfo: defaultLinkInfo};
        },
        linkInfoView       : function () {
                return this.props.ctx._self.linkInfoView;
        },
        getSelectedLinkInfo: function () {
                return this.linkInfoView().getResultData();
        },
        getSubmitData      : function () {
                return this.state.linkInfo || null;
        }
});

/**
 * 用户联系方式列表
 */
com.ykx.Order.prototype.LinkinfoListView = React.createClass({displayName: "LinkinfoListView",
        getContext      : function () {
                return this.props.ctx;
        },
        selectedLinkInfo: null,// 已选择的联系方式
        render          : function () {
                var linkInfos = this.state.linkInfos || [];

                // 列出用户已有的联系方式
                var userLinkList = [];
                var li_css       = {height: 'auto'};
                for (var i = 0; i < linkInfos.length; i++) {
                        var item = linkInfos[i];
                        if (!item.area) {
                                item.area = "";
                        }
                        if (!item.address) {
                                item.address = "";
                        }
                        var clz = (this.state.selectedIndex == i) ? "linkInfoListItem sglSelected" : "linkInfoListItem";
                        userLinkList.push(
                                React.createElement("li", {ref: 'link_' + i, key: i}, 
                                        React.createElement("div", {className: clz, style: li_css, 
                                             onClick: this.onSelectLinkinfo.bind(this, item, i)}, 
                                                item.nickname, "   ", item.phoneNumber, " ", React.createElement("br", null), 
                                                (item.area ? (item.area + " / ") : item.area) + item.address
                                        ), 
                                        React.createElement("div", {className: "linkInfo-actions"}, 
                                                React.createElement("span", {className: "action-button", 
                                                      onClick: this.editLinkInfo.bind(this, item)}, "编辑"), 
                                                React.createElement("span", {className: "action-button", 
                                                      onClick: this.delLinkInfo.bind(this, item)}, "删除")
                                        )
                                )
                        );
                }

                return (React.createElement("div", null, 
                        React.createElement("div", {className: "linkinfo-title"}, 
                                React.createElement("span", null, "请选择联系方式"), 
                                React.createElement("span", {className: "action-button new", 
                                      onClick: this.showNewLinkInfo.bind(this, null)}, "新建")
                        ), 
                        React.createElement("ul", null, userLinkList)
                ));
        },
        getInitialState : function () {
                var ctx       = this.getContext();
                var linkInfos = ctx.linkInfos || [];
                // 默认情况下选中缺省的联系方式；如果存在的话
                var i         = -1;
                for (i = 0; i < linkInfos.length; i++) {
                        if (linkInfos[i].isDefault) {
                                break;
                        }
                }
                return {linkInfos: linkInfos, selectedIndex: i};
        },
        showNewLinkInfo : function (data, callback) {
                this.openDialog(data, callback);
        },
        onSelectLinkinfo: function (item, idx) {
                this.setState({selectedIndex: idx});
        },
        editLinkInfo    : function (item, idx) {
                this.openDialog(item, null);
        },
        delLinkInfo     : function (item, idx) {
                userLinkInfoActionMgr.tryDeleteLinkInfo(item.id, function (result) {
                        var index    = this.state.selectedIndex;
                        var selected = this.state.linkInfos[index];
                        if (selected && selected.id == item.id) {
                                index = index - 1;
                        }
                        if (index < 0) {
                                index = 0;
                        }
                        this.setState({linkInfos: result.data || [], selectedIndex: index});
                }.bind(this));
        },
        openDialog      : function (linkData, callback) {
                // 联系方式中，是否禁止输入地址
                userLinkInfoActionMgr.enableAddress(this.getContext().isSupportLiveService);
                // 禁止校验手机号
                // userLinkInfoActionMgr.setCheckPhoneNumber(false);
                userLinkInfoActionMgr.setExistsPhones(this.getAllPhones());

                userLinkInfoActionMgr.showDlg(linkData, function (result) {
                        var link = result.data;
                        if (!link) {
                                return;
                        }
                        var linkInfos = this.state.linkInfos;
                        var isNew     = true;
                        for (var i = 0; i < linkInfos.length; i++) {
                                if (linkInfos[i].id == link.id) {
                                        isNew = false;
                                        break;
                                }
                        }
                        var index = -1;
                        if (isNew) {
                                linkInfos.push(link);
                                index = linkInfos.length - 1;
                        } else {
                                index        = i;
                                linkInfos[i] = link;
                        }

                        this.setState({linkInfos: linkInfos, selectedIndex: index});

                        callback && callback(linkInfos[index]);
                }.bind(this));
        },
        getResultData   : function () {
                if (this.state.selectedIndex <= -1) {
                        return null;
                }
                return this.state.linkInfos[this.state.selectedIndex];
        },
        getAllPhones    : function () {
                var links  = this.state.linkInfos;
                var phones = {};
                links.map(function (item) {
                        phones[item.phoneNumber] = true;
                });
                var ctx = this.getContext();
                if ($.trim(ctx.phoneNumber).length > 0) {
                        phones[ctx.phoneNumber] = true;
                }
                return phones;
        },
        hasLinks        : function () {
                return this.state.linkInfos.length > 0;
        }
});

com.ykx.Order.prototype.ServiceTimeController = React.createClass({displayName: "ServiceTimeController",
        simpleDtPicker           : null,
        render                   : function () {
                var view = null;
                if (this.props.ctx.showPlanTime) {
                        view = (React.createElement("div", null, 
                                React.createElement("span", {className: "icon iconTime", style: {top: "0.4em"}}), 
                                React.createElement("div", null, 
                                        React.createElement("input", {id: "datePicker", placeholder: "预定日期", type: "text", 
                                               readOnly: "readonly", 
                                               value: this.state.date}), 
                                        React.createElement("input", {id: "timePicker", placeholder: "预定时点", type: "text", 
                                               readOnly: "readonly", 
                                               value: this.state.time})
                                )
                        ));
                }
                return view;
        },
        getInitialState          : function () {
                return {date: '', time: ''};
        },
        componentDidMount        : function () {
                var ctx    = this.props.ctx;
                var config = this.props.config || {};

                var isShowPlanTime = ctx.showPlanTime;
                if (!isShowPlanTime) {
                        document.getElementById("timeSection").style.display = 'none';
                }

                var me = this;
                //市场互动不能选择服务时间，防止爆弹
                if (ctx.channelType != "market") {
                        // 选择服务时间
                        var initConfig    = {
                                dateOffsetStart          : 1,
                                dateOffsetEnd            : 30,
                                alignTo                  : "timeSection",
                                hrCenter                 : true,
                                controlHours             : true,
                                limitPerHour             : 4,
                                dateOccupiedHoursProvider: me.dateOccupiedHoursProvider,
                                onTimePicked             : function (timePicker) {
                                        me.setState({
                                                time: timePicker.getSelectedTime()
                                        });
                                        //soc.saveLocalStorage();
                                }
                        };
                        initConfig        = $.extend(initConfig, config);
                        me.simpleDtPicker = new SimpleDateTimePicker().init(initConfig);

                        
                        // 禁止1.18日下单
                        var disableDay=['2017-01-23','2017-01-24','2017-01-25','2017-01-26','2017-01-27','2017-01-28','2017-01-29','2017-01-30','2017-01-31','2017-02-01','2017-02-02','2017-02-03','2017-02-04','2017-02-05'];
                      
                        for(var d=0;d<disableDay.length;d++){
                    	   
                        me.simpleDtPicker.disableDay(disableDay[d],'春节');
                      
                        }

                }
        },
        dateOccupiedHoursProvider: function (obj) {
                //if (!repeatClickChecker.isValidFor("checkLeftCount")) {
                //    return;
                //}
                var me           = this;
                var selectedDate = obj.getSelectedDay();
                if (!selectedDate) {
                        return;
                }
                me.setState({date: selectedDate});
                $.get("/order10/plantime", {
                        startDate: selectedDate,
                        endDate  : selectedDate
                }, function (data) {
                        me.simpleDtPicker.toMarkDateTimePickers(data);
                }, "json");
        },
        getSubmitData            : function () {
                var d = this.state.date;
                var t = this.state.time;
                if (d && t) {
                        return d + " " + t + ":00";
                }
                return null;
        }
});

/**
 * 门店选择
 */
com.ykx.Order.prototype.ShopController = React.createClass({displayName: "ShopController",
        render           : function () {
                if (this.state.shops.length == 0) {
                        return null;
                }

                var shop = this.state.selectedShop;
                var view = React.createElement("div", null, React.createElement("span", null, "请选择服务门店"));
                if (shop != null) {
                        var shopName = shop.shopId == 0 ? shop.shopName : shop.shopName + "[" + shop.shopType + "]";
                        view         = React.createElement("div", null, 
                                React.createElement("span", null, shopName), React.createElement("br", null), 
                                React.createElement("span", null, shop.shopAddress)
                        );
                }

                // 可选门店
                if (this.state.shops.length > 1) {
                        view.props.onClick = this.handleClick;
                }

                return view;
        },
        dialog           : null,
        handleClick      : function () {
                this.dialog = Layer.dialog({
                        dom       : "#divShopWrapper",
                        title     : "请选择服务门店",
                        area      : ['99%', '50%'],
                        shadeClose: true,
                        closeBtn  : false,
                        btns      : 0
                });
        },
        getInitialState  : function () {
                var state   = {};
                // 可选门店
                state.shops = this.props.ctx.couponShops || [];

                // 初始化已选门店，当只有一个门店时，不用选择
                state.selectedShop = state.shops.length == 1 ? state.shops[0] : null;

                return state;
        },
        componentDidMount: function () {
                // 订阅消息
                PubSub.subscribe(com.ykx.Order.message.shop.select, function (message, data) {
                        if (data) {
                                // 刷新当前组件
                                this.setState({selectedShop: data});
                        }
                        // 关闭选择门店窗口
                        this.dialog.hide();
                }.bind(this));

                // 当用户选择上门或到店时，更改门店选择的显示状态
                PubSub.subscribe(com.ykx.Order.message.serverWay, function (message, data) {
                        var dom = $("#shopWrapper").parent();
                        if (data == "shop") {
                                dom.show();
                        } else {
                                dom.hide();
                        }
                });
        },
        getSubmitData    : function () {
                var shop = this.state.selectedShop;
                return shop ? shop.shopId : null;
        }
});

/**
 * 门店列表组件
 */
com.ykx.Order.prototype.ShopSelector = React.createClass({displayName: "ShopSelector",
        render         : function () {
                // 门店选择
                var shops        = this.props.ctx.couponShops || [];
                var eles         = [];
                var selectedShop = this.state.selected;
                shops.map(function (item, index) {
                        var className = selectedShop && selectedShop.shopId == item.shopId ? "mulSelected" : "mulSelect";
                        // "arrowDown/arrowUp"
                        eles.push(
                                React.createElement("li", {key: index, 
                                    className: className, 
                                    onClick: this.onSelectShop.bind(this, item)}, 
                                        React.createElement("div", null, React.createElement("strong", null, item.shopName)), 
                                        React.createElement("div", null, "门店类别：" + item.shopType), 
                                        React.createElement("div", null, "详细地址：" + item.shopAddress)
                                )
                        );
                }, this);

                // 缺省不选择
                var noShop = {shopId: 0, shopName: '暂不选择'};
                eles.push(React.createElement("li", {onClick: this.onSelectShop.bind(this, noShop)}, 
                        React.createElement("span", {className: "noselect"}, noShop.shopName)));

                return (React.createElement("div", null, 
                        React.createElement("ul", {className: "channel_shop"}, eles)
                ));
        },
        onSelectShop   : function (shop) {
                this.setState({selected: shop},
                        // 调用回调函数，通知父组件更新状态
                        function () {
                                PubSub.publish(com.ykx.Order.message.shop.select, shop);
                        }.bind(this)
                );
        },
        getInitialState: function () {
                return {selected: null}
        }
});

com.ykx.Order.prototype.initOrderContext = function (callback) {
        var url    = "/order10/getContext?goodsTypeId=" + this.goodsTypeId;
        var params = {
                couponId      : this.couponId,
                salesChannelId: this.salesChannelId
        };
        var me     = this;
        $.get(url, params, function (res) {
                if (res.type == 'info') {
                        me.context = res.data;
                        callback && callback.apply(me);
                } else {
                        alert(res.message);
                }
        }, "json");
};