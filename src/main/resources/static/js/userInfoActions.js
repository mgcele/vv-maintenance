function UserCarActionMgr(){var c=[];c.push('<div class="template panel" id="dlgCar">');c.push('<table class="fieldRegion" style="margin:0;width:100%;">');
c.push('<tr class="hrBorder " id="carModel-wrapper-x"><td class="label">*型号</td><td id="carModel-x" style="padding-right:1em;line-height:100%;"></td></tr>');
c.push('<tr class="hrBorder"><td class="label">车牌</td><td style="padding-right:1em;"><input id="plateNumber" class="readableInput noBorder" maxlength="7" style="width:100%" placeHolder="请输入车牌号"/></td></tr>');
c.push('<tr class="hrBorder noBorder "><td class="label">&nbsp;</td><td class="hrRight"><button id="btnDelCar" class="transBtn iconDelete">&nbsp;</button><span>&nbsp;&nbsp;<label id="textCarIsDefault" style="color:#aaa;">*默认车辆</label>&nbsp;<label id="carIsDefault"></label></span></td></tr>');
c.push("</table></div>");var i=c.join("");var h={};function a(){if(h.car==null){var m=$(i).appendTo(document.body);h.car=m.attr("id");}}var e=null;var j=null;
var d="add";var l=null;this.showDlg=function(o,r){a();if(e==null){e=new CarTypeSelector().init(appBaseUrl,"carModel-x","carModel-wrapper-x",true);e.setModelSelectedHandler(function(s){var t=s.brandName+"／"+s.serialName+"／"+s.modelName;
$id("carModel-x").html(t);$id("carModel-x").get(0).modelId=s.modelId;});}if(j==null){j=new SwitchButton().init("carIsDefault");j.onChange=function(s){$id("textCarIsDefault").css("color",s?"#000":"#AAA");
};}e.clearSelection();var p="";o=o||{};var m=!isNum(o.id);if(m){d="add";p="新增 - 车辆";$id("carModel-x").html('<span style="color:#888888">选择爱车车型</span>');
$id("carModel-x").get(0).modelId=null;$id("plateNumber").val("");$id("btnDelCar").hide();$id("btnDelCar").unbind("click");}else{d="mod";p="查看/修改 - 车辆";
var q=o.brand.name+"／"+o.serial.name+"／"+o.model.name;$id("carModel-x").html(q);$id("carModel-x").get(0).modelId=o.model.id;$id("plateNumber").val(o.plateNumber);
var n=o.id;$id("btnDelCar").show();$id("btnDelCar").unbind("click");$id("btnDelCar").bind("click",function(){k(n,r);});}(o.isDefault?j.switchOn():j.switchOff());
l=Layer.dialog({dom:"#dlgCar",title:p,area:["100%","300px"],offset:["",""],no:function(t){var v=$id("carModel-x").get(0).modelId;if(!isNum(v)){Layer.tips("选择车型","carModel-x");
return;}var u=j.isOn();var s=$id("plateNumber").val();o.name="";o.modelId=v;o.isDefault=u;o.plateNumber=s;if(!/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[a-zA-Z0-9]{6}$/.test(s)){alert("请输入有效的车牌号！");
return false;}if(d=="add"){g(o,r);}else{if(d=="mod"){b(o,r);}}l.hide();}});};this.showInput=function(m,p){a();if(e==null){e=new CarTypeSelector().init(appBaseUrl,"carModel-x","carModel-wrapper-x",true);
e.setModelSelectedHandler(function(q){var r=q.brandName+"／"+q.serialName+"／"+q.modelName;$id("carModel-x").html(r);$id("carModel-x").get(0).modelId=q.modelId;
m.brand.name=q.brandName;m.serial.name=q.serialName;m.model.name=q.modelName;m.model.id=q.modelId;});}if(j==null){j=new SwitchButton().init("carIsDefault");
j.onChange=function(q){$id("textCarIsDefault").css("color",q?"#000":"#AAA");};}var n="车辆信息";m=m||{};m.brand=m.brand||{};m.serial=m.serial||{};m.model=m.model||{};
var o=(m.brand.name||"")+"／"+(m.serial.name||"")+"／"+(m.model.name||"");$id("carModel-x").html(o);$id("carModel-x").get(0).modelId=m.model.id;(m.isDefault?j.switchOn():j.switchOff());
$id("plateNumber").val(m.plateNumber);$id("btnDelCar").hide();$id("btnDelCar").unbind("click");l=Layer.dialog({dom:"#dlgCar",title:n,area:["100%","300px"],offset:["",""],no:function(){var r=$id("carModel-x").get(0).modelId;
if(!isNum(r)){Layer.tips("选择车型","carModel-x");return;}var q=j.isOn();m.name="";m.modelId=r;m.color=m.color||null;m.province=m.province||null;m.isDefault=q;
l.hide();p(m);}});};function g(m,q){var n="/weixin/my/car/add";n=makeUrl(n,{});var p={name:m.name,modelId:m.modelId||-1,plateNumber:m.plateNumber||"",isDefault:m.isDefault};
var o=Ajax.post(n).data(p);o.done(function(r,s){r.message=r.message||"车辆创建成功";q(r,s);});o.go();}function b(m,q){var n="/weixin/my/car/update";n=makeUrl(n,{});
var p={id:m.id,name:m.name,modelId:m.modelId||-1,plateNumber:m.plateNumber||"",isDefault:m.isDefault};var o=Ajax.post(n).data(p);o.done(function(r,s){r.message=r.message||"车辆更新成功";
q(r,s);});o.go();}function k(n,o){var m=$.layer({shade:[0],area:["auto","auto"],dialog:{msg:"确定要删除这辆车吗？",btns:2,type:4,btn:["取消","确定"],yes:function(){},no:function(){f(n,o);
layer.closeAll();}}});}function f(m,p){l.hide();var n="/weixin/my/car/del/"+m;n=makeUrl(n,{});var o=Ajax.put(n);o.done(function(q,r){q.message=q.message||"车辆删除成功";
p(q,r);});o.go();}}var userCarActionMgr=new UserCarActionMgr();function UserLinkInfoActionMgr(){this.isNeedCheckPhoneNumber=true;this.smsCodeManager=null;
this.enabledInputAddress=true;this.allPhones={};this.autoCheckPhone=true;var p=this;var g=Math.floor(Math.random()*(10000+1));var a="_addr_"+g;var n="_addr_"+(g+1);
var e=[];e.push('<section id="dlgLinkInfo" style="padding:1em;margin:0;" class="template">');e.push('<ul class="list">');e.push('<li><i>*姓名</i><input class="m4" maxlength="10" type="text" id="nickname-x" placeHolder="请输入您的姓名"/></li>');
e.push('<li><i>*手机</i><input class="m4" maxlength="11" type="tel" id="phoneNumber-x" placeHolder="请输入您的手机号"/></li>');e.push('<li style="display:none;"><i>*验证码</i><input type="text" class="m4" id="check_code_x" placeholder="请输入验证码"/><button class="button" id="getCheckCode-x" style="background:#ffcc00;">获取验证码</button></li>');
e.push("<li id="+n+' style="line-height:100%;display:none;"><i>*地区</i><input onfocus="this.blur();" class="m4" maxlength="50" type="text" id="link_area_x" readOnly placeHolder="请选择所在地区" /></li>');
e.push("<li id="+a+' style="line-height:100%;display:none"><i>*地址</i><textarea class="m4" type="text" style="width:100%;border:0;height:3.2em;padding-top:0.8em;" id="address-x" placeHolder="请输入您的服务地址"/></li>');
e.push('<li style="text-align:right;border-bottom:none;"><button id="btnDelLinkInfo" class="iconDelete">&nbsp;</button><span><label id="textLinkInfoIsDefault" style="color:#aaa;">默认联系方式</label>&nbsp;<label id="linkInfoIsDefault"></label></span></li>');
e.push("</ul></section>");var o=e.join("");var l={address:null,linkInfo:{}};var d={};function k(s){if(s&&p.autoCheckPhone){p.isNeedCheckPhoneNumber=s.length==11&&!p.allPhones.hasOwnProperty(s);
$("#check_code_x").parent("li").css("display",p.isNeedCheckPhoneNumber?"block":"none");}}function q(){if(d.linkInfo!=null){return;}var u=$(o).appendTo(document.body);
d.linkInfo=u.attr("id");$("#phoneNumber-x").keyup(function(){if(!p.autoCheckPhone){return;}k(this.value);});p.smsCodeManager=new SmsCodeManager("phoneNumber-x","getCheckCode-x","check_code_x","normal").init();
if(p.enabledInputAddress){$("#"+a).show();var t=$("#"+n);var v=l.linkInfo?l.linkInfo.cityId:0;var s=new com.ykx.common.Area({onSelectedArea:function(x){var w=x;
$id("link_area_x").val(w.parent.parent.name+" / "+w.parent.name+" / "+w.name);if(l.linkInfo&&l.linkInfo.countyId!=w.id){$id("address-x").val("");}l.address=w;
l.linkInfo.countyId=x.id;l.linkInfo.cityId=x.parent.id;l.linkInfo.provinceId=x.parent.parent.id;},initArea:v});t.bind("click",function(){v=l.linkInfo?l.linkInfo.countyId:0;
s.show(v);this.blur();});t.show();}}var b=null;var i="add";var r=null;this.showDlg=function(t,w){t=t||{};l.linkInfo.countyId=t.countyId;l.linkInfo.cityId=t.cityId;
l.linkInfo.provinceId=t.provinceId;k(t.phoneNumber);q();$("#check_code_x").val("");if(b==null){b=new SwitchButton().init("linkInfoIsDefault");b.onChange=function(x){$id("textLinkInfoIsDefault").css("color",x?"#000":"#AAA");
};}var u="";var s=!isNum(t.id);if(s){i="add";u="新增 - 联系方式";$id("phoneNumber-x").val(t.phoneNumber);$id("nickname-x").val(t.nickname);$id("address-x").val(t.address);
$id("link_area_x").val(t.area);(t.isDefault?b.switchOn():b.switchOff());$id("btnDelLinkInfo").hide();$id("btnDelLinkInfo").unbind("click");}else{i="mod";
u="查看/修改 - 联系方式";$id("phoneNumber-x").val(t.phoneNumber);$id("nickname-x").val(t.nickname);$id("address-x").val(t.address);$id("link_area_x").val(t.area);
(t.isDefault?b.switchOn():b.switchOff());var v=t.id;$id("btnDelLinkInfo").show();$id("btnDelLinkInfo").unbind("click");$id("btnDelLinkInfo").bind("click",function(){j(v,w);
});}r=Layer.dialog({dom:"#dlgLinkInfo",title:u,area:["100%","100%"],offset:["",""],no:function(x){t=c(t);if(!t){return;}if(p.isNeedCheckPhoneNumber){if(!p.smsCodeManager.checkCode()){Layer.tips("请输入正确的手机短信验证码","check_code_x");
return;}}if(i=="add"){m(t,w);}else{if(i=="mod"){f(t,w);}}r.hide();}});};var c=function(t){var s=$id("phoneNumber-x").val();var x=$id("nickname-x").val();
var w=$id("address-x").val();var u=$id("link_area_x").val();if(isNoB(x)){Layer.tips("请输入您的姓名","nickname-x");return;}if(!isMobile(s)){Layer.tips("请输入正确的手机号","phoneNumber-x");
return;}if(p.isNeedCheckPhoneNumber){if(isNoB($id("check_code_x").val())){Layer.tips("请输入您收到的短信或语音验证码","check_code_x");return;}}if(p.enabledInputAddress){if(isNoB(u)){Layer.tips("请选择所在地区","link_area_x");
return;}else{if(isNoB(w)){Layer.tips("请输入您的服务地址",a);return;}else{if($.trim(w).length<5){Layer.tips("地址不能少于5个字符",a);return;}}}}var v=b.isOn();t=t||{};t.phoneNumber=s;
t.nickname=x;if(l.address){t.countyId=l.address.id||"0";}t.address=w;t.isDefault=v;if(l.linkInfo){t.countyId=l.linkInfo.countyId||"0";t.cityId=l.linkInfo.cityId||"0";
t.provinceId=l.linkInfo.provinceId||"0";}return t;};this.showInput=function(s,v,u){s=s||{};l.linkInfo.countyId=s.countyId;l.linkInfo.cityId=s.cityId;l.linkInfo.provinceId=s.provinceId;
q();if(b==null){b=new SwitchButton().init("linkInfoIsDefault");b.onChange=function(w){$id("textLinkInfoIsDefault").css("color",w?"#000":"#AAA");};}var t="联系方式";
$id("phoneNumber-x").val(s.phoneNumber);$id("nickname-x").val(s.nickname);$id("address-x").val(s.address);$id("link_area_x").val(s.area);(s.isDefault?b.switchOn():b.switchOff());
$id("btnDelLinkInfo").hide();$id("btnDelLinkInfo").unbind("click");r=Layer.dialog({dom:"#dlgLinkInfo",title:t,area:["100%","300px"],offset:["",""],btns:2,btn:["取消","确定"],no:function(w){s=c(s);
if(!s){return;}r.hide();v(s);}});};function m(t,v){var s="/weixin/my/linkInfo/add";var u=Ajax.post(s).data(t);u.done(function(w,x){w.message=w.message||"联系方式添加成功";
v(w,x);});u.go();}function f(t,v){var s="/weixin/my/linkInfo/update";var u=Ajax.post(s).data(t);u.done(function(w,x){w.message=w.message||"联系方式更新成功";v(w,x);
});u.go();}function j(s,t){$.layer({shade:[0],area:["auto","auto"],dialog:{msg:"确定要删除这个联系方式吗？",btns:2,type:4,btn:["取消","确定"],yes:function(){},no:function(u){h(s,t);
layer.close(u);}}});}this.tryDeleteLinkInfo=j;function h(u,v){if(!u){return;}r&&r.hide();var s="/weixin/my/linkInfo/del/"+u;var t=Ajax.post(s);t.done(function(w,x){w.message=w.message||"联系方式删除成功";
v(w,x);});t.go();}}UserLinkInfoActionMgr.prototype.setCheckPhoneNumber=function(a){this.isNeedCheckPhoneNumber=a;this.autoCheckPhone=a;};UserLinkInfoActionMgr.prototype.enableAddress=function(a){this.enabledInputAddress=a;
};UserLinkInfoActionMgr.prototype.setExistsPhones=function(a){this.allPhones=a;};var userLinkInfoActionMgr=new UserLinkInfoActionMgr();
