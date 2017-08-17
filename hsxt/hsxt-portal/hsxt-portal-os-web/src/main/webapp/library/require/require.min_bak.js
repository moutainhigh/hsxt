/*
 RequireJS 2.1.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license. 
 */
/*  modified by 万华成 
 *  mvc框架版本维护信息
 *	2015.03.02  添加combobox插件功能
 *  2015.03.03  修改了语言国际化功能
 *  2015.03.10  selectBox新增超长加省略符且tooltip
 *  2015.03.27  优化远程加载导致配置文件失败的问题
 *  2015.03.28  解决ie6,7,8(JSON)兼容性
 *  2015.03.31  ie8 jqMigrate 弹警告问题
 *  2015.04.08  formatDate在ie中不兼容问题
 *  2015.04.09  dialog点击"X"改为destroy(以前是close)
 *  2015.04.10  validate校验文案规则补充
 *  2015.04.17  validate(解决校验提示语不会更新，残留着上一次的校验结果
 *  2015.04.18  jquery ui dialog (禁用esc键，因esc关闭可能导致dialog未销)
 *  2015.04.27  修正arrFontsize未定义bug
 *  2015.05.08  添加特殊字符替换功能
 *  2015.05.20  解决图片预览插件在ie6,7,8下兼容性问题
 *  2015.06.05  修正日期插件中文默认格式
 *  2015.06.23  新增ztree功能
 *  2015.07.01  新增时分秒选择
 *  2015.07.15  placeholder 兼容ie8,9
 *  2015.08.01  bsgrid导入
 *  2015.09.18  加入字符限止提示
 * 2015.10.09   加入echarts
 * 2015.10.19   加入多项目整合功能，分项目-目录存放模块
 * 2015.11.11   加入tooken
 */


var requirejs,require,define,reqConfig,globalPath,localPath;
(function(Q){function R(b){return"[object Function]"===S.call(b)}function K(b){return"[object Array]"===S.call(b)}function F(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function T(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));--d);}}function w(b,c){return ka.call(b,c)}function q(b,c){return w(b,c)&&b[c]}function L(b,c){for(var d in b)if(w(b,d)&&c(b[d],d))break}function X(b,c,d,e){c&&L(c,function(c,k){if(d||!w(b,k))e&&"string"!==typeof c?(b[k]||(b[k]={}),X(b[k],
c,d,e)):b[k]=c});return b}function A(b,c){return function(){return c.apply(b,arguments)}}function fa(b){if(!b)return b;var c=Q;F(b.split("."),function(b){c=c[b]});return c}function I(b,c,d,e){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function la(b){function c(a,n,b){var g,r,c,h,d,e,f,l=n&&n.split("/"),k=p.map,m=k&&k["*"];if(a&&"."===a.charAt(0))if(n){g=q(p.pkgs,n)?l=[n]:l.slice(0,l.length-1);n=a=g.concat(a.split("/"));
for(g=0;n[g];g+=1)if(r=n[g],"."===r)n.splice(g,1),--g;else if(".."===r)if(1!==g||".."!==n[2]&&".."!==n[0])0<g&&(n.splice(g-1,2),g-=2);else break;g=q(p.pkgs,n=a[0]);a=a.join("/");g&&a===n+"/"+g.main&&(a=n)}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&k&&(l||m)){n=a.split("/");for(g=n.length;0<g;--g){c=n.slice(0,g).join("/");if(l)for(r=l.length;0<r;--r)if(b=q(k,l.slice(0,r).join("/")))if(b=q(b,c)){h=b;d=g;break}if(h)break;!e&&m&&q(m,c)&&(e=q(m,c),f=g)}!h&&e&&(h=e,d=f);h&&(n.splice(0,d,h),a=n.join("/"))}return a}
function d(a){G&&F(document.getElementsByTagName("script"),function(n){if(n.getAttribute("data-requiremodule")===a&&n.getAttribute("data-requirecontext")===l.contextName)return n.parentNode.removeChild(n),!0})}function e(a){var n=q(p.paths,a);if(n&&K(n)&&1<n.length)return d(a),n.shift(),l.require.undef(a),l.require([a]),!0}function f(a){var n,b=a?a.indexOf("!"):-1;-1<b&&(n=a.substring(0,b),a=a.substring(b+1,a.length));return[n,a]}function k(a,b,J,g){var r,d,h=null,e=b?b.name:null,ma=a,k=!0,m="";a||
(k=!1,a="_@r"+(S+=1));a=f(a);h=a[0];a=a[1];h&&(h=c(h,e,g),d=q(v,h));a&&(h?m=d&&d.normalize?d.normalize(a,function(a){return c(a,e,g)}):c(a,e,g):(m=c(a,e,g),a=f(m),h=a[0],m=a[1],J=!0,r=l.nameToUrl(m)));J=!h||d||J?"":"_unnormalized"+(T+=1);return{prefix:h,name:m,parentMap:b,unnormalized:!!J,url:r,originalName:ma,isDefine:k,id:(h?h+"!"+m:m)+J}}function u(a){var b=a.id,c=q(t,b);c||(c=t[b]=new l.Module(a));return c}function x(a,b,c){var g=a.id,r=q(t,g);if(!w(v,g)||r&&!r.defineEmitComplete)u(a).on(b,c);
else"defined"===b&&c(v[g])}function C(a,b){var c=a.requireModules,g=!1;if(b)b(a);else if(F(c,function(b){if(b=q(t,b))b.error=a,b.events.error&&(g=!0,b.emit("error",a))}),!g)m.onError(a)}function y(){Y.length&&(na.apply(M,[M.length-1,0].concat(Y)),Y=[])}function z(a){delete t[a];delete aa[a]}function E(a,b,c){var g=a.map.id;a.error?a.emit("error",a.error):(b[g]=!0,F(a.depMaps,function(g,d){var h=g.id,e=q(t,h);e&&!a.depMatched[d]&&!c[h]&&(q(b,h)?(a.defineDep(d,v[h]),a.check()):E(e,b,c))}),c[g]=!0)}
function D(){var a,b,c,g,r=(c=1E3*p.waitSeconds)&&l.startTime+c<(new Date).getTime(),B=[],h=[],f=!1,m=!0;if(!P){P=!0;L(aa,function(c){a=c.map;b=a.id;if(c.enabled&&(a.isDefine||h.push(c),!c.error))if(!c.inited&&r)e(b)?f=g=!0:(B.push(b),d(b));else if(!c.inited&&c.fetched&&a.isDefine&&(f=!0,!a.prefix))return m=!1});if(r&&B.length)return c=I("timeout","Load timeout for modules: "+B,null,B),c.contextName=l.contextName,C(c);m&&F(h,function(a){E(a,{},{})});r&&!g||!f||!G&&!ga||ba||(ba=setTimeout(function(){ba=
0;D()},50));P=!1}}function H(a){w(v,a[0])||u(k(a[0],null,!0)).init(a[1],a[2])}function N(a){a=a.currentTarget||a.srcElement;var b=l.onScriptLoad;a.detachEvent&&!ca?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=l.onScriptError;a.detachEvent&&!ca||a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function O(){var a;for(y();M.length;){a=M.shift();if(null===a[0])return C(I("mismatch","Mismatched anonymous define() module: "+a[a.length-
1]));H(a)}}var P,da,l,U,ba,p={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},t={},aa={},ea={},M=[],v={},Z={},S=1,T=1;U={require:function(a){return a.require?a.require:a.require=l.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=v[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return p.config&&q(p.config,a.map.id)||{}},exports:v[a.map.id]}}};da=function(a){this.events=
q(ea,a.id)||{};this.map=a;this.shim=q(p.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};da.prototype={init:function(a,b,c,g){g=g||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=A(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=g.ignore;g.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=
!0,--this.depCount,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;l.startTime=(new Date).getTime();var a=this.map;if(this.shim)l.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],A(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;Z[a]||(Z[a]=!0,l.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;
var g=this.exports,r=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(R(r)){if(this.events.error)try{g=l.execCb(c,r,b,g)}catch(d){a=d}else g=l.execCb(c,r,b,g);this.map.isDefine&&((b=this.module)&&void 0!==b.exports&&b.exports!==this.exports?g=b.exports:void 0===g&&this.usingExports&&(g=this.exports));if(a)return a.requireMap=this.map,a.requireModules=[this.map.id],a.requireType="define",C(this.error=
a)}else g=r;this.exports=g;if(this.map.isDefine&&!this.ignore&&(v[c]=g,m.onResourceLoad))m.onResourceLoad(l,this.map,this.depMaps);z(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=k(a.prefix);this.depMaps.push(d);x(d,"defined",A(this,function(g){var d,e;e=this.map.name;var h=this.map.parentMap?this.map.parentMap.name:null,f=
l.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(g.normalize&&(e=g.normalize(e,function(a){return c(a,h,!0)})||""),g=k(a.prefix+"!"+e,this.map.parentMap),x(g,"defined",A(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),e=q(t,g.id)){this.depMaps.push(g);if(this.events.error)e.on("error",A(this,function(a){this.emit("error",a)}));e.enable()}}else d=A(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),d.error=A(this,
function(a){this.inited=!0;this.error=a;a.requireModules=[b];L(t,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&z(a.map.id)});C(a)}),d.fromText=A(this,function(c,g){var e=a.name,h=k(e),J=V;g&&(c=g);J&&(V=!1);u(h);w(p.config,b)&&(p.config[e]=p.config[b]);try{m.exec(c)}catch(B){return C(I("fromtexteval","fromText eval for "+b+" failed: "+B,B,[b]))}J&&(V=!0);this.depMaps.push(h);l.completeLoad(e);f([e],d)}),g.load(a.name,f,d,p)}));l.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){aa[this.map.id]=
this;this.enabling=this.enabled=!0;F(this.depMaps,A(this,function(a,b){var c,g;if("string"===typeof a){a=k(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=q(U,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;x(a,"defined",A(this,function(a){this.defineDep(b,a);this.check()}));this.errback&&x(a,"error",this.errback)}c=a.id;g=t[c];!w(U,c)&&g&&!g.enabled&&l.enable(a,this)}));L(this.pluginMaps,A(this,function(a){var b=q(t,a.id);b&&!b.enabled&&l.enable(a,
this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){F(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};l={config:p,contextName:b,registry:t,defined:v,urlFetched:Z,defQueue:M,Module:da,makeModuleMap:k,nextTick:m.nextTick,onError:C,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=p.pkgs,c=p.shim,g={paths:!0,config:!0,map:!0};L(a,function(a,b){g[b]?
"map"===b?(p.map||(p.map={}),X(p[b],a,!0,!0)):X(p[b],a,!0):p[b]=a});a.shim&&(L(a.shim,function(a,b){K(a)&&(a={deps:a});!a.exports&&!a.init||a.exportsFn||(a.exportsFn=l.makeShimExports(a));c[b]=a}),p.shim=c);a.packages&&(F(a.packages,function(a){a="string"===typeof a?{name:a}:a;b[a.name]={name:a.name,location:a.location||a.name,main:(a.main||"main").replace(oa,"").replace(ha,"")}}),p.pkgs=b);L(t,function(a,b){a.inited||a.map.unnormalized||(a.map=k(b))});(a.deps||a.callback)&&l.require(a.deps||[],a.callback)},
makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(Q,arguments));return b||a.exports&&fa(a.exports)}},makeRequire:function(a,d){function e(c,f,B){var h,p;d.enableBuildCallback&&f&&R(f)&&(f.__requireJsBuild=!0);if("string"===typeof c){if(R(f))return C(I("requireargs","Invalid require call"),B);if(a&&w(U,c))return U[c](t[a.id]);if(m.get)return m.get(l,c,a,e);h=k(c,a,!1,!0);h=h.id;return w(v,h)?v[h]:C(I("notloaded",'Module name "'+h+'" has not been loaded yet for context: '+
b+(a?"":". Use require([])")))}O();l.nextTick(function(){O();p=u(k(null,a));p.skipMap=d.skipMap;p.init(c,f,B,{enabled:!0});D()});return e}d=d||{};X(e,{isBrowser:G,toUrl:function(b){var d,e=b.lastIndexOf("."),h=b.split("/")[0],h=h.split("_")[1];-1!==e&&("."!==h&&".."!==h||1<e)&&(d=b.substring(e,b.length),b=b.substring(0,e));return l.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return w(v,k(b,a,!1,!0).id)},specified:function(b){b=k(b,a,!1,!0).id;return w(v,b)||w(t,b)}});a||(e.undef=function(b){y();
var c=k(b,a,!0),d=q(t,b);delete v[b];delete Z[c.url];delete ea[b];d&&(d.events.defined&&(ea[b]=d.events),z(b))});return e},enable:function(a){q(t,a.id)&&u(a).enable()},completeLoad:function(a){var b,c,d=q(p.shim,a)||{},f=d.exports;for(y();M.length;){c=M.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);H(c)}c=q(t,a);if(!b&&!w(v,a)&&c&&!c.inited){if(p.enforceDefine&&(!f||!fa(f)))return e(a)?void 0:C(I("nodefine","No define call for "+a,null,[a]));H([a,d.deps||[],d.exportsFn])}D()},
nameToUrl:function(a,b,c){var d,e,f,h,l,k;if(m.jsExtRegExp.test(a))h=a+(b||"");else{d=p.paths;e=p.pkgs;h=a.split("/");for(l=h.length;0<l;--l){if(k=h.slice(0,l).join("/"),f=q(e,k),k=q(d,k)){K(k)&&(k=k[0]);h.splice(0,l,k);break}else if(f){a=a===f.name?f.location+"/"+f.main:f.location;h.splice(0,l,a);break}if(k=h.slice(1,l).join("/"),f=q(e,k),k=q(d,k)){K(k)&&(k=k[0]);h.splice(0,l,h[0]+"/"+k);break}else if(f){a=a===f.name?f.location+"/"+f.main:f.location;h.splice(0,l,a);break}}h=h.join("/");h+=b||(/\?/.test(h)||
c?"":".js");h=("/"===h.charAt(0)||h.match(/^[\w\+\.\-]+:/)?"":p.baseUrl)+h}return p.urlArgs?h+((-1===h.indexOf("?")?"?":"&")+p.urlArgs):h},load:function(a,b){m.load(l,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||pa.test((a.currentTarget||a.srcElement).readyState))W=null,a=N(a),l.completeLoad(a.id)},onScriptError:function(a){var b=N(a);if(!e(b.id))return C(I("scripterror","Script error",a,[b.id]))}};l.require=l.makeRequire();return l}var u=document.scripts,
x=null,y=null;Array.prototype.indexOf instanceof Function||(Array.prototype.indexOf=function(b,c){var d=this.length>>>0,e=Number(c)||0,e=0>e?Math.ceil(e):Math.floor(e);for(0>e&&(e+=d);e<d;e++)if(e in this&&this[e]===b)return e;return-1});String.prototype.trim instanceof Function||(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")});for(x=u.length;0<x;x--)-1<u[x-1].src.indexOf("require.min.js")&&(localPath=u[x-1].src.substring(0,u[x-1].src.lastIndexOf("/")+1));globalPath=localPath.replace("library/require/",
"");x="zh-cn zh-tw en-us fr-fr de-de ja-jp ko-kr".split(" ");if("microsoft internet explorer"==window.navigator.appName.toLowerCase())y=window.navigator.userLanguage?window.navigator.userLanguage.toLowerCase():window.navigator.browserLanguage?window.navigator.browserLanguage.toLowerCase():"zh-cn";else if("netscape"==window.navigator.appName.toLowerCase()||"firefox"==window.navigator.appName.toLowerCase())y=window.navigator.language.toLowerCase();-1===x.indexOf(y)?y="zh-cn":"";reqConfig={version:"2015.10.19",
baseUrl:globalPath,config:{text:{useXhr:function(b,c,d,e){return!0}}},packages:[{name:"echarts",location:"library/plugins/echarts/src",main:"echarts"},{name:"zrender",location:"library/plugins/zrender/src",main:"zrender"}],shim:{jquery:{exports:"$"},underscore:{exports:"_"},jqueryui:{deps:["jquery"],exports:"jqueryui"},jquerymigrate:{deps:["jquery"],exports:"jquerymigrate"},xheditor:{deps:["jquerymigrate"],exports:"xheditor"},xheditor_cn:{deps:["xheditor"],exports:"xheditor_cn"},jquerycookie:{deps:["jquery"],
exports:"jquerycookie"},jqueryslide:{deps:["jquery"],exports:"jqueryslide"},jqueryjscrollpane:{deps:["jquery"],exports:"jqueryjscrollpane"},jquerycharcount:{deps:["jquery"],exports:"jquerycharcount"},jquerymousewheel:{deps:["jquery"],exports:"jquerymousewheel"},jquerydataTables:{deps:["jquery"],exports:"jquerydataTables"},jqueryselectbox:{deps:["jquery"],exports:"jqueryselectbox"},jquerycustomer:{deps:["jquery","jqueryui"],exports:"jquerycustomer"},jqueryvalidate:{deps:["jquery"],exports:"jqueryvalidate"},
additionalmethods:{deps:["jquery","jqueryvalidate"],exports:"jqueryvalidate"},jqueryuploadPreview:{deps:["jquery"],exports:"jqueryuploadPreview"},jquerycutimage:{deps:["jqueryuploadPreview"],exports:"jquerycutimage"},jqueryajaxfileupload:{deps:["jquery"],exports:"jqueryajaxfileupload"},jqzoom:{deps:["jquery"],exports:"jqzoom"},jquerytreeview:{deps:["jquery","jquerycookie"],exports:"jquerytreeview"},jqueryztree:{deps:["jquery"],exports:"jqueryztree"},jquerytimepicker:{deps:["jqueryui"],exports:"jquerytimepicker"},
jquerydialogr:{deps:["jquery","jqueryui"],exports:"jquerydialogr"},localStorage:{deps:["storeJson2","json"],exports:"localStorage"},bsgrid:{deps:["jquery"],exports:"bsgrid"},encrypt:{deps:["aes"]},GY:{deps:"jquery jqueryui jquerycookie jquerytimepicker bsgrid jqueryjscrollpane jquerymousewheel jqueryselectbox jqueryvalidate additionalmethods jquerycustomer jqueryuploadPreview jqzoom jquerycutimage jqueryajaxfileupload underscore commSrc/comm commSrc/base localStorage xheditor_cn encrypt".split(" "),
exports:"GY"}},map:{"*":{css:"library/require/css"}},paths:{text:"library/jquery/text",async:"library/require/async",jquery:"library/jquery/jquery.min",jqueryui:"library/jquery/jquery-ui.min",xheditor:"library/plugins/xheditor/xheditor-1.2.1.min",xheditor_cn:"library/plugins/xheditor/xheditor_lang/zh-cn",jquerymigrate:"library/plugins/xheditor/jquery/jquery-migrate-1.2.1",underscore:"library/underscore/underscore",jquerycookie:"library/plugins/jquery.cookie",jqueryslide:"library/plugins/jquery.flexslider",
jquerycharcount:"library/plugins/jquery.charcount",jquerycustomer:"library/plugins/jquery.customer",jqueryjscrollpane:"library/plugins/jquery.jscrollpane.min",jquerymousewheel:"library/plugins/jquery.mousewheel",jqueryselectbox:"library/plugins/jquery.selectbox",additionalmethods:"library/plugins/additional-methods",jqueryvalidate:"library/plugins/jquery.validate",jqueryuploadPreview:"library/plugins/jquery.uploadPreview",jquerycutimage:"library/plugins/jquery.imgareaselect",jqueryajaxfileupload:"library/plugins/jquery.ajaxfileupload",
jquerytreeview:"library/plugins/jquery.treeview",jqueryztree:"library/plugins/jquery.ztree.min",jqzoom:"library/plugins/jquery.jqzoom",jquerytimepicker:"library/plugins/jquery.timepicker",jquerydialogr:"library/plugins/dialogr/ui.dialogr",typeface:"library/plugins/dialogr/typeface-0.14",museo_700:"library/plugins/dialogr/museo_700.typeface",json:"library/plugins/localStorage/json",storeJson2:"library/plugins/localStorage/store_json2.min",localStorage:"library/plugins/localStorage/store",bsgrid:"library/plugins/bsgrid.all.min",
aes:"library/plugins/encode/aes",encrypt:"library/plugins/encode/pad-zeropadding",md5:"library/plugins/encode/md5",GY:"library/gym/gym",commSrc:"modules/common/src",commTpl:"modules/common/tpl",commCss:"modules/common/css",commDat:"modules/common/dat",commLan:"modules/common/lan/"+y+"/lang"},getLocalFlag:function(){var b=location.host;-1!=b.indexOf("localhost")||-1!=b.indexOf("192.168.1")||b.indexOf("127.0.0");return!1},setLocalPath:function(b,c,d){var e=null,f=null;c?(e=c+"_"+b,f=c+"/"+b):f=e=b;
d&&!this.getLocalFlag()?(this.paths[d+"_"+e+"Src"]=d+"/modules/"+f+"/src",this.paths[d+"_"+e+"Tpl"]=d+"/modules/"+f+"/tpl",this.paths[d+"_"+e+"Css"]=d+"/modules/"+f+"/src",this.paths[d+"_"+e+"Dat"]=d+"/modules/"+f+"/tpl",this.paths[d+"_"+e+"Lan"]=d+"/modules/"+f+"/lan/"+y+"/lang"):(this.paths[e+"Src"]="modules/"+f+"/src",this.paths[e+"Tpl"]="modules/"+f+"/tpl",this.paths[e+"Css"]="modules/"+f+"/css",this.paths[e+"Dat"]="modules/"+f+"/dat",this.paths[e+"Lan"]="modules/"+f+"/lan/"+y+"/lang")},setAgentPath:function(b,
c){this.paths[b+"_"+c+"Src"]=b+"/modules/"+c+"/src";this.paths[b+"_"+c+"Tpl"]=b+"/modules/"+c+"/tpl";this.paths[b+"_"+c+"Css"]=b+"/modules/"+c+"/src";this.paths[b+"_"+c+"Dat"]=b+"/modules/"+c+"/tpl";this.paths[b+"_"+c+"Lan"]=b+"/modules/"+c+"/lan/"+y+"/lang"}};var m,D,N,E,O,W,P,ia,ja,qa=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ra=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,ha=/\.js$/,oa=/^\.\//,u=Object.prototype,S=u.toString,ka=u.hasOwnProperty,na=Array.prototype.splice,G=!("undefined"===
typeof window||!navigator||!document),ga=!G&&"undefined"!==typeof importScripts,pa=G&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,ca="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),H={},z={},Y=[],V=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(R(requirejs))return;z=requirejs;requirejs=void 0}"undefined"!==typeof require&&!R(require)&&(z=require,require=void 0);m=requirejs=function(b,c,d,e){var f,k="_";!K(b)&&"string"!==typeof b&&
(f=b,K(c)?(b=c,c=d,d=e):b=[]);f&&f.context&&(k=f.context);(e=q(H,k))||(e=H[k]=m.s.newContext(k));f&&e.configure(f);return e.require(b,c,d)};m.config=function(b){return m(b)};m.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=m);m.version="2.1.5";m.jsExtRegExp=/^\/|:|\?|\.js$/;m.isBrowser=G;u=m.s={contexts:H,newContext:la};m({});F(["toUrl","undef","defined","specified"],function(b){m[b]=function(){var c=H._;return c.require[b].apply(c,arguments)}});
G&&(D=u.head=document.getElementsByTagName("head")[0],N=document.getElementsByTagName("base")[0])&&(D=u.head=N.parentNode);m.onError=function(b){throw b;};m.load=function(b,c,d){var e=b&&b.config||{},f;if(G)return f=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),f.type=e.scriptType||"text/javascript",f.charset="utf-8",f.async=!0,f.setAttribute("data-requirecontext",b.contextName),f.setAttribute("data-requiremodule",c),!f.attachEvent||
f.attachEvent.toString&&0>f.attachEvent.toString().indexOf("[native code")||ca?(f.addEventListener("load",b.onScriptLoad,!1),f.addEventListener("error",b.onScriptError,!1)):(V=!0,f.attachEvent("onreadystatechange",b.onScriptLoad)),f.src=d,P=f,N?D.insertBefore(f,N):D.appendChild(f),P=null,f;if(ga)try{importScripts(d),b.completeLoad(c)}catch(k){b.onError(I("importscripts","importScripts failed for "+c+" at "+d,k,[c]))}};G&&T(document.getElementsByTagName("script"),function(b){D||(D=b.parentNode);if(E=
b.getAttribute("data-main"))return z.baseUrl||(O=E.split("/"),ia=O.pop(),ja=O.length?O.join("/")+"/":"./",z.baseUrl=ja,E=ia),E=E.replace(ha,""),z.deps=z.deps?z.deps.concat(E):[E],!0});define=function(b,c,d){var e,f;"string"!==typeof b&&(d=c,c=b,b=null);K(c)||(d=c,c=[]);!c.length&&R(d)&&d.length&&(d.toString().replace(qa,"").replace(ra,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c));V&&((e=P)||(W&&"interactive"===W.readyState||T(document.getElementsByTagName("script"),
function(b){if("interactive"===b.readyState)return W=b}),e=W),e&&(b||(b=e.getAttribute("data-requiremodule")),f=H[e.getAttribute("data-requirecontext")]));(f?f.defQueue:Y).push([b,c,d])};define.amd={jQuery:!0};m.exec=function(b){return eval(b)};m(z)}})(this);require.onError=function(Q){"timeout"===Q.requireType&&console.log("modules: "+Q.requireModules);throw Q;};