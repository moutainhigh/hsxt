define(["jquery", "underscore"], function ($, _) {
    return window.comm = {
        /*
         取当前日期
         */
        getCurrDate: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            return year + '-' + month + '-' + day;
        },
        //将时间由毫秒数转化成日期格式
        formatDate: function (date, format) {
            if (!date || date == "0") {
                return "";
            }
            if (!format) {
                format = "yyyy-MM-dd hh:mm:ss";
            }
            if (typeof date == "string") {
                var arr;
                if (date.length == 8) {
                    arr = [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2)];
                } else if (date.length == 14) {
                    arr = [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2), date.substr(8, 2), date.substr(10, 2), date.substr(12, 2)];
                } else {
                    arr = date.split(/[^0-9]+/);
                }
                format = format.replace(/([a-z])\1+/ig, function (all, $1) {
                    var result = {
                        y: ~~arr[0],
                        M: ~~arr[1],
                        d: ~~arr[2],
                        h: ~~arr[3],
                        m: ~~arr[4],
                        s: ~~arr[5]
                    }[$1];

                    if (result != undefined && result < 10) {
                        result = "0" + result
                    }
                    return result || "";
                });
                return format;
            }
            format = format.replace(/([a-z])\1+/ig, function (all) {
                var first = all.charAt(0);
                if ("y M d h m s".indexOf(first) >= 0) {
                    if (first == "y") {
                        return all.length > 2
                            ? date.getFullYear()
                            : (date.getFullYear() + "").substr(2);
                    }
                    var result = {
                        M: date.getMonth() + 1,
                        d: date.getDate(),
                        h: date.getHours(),
                        m: date.getMinutes(),
                        s: date.getSeconds()
                    }[first];
                    result != undefined && result < 10
                    && (result = "0" + result);
                    return result;
                } else {
                    return all;
                }
            });
            return format;
        },

        /*
         * 替换特殊符号
         *
         */


        /*
         格式化金额
         */
        formatMoneyNumber: function (moneyNum) {
            var result = isNaN((1 * moneyNum).toFixed(2)) ? (new Number(0).toFixed(2)) : (1 * moneyNum).toFixed(2);
            return /\./.test(result) ? result.replace(/(\d{1,3})(?=(\d{3})+\.)/g, "$1,") : result.replace(/(\d{1,3})(?=(\d{3})+\b)/g, "$1,");
        },

        //自动宽度
        autoWidth: function () {
            var container = document.getElementById("wrap");
            var contentWidth_1 = document.getElementById("contentWidth_1");//宽度为500px所定义的ID
            var contentWidth_2 = document.getElementById("contentWidth_2");//宽度为320px所定义的ID
            var contentWidth_3 = document.getElementById("contentWidth_3");//宽度为800px所定义的ID
            var contentWidth_4 = document.getElementById("contentWidth_4");//宽度为700px所定义的ID
            var width = document.documentElement.clientWidth;//获取浏览器可见区域的宽度

            if (width <= 1200) {
                container.style.width = "1200px";
            } else {
                container.style.width = "100%";
            }
            if (width <= 830) {
                if (contentWidth_1) {
                    contentWidth_1.style.width = "500px";
                }
                if (contentWidth_2) {
                    contentWidth_2.style.width = "320px";
                }
                if (contentWidth_3) {
                    contentWidth_3.style.width = "800px";
                }
                if (contentWidth_4) {
                    contentWidth_4.style.width = "700px";
                }

            } else {
                if (contentWidth_1) {
                    contentWidth_1.style.width = "100%";
                }
                if (contentWidth_2) {
                    contentWidth_2.style.width = "100%";
                }
                if (contentWidth_3) {
                    contentWidth_3.style.width = "100%";
                }
                if (contentWidth_4) {
                    contentWidth_4.style.width = "100%";
                }
            }

        },

        setFocus: function (obj, text) {//输入框获得焦点时时触发

            obj.style.color = "black";
            if (obj.value == text) {
                obj.style.color = "black";
                obj.value = "";
            }
        },

        setBlur: function (obj, text) {//输入框失去焦点时触发

            if (obj.value == "") {
                obj.style.color = "#999997";
                obj.value = text;
            }
        },

        /*
         * 设置，获取，删除全局缓存
         */
        setCache: function (module, name, data) {
            if (!this.cache[module]) {
                this.cache[module] = {};
            }

            this.cache[module][name] = data;


        },

        getCache: function (module, name) {
            if (!this.cache[module]) {
                return null;
            }

            if (!this.cache[module][name]) {
                return null;
            }
            return this.cache[module][name];
        },

        delCache: function (module, name) {
            if (!this.cache[module]) {
                return;
            } else {
                delete this.cache[module][name];
            }
        },


        /*
         * require 更改，以适应多域操作
         *
         */
        Require: function (urlNames, succback, errback, optional) {
            var urlArr = [];
            $.each(urlNames, function (key, urlObj) {
                var thisUrl = null;
                if ($.isPlainObject(urlObj)) {
                    //thisUrl = comm.getDomainUrl( urlObj.url  , comm.clearDomain(urlObj.domain)   ) || '';
                    thisUrl = comm.getDomainUrl(urlObj.url, urlObj.domain);
                } else {
                    thisUrl = comm.getDomainUrl(urlObj, Config.domain);
                }
                urlArr.push(thisUrl);

            });
            require(urlArr, succback, errback, optional);
        },

        Define: function (urlNames, succback, optional) {
            var urlArr = [];
            $.each(urlNames, function (key, urlObj) {
                var thisUrl = null;
                if ($.isPlainObject(urlObj)) {
                    //有指定域名
                    if (urlObj.url.indexOf('text!') > -1 || urlObj.url.indexOf('css!') > -1) {
                        //模板路径
                        thisUrl = comm.formatTextUrl(urlObj.url, comm.domainList[urlObj.domain]);
                    } else {
                        //js 路径
                        thisUrl = comm.getDomainUrl(urlObj.url, urlObj.domain);
                    }

                } else {
                    thisUrl = urlObj;
                    /*//未指定域名
                     if ( urlObj.url.indexOf('text!') >-1 || urlObj.url.indexOf('css!') >-1  ){
                     //模板路径

                     } else {
                     //js 路径


                     }*/

                    //thisUrl = comm.getDomainUrl( urlObj  , Config.domain ) ;
                }
                urlArr.push(thisUrl);

            });
            define(urlArr, succback, optional);

        },
        /*
         * 替换当前的域名地址
         */
        emptyCurrPath: function (path) {
            var rr = /http([s]?):\/\/(.*)\//g;
            var mathArr = rr.exec(path);
            return mathArr[0];

        },

        formatTextUrl: function (url, domain) {

            //去掉域名地址：require无.js全路径有点问题
            var domainName = domain.replace('http://' + location.host + '/', ''),
                urlName = null;
            if (!domain) {
                return "";
            } else {
                //设置需要代理路径的url
                var urlArr = url.split("!");
                urlName = urlArr[0] + '!' + domainName + urlArr[1];
                return urlName;
            }
        },


        //国际化文案
        langConfig: {},
        //获取相应模块下的字段文案
        lang: function (name) {
            return this.langConfig[name] || '';
        },

        /*
         * 过滤特殊字符,如
         * <,>,',",(,),[,],{,},%,\,/,^,@,&,_
         *
         *
         */
        formatStr: function (str) {
            var string = str;
            string = string.replace(/</gm, '＜');
            string = string.replace(/>/gm, '＞');
            string = string.replace(/\'/gm, '＇');
            string = string.replace(/\"/gm, '＂');
            string = string.replace(/\(/gm, '（');
            string = string.replace(/\)/gm, '）');
            string = string.replace(/\[/gm, '［');
            string = string.replace(/\]/gm, '］');
            string = string.replace(/\{/gm, '｛');
            string = string.replace(/\}/gm, '｝');
            string = string.replace(/\%/gm, '％');
            string = string.replace(/\\/gm, '＼');
            string = string.replace(/\//gm, '／');
            string = string.replace(/\^/gm, '＾');
            string = string.replace(/@/gm, '＠');
            string = string.replace(/&/gm, '＆');
            string = string.replace(/_/gm, '＿');
            return string;
        },

        /***
         *  确认对话框
         *
         *
         ***/
        confirm: function (obj) {
            if (!$('#dialog-confirm')[0]) {
                $('<div id="dialog-confirm"  title="" class="none"><p></p></div>').appendTo($(document.body));
            }
            $('#dialog-confirm').attr('title', obj.title || '温馨提示');
            if (obj.imgFlag) {
                $('#dialog-confirm > p').html('<i class="icon_tips ' + ( obj.imgClass || "tips_ques" ) + '"></i><span class="fl fb f14 ml10 pt9">' + (obj.content || '您真的要删除吗？') + '</span>');
            } else {
                $('#dialog-confirm > p').html(obj.content || '您真的要删除吗？');
            }
            var btnOkName = obj.ok || '确定',
                btnOther = obj.del || '删除',
                btnCancelName = obj.cancel || '取消';
            var btnObj = {};
            btnObj[btnOkName] = function () {
                obj.callOk && obj.callOk();
                $(this).dialog("destroy");
                $('#dialog-confirm').remove();
            };
            obj.del && (btnObj[btnOther] = function () {
                obj.callOther && obj.callOther();
                $(this).dialog("destroy");
                $('#dialog-confirm').remove();
            });
            btnObj[btnCancelName] = function () {
                obj.callCancel && obj.callCancel();
                $(this).dialog("destroy");
                $('#dialog-confirm').remove();
            };
            if (obj.timeClose && /^\d+$/.test(obj.timeClose)) {
                setTimeout(function () {
                    if ($("#dialog-confirm").length) {
                        $("#dialog-confirm").dialog('destroy');
                        $('#dialog-confirm').remove();
                    }
                }, obj.timeClose * 1000);
            }
            $("#dialog-confirm").dialog({
                width: obj.width || 320,
                height: obj.height || 160,
                open: function (event, ui) {
                    obj.closeButton && $(".ui-dialog-titlebar-close", $(this).parent()).show();
                },
                buttons: btnObj
            });
        },


        /**
         * 提示对话框
         *
         */
        alert: function (content) {
            if (!$('#dialog-alert')[0]) {
                $('<div id="dialog-alert"  title="" class="none"><p></p></div>').appendTo($(document.body));
            }
            $('#dialog-alert').attr('title', content.title || '温馨提示');
            if (typeof content == 'object') {
                $('#dialog-alert > p').html('<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
                    '<tr>' +
                    '<td height="50"><div class="clearfix">' +
                    '<i class="icon_tips  ' + ( content.imgClass || "tips_yes" ) + '"></i>' +
                    '<span class="fl fb f14 ml10 pt9">' + (content.content || '' ) + '</span>' +
                    '</div></td>' +
                    '</tr>' +
                    '</tbody></table>');
            } else {
                $('#dialog-alert > p').html(content || '操作!');
            }

            if (content.timeClose && /^\d+$/.test(content.timeClose)) {
                setTimeout(function () {
                    if ($("#dialog-alert").length) {
                        $("#dialog-alert").dialog('destroy');
                        $("#dialog-alert").remove();
                    }
                }, content.timeClose * 1000);
            }
            $("#dialog-alert").dialog({
                width: content.width || 360,
                height: content.height || 160,
                open: function (event, ui) {
                    content.closeButton && $(".ui-dialog-titlebar-close", $(this).parent()).show();
                },
                buttons: {
                    '确定': function () {
                        if (typeof content == 'object' && content.callOk && typeof  content.callOk == 'function') {
                            content.callOk();
                        }
                        $(this).dialog("destroy");
                        $("#dialog-alert").remove();
                    }
                }
            })
        },
        //登录密码使用
        encrypt : function(word,key){
            key  = CryptoJS.enc.Utf8.parse(key) ;
            var iv    = CryptoJS.enc.Utf8.parse('9999999999999999') ;
            var srcs = CryptoJS.enc.Utf8.parse(word) ;
            var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
            return encrypted.toString() ;
        }  ,
        //交易密码使用
        encrypt2 :function(word,key){
            key  = CryptoJS.enc.Utf8.parse(key) ;
            var iv    = CryptoJS.enc.Utf8.parse('9999999999999999') ;
            var srcs = CryptoJS.enc.Utf8.parse(CryptoJS.enc.parse(word)) ;
            var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
            return encrypted.toString() ;
        }  ,

        /**
         *  校验处理
         *
         *
         */
        valid: function (validObj) {
            //"表单中form的id
            return $(validObj.formID).validate({
                rules: validObj.rules,
                messages: validObj.messages,
                success: function (element) {
                    if (validObj.success) {
                        validObj.success(element);
                        return true;
                    }

                    $(element).tooltip();
                    $(element).tooltip("destroy");

                    if ($(element)[0]) {
                        $($(element)[0].control).tooltip();
                        $($(element)[0].control).tooltip("destroy");
                    }
                },
                errorPlacement: function (error, element) { //此项配置可以省略，则使用默认

                    if (validObj.error) {
                        validObj.error(error, element);
                        return false;
                    }

                    $(element).attr("title", $(error).text()).tooltip({
                        position: {
                            my: "left+" + ( validObj.left || '100') + " top+" + (validObj.top || '5'),
                            at: "left top"
                        }
                    }).tooltip("open");
                    $(".ui-tooltip").css("max-width", "230px");
                    //error.appendTo(element.parent().next());  //把错误提示插入到当前元素中的父元素的同辈元素的下一个元素中
                }
            }).form();
        },
        /*
         * 标签切换
         * 标签对应的容器切换
         */
        altTab: function (tabid, ulid) {
            if (!tabid) {
                return;
            }
            var ulID = null,
                thisUL = null,
                thisLI = null,
                thisContent = null;

            thisUL = $(ulid || '#main-tab');
            thisLI = thisUL.find('li[data-tabid="' + tabid + '"]');
            thisContent = thisUL.parent().find('div[data-contentid="' + tabid + '"]');
            if (!thisLI.length) {
                comm.alert({imgClass: 'tips_i', content: '未找到tabid:' + tabid});
                return;
            }
            //设置当前li tab激活
            thisLI.addClass('menu-tab-hover').removeClass('none');
            thisLI.siblings().removeClass('menu-tab-hover');
            //显示当前的内容
            thisContent.removeClass('none');
            thisContent.siblings().addClass('none');
        }
    };

});