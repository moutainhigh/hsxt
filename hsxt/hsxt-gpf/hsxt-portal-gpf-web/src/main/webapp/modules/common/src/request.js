define(['GY','commSrc/commUrl', 'commSrc/comm'], function(GY,url) {
 	/*
	 * 2014/12/22修正多个接口请求问题
	 * 2015/02/04加了错误代码拦截，如可导航到登录或指定的路径
	 * 2015/02/10错误代码功能加强，整合了企业平台的需求
	 */
    // 请求中的XHR队列
    var xhrs = {};
    var requestData = {};
    var limits = {};
    
    var length;
    
    var ajaxSettings = $.ajaxSettings;

	var responseCache = {};
    // 接口数据缓存对象
	
	comm.killRequest = function(urlList){
		// urlList 需要取消掉的url的地址     如果urlList为空 表示取消掉所有的请求
		if(urlList){
			if(!$.isArray(urlList)){
				urlList =[urlList];
			}
			$.each(urlList,function(i,url){
				if(url in xhrs){
					xhrs[url].isAbort="1";
					xhrs[url].abort();
					delete xhrs[url];
				}
			});	
		}else{
			for(key in xhrs) {
				xhrs[key].isAbort="1";
				xhrs[key].abort();
			}
			//隐藏加载进度图标，后期扩展 			
		}
	};
 
	//清楚缓存数据....
	comm.clearCache = function (urlList) {
		if (urlList) {
			if (!$.isArray(urlList)) {
				urlList = [urlList];
			}
			$.each(urlList, function (i, url) {

				if (url in responseCache) {
					responseCache[url] = false;
				}
			});
		} else {
			for (var url in responseCache) {

				responseCache[url] = false;
			}
		}
	};
	 
	//格式化 options
    function formatOptions(options){
	 
    	var isJson = true ; 
		//comm.getDomainUrl( name  , Config.domain )
		if (options.isArray){			
			if (options.domain){
				options.urlKey =comm.getDomainUrl(  options.url  , options.domain );		
				//options.urlKey = options.url;
				options.url = comm.getDomainUrl(  options.url  , options.domain );	
			} else {
				options.urlKey =comm.getDomainUrl(  options.url  , Config.domain );		
				//options.urlKey = options.url;
				options.url = comm.getDomainUrl(  options.url  , Config.domain );
			} 
		}
    	//60秒后断开请求....
    	options.timeout = options.timeout || 60000;
        // 响应后处理
        var complete = options.complete || function(){};
        // 成功回调函数
        var success  = options.success || function(){};
        var error    = options.error || function(){};
        
 
        !options.type 
        	&&(options.type = "post");      
		 
	  	if(!options.dataType){
	        if(isJson){
	        	options.dataType = 'json'; 
		         	
	        }else{
	        	options.dataType = 'text/xml';        	
	        }
	  	}

		options.error = function (response, type) {
			if (!response) {
				return;
			}
			//如果ajax的请求是要求json格式而接口返回非json数据 也会进入error 类型是parsererror
			if (type == "parsererror") {
				error(response);
				return;
			}

			var request = requestData[response.url]
			//如果是手动取消掉的   不需要弹框
			if (!response.isAbort) {
				if (!response.noerror) {
					alert("网络连接超时,请检查您的网络设置或重试？");
				}
			}
		};

		options.complete = function (response) {
			if ($(options.pID) && $(options.pID).length) {
				$(options.pID).data('events').click = ajaxSettings.callback;
			}
			// 移除队列
			delete requestData[options.urlKey];
			delete xhrs[options.urlKey];
			if (complete) {
				complete(response);
			}
			//ajaxSettings.complete();
		};
		//添加login_token_code参数
		var loginInfo = comm.getLoginInfo();
		if(loginInfo) {
			options.data = options.data || {};
			if($.isPlainObject(options.data)) {
				options.data.login_token_code =loginInfo.token;
			}else{
				options.data = options.data + '&login_token_code=' + loginInfo.token;
			}
		}
    }
    			
    /*
     * 串行发送请求
     */ 
    function processResquestSyn(lists,responseLists,errorList,callback,error){
    	var my = arguments.callee,
    		isJson = true,
    	    options = lists.shift();
    	    		
    	formatOptions(options);

		options.error = function (response) {
			responseLists.push("error");
			errorList.push(true);

			var n = length - lists.length - 1;

			//如果还有其他请求  并且没有限制条件        	
			if (lists.length > 0 && !limits[n]) {
				my(lists, responseLists, errorList, callback, error);
			} else {
				length > 1
				&& callback.apply(null, responseLists);
				error.apply(null, errorList);
			}
		};

		var success = function (response) {

			responseLists.push(response);
			errorList.push(undefined);
			/*
			 //session过期....
			 if(response&&response.errorCode){
			 var errCode = response.errCode;
			 if( errCode =="100" || errCode =="400"){
			 //超时  清空掉之前缓存的数据.......
			 comm.clearCache();
			 alert('系统出错');


			 return false;
			 }
			 //缓存的多个接口
			 if((errCode == "000" || errCode == "00") && (options.urlKey in responseCache))	{
			 responseCache[options.urlKey] = response;
			 }
			 }
			 */

			if (response && response.errorCode) {
				var errCode = response.errorCode;
				if (errCode && _.contains(comm.errorCode, errCode)) {
					comm.killRequest();
					//特殊代码处理
					var evenObj = options.even || even;

					//对话框信息
					var dialog = [];
					/* */
					errCodeEven(evenObj, dialog);

					if (!$('#ajax_tips_box').length) {
						$('body').append('<div id="ajax_tips_box"><p></p></div>');
						//$('body').append('<div id="ajax_tips_box"><p>'+dialog.content+'</p></div>') ;
					} else {
						//$('#ajax_tips_box').find('p').html(dialog.content) ;
					}
					switch (errCode) {
						case comm.errorCode[0]:
							//出错跳转到登录,电商用
							var toUrl = comm.getIndex('login');
							dialogEven(dialog, errCode, errMsg, toUrl);

							break;
						case comm.errorCode[1]:

							break;
							;
						case comm.errorCode[2]:
						{


							break;
						}
						case comm.errorCode[8]:
						{
							//dialogEven(dialog, errCode, '会话已过期，请重新登录!');
							comm.alert({
								imgClass: 'tips_error',
								content: '会话已过期，请重新登录!',
								callOk:function() {
									comm.cache = {};//清空缓存
									//跳转到登录页面
									location.href = globalPath;
								}
							});
							break;
						}
						case comm.errorCode[9]:
						{
							//dialogEven(dialog, errCode, '会话已过期，请重新登录!');
							comm.alert({
								imgClass: 'tips_error',
								content: '会话已过期，请重新登录!',
								callOk:function() {
									comm.cache = {};//清空缓存
									//跳转到登录页面
									location.href = globalPath;
								}
							});
							break;
						}
						default:

							break;

					}

					/*
					 if( errCode =="100" || errCode =="400"){
					 //超时  清空掉之前缓存的数据.......
					 comm.clearCache();

					 return false;
					 }

					 //缓存的多个接口
					 if((errCode == "000" || errCode == "00") && (options.urlKey in responseCache))	{
					 responseCache[options.urlKey] = response;
					 }
					 */
					return false;
				}
			}
			if (len == 0) {
				try {
					//当请求全部正确的时候
					callback.apply(null, arr);
					errArr.join("") != ""
					&& error.apply(null, errArr);
				} catch (e) {
					alert("系统繁忙，请稍后重试！" + e);

				}
			}


			if (lists.length > 0) {
				var n = length - lists.length - 1;
				if (!limits[n] || (limits[n] && limits[n](response))) {
					my(lists, responseLists, errorList, callback, error);
				} else {
					$.each(new Array(length - responseLists.length), function () {
						responseLists.push("error");
					});

					try {
						//当请求全部正确的时候
						callback.apply(null, responseLists);
					} catch (e) {
						alert('系统繁忙，请稍后重试！' + e);
					}
				}
			} else {
				try {
					callback.apply(this, responseLists);
					errorList.join("") != ""
					&& error.apply(null, errorList);
				} catch (e) {
					alert('系统繁忙，请稍后重试！' + e);

				}
			}
		};
        
		//如果设置了缓存  并且存在缓存的数据  不从服务器拉数据.......
		if(!options.noCache&&responseCache[options.urlKey]){
			success(responseCache[options.urlKey]);				
		}else{
	        options.success = success;
	        if(typeof options.beforeSendCallback == "function"){
	        	ajaxSettings.beforeSendCallback = function(xhr){options.beforeSendCallback(xhr)}	
	        }
            
			var xhr = $.ajax(options);
			xhr.url = options.urlKey;
			xhrs[options.urlKey] = xhr;
		}	                                                	
    } 
	
	//错误代码事件处理
	function errCodeEven(evenObj,dialog){
		if (evenObj && evenObj.length>0 ){
			for(var j = 0 ;j < evenObj.length ;j++){				
				if (evenObj[j].value && evenObj[j].value.dialog){									
					dialog[j]  = evenObj[j].value.dialog ; 									
					dialog[j].width  || (dialog[j].width = 360 ) ;
					dialog[j].height || (dialog[j].height = 360 ) ;
					dialog[j].title  || (dialog[j].title = '标题' ) ;
					dialog[j].content|| (dialog[j].content = '请输入标题' ) ;
					dialog[j].callCancel||(dialog[j].callCancel = null ) ;
					dialog[j].callConfirm||(dialog[j].callConfirm = null ) ;									
				} else {
					dialog[j]  ={
						width : 360 ,
						height: 240 ,
						title : '标题',
						content : '请输入标题' ,
						callCancel: null ,
						callConfirm : null
					};								
				}
				dialog[j].errorCode = evenObj[j].errorCode ;
				var moduleName = evenObj[j].value && evenObj[j].value.moduleName || null;
				var urlName    = evenObj[j].value && evenObj[j].value.urlName    || null;
				 
				dialog[j].nav = function(){					 
					if ( moduleName &&  urlName){
						//指定模块名和文件名
						comm.navUrl( moduleName , urlName);
					} else if ( moduleName &&　! urlName){
						comm.navIndex( moduleName) ;								
					} else　if(! moduleName && urlName ) {
						//未指定模块名
						location.href = urlName;
					} else {
						
					}
					return;
				}
			}
		}
	}
	//错误代码事件执行
	function dialogEven(dialog,errCode,errMsg,toUrl ){
		
		$.each(dialog,function(key,dialogObj){	
			//已配置even事件								
			if ( dialogObj.errorCode == errCode ){
				 
				$('#ajax_tips_box').find('p').html(dialogObj.content);										
				var buttons = {};
				if (dialogObj.callConfirm && dialogObj.callCancel  ){
					buttons = {	
						' 取  消 ':function(){
							$(this).dialog('destroy');													
							if (dialogObj.callCancel ){
								dialogObj.callCancel();
							} else {												
								dialogObj.nav();
							}											
						},									
						' 确  定 ':function(){												
							$(this).dialog('destroy');													
							if (dialogObj.callConfirm ){
								dialogObj.callConfirm();
							} else {												
								dialogObj.nav();
							}											
						}
						
					};
				} else if (dialogObj.callConfirm) {
					buttons = {										
						' 确  定 ':function(){												
							$(this).dialog('destroy');													
							if (dialogObj.callConfirm ){
								dialogObj.callConfirm();
							} else {												
								dialogObj.nav();
							}											
						} 
					};
				} else if (dialogObj.callCancel) {
					buttons = {
						' 取  消 ':function(){
							$(this).dialog('destroy');													
							if (dialogObj.callCancel ){
								dialogObj.callCancel();
							} else {												
								dialogObj.nav();
							}											
						}
					};
				}
				//有even设置 
				if (buttons.hasOwnProperty(' 确  定 ') || buttons.hasOwnProperty(' 取  消 ')){
					//已设置“确定”或“取消”回调
					$('#ajax_tips_box').dialog({
						title:dialogObj.title,
						width:dialogObj.width,
						height:dialogObj.height,
						buttons : buttons
					}) ;
					 
				} else {
					//未设置“确定”或“取消”回调，直接跳到指定的链接
					dialogObj.nav();
				}
				
					
			}									
		});
		//如果ajax中没配置even对象，则采用默认
		//如果默认不弹出框，直接跳链接
		if (!dialog.length ){
			if (toUrl) {			
				location.href = toUrl  ;	
			} else {
				//如果不跳链接则弹出一提示信息
				$('#ajax_tips_box').find('p').html( errMsg );
				$('#ajax_tips_box').dialog({
					title:'温馨提示',
					width:360,
					height:240,
					buttons : {									
							' 确  定 ':function(){												
								$(this).dialog('destroy');	
							} 
					}
				}) ;
			}
		} 
	}
	
	/*
	 同步发送请求
	*/
	function processResquest(lists,responseLists,callback,error){
 	    var isJson = true,
    		len = lists.length,
    		errArr = new Array(len),
    		arr    = new Array(len),
			isArr  = lists.isArray ,
			even   = lists.even ;
		    
		$.each(lists,function(i,options){
		 		
			options.error = function(){
				len--;
				arr[i] = "error";
				errArr[i]=true;
		 
				if(len==0){
					length>1
						&&callback.apply(null,arr);
					error();
				}      													
			};
			//如果是多接口，多域名请求
			options.isArray = isArr;
			
			formatOptions(options) ;
			var success = function (response) {
				len--;
				arr[i] = response;

				if (response && response.errorCode) {
					var errCode = response.errorCode;
					if (errCode && _.contains(comm.errorCode, errCode)) {
						comm.killRequest();
						//特殊代码处理						
						var evenObj = options.even || even;

						//对话框信息
						var dialog = [];
						/**/
						errCodeEven(evenObj, dialog);

						if (!$('#ajax_tips_box').length) {
							$('body').append('<div id="ajax_tips_box"><p></p></div>');
							//$('body').append('<div id="ajax_tips_box"><p>'+dialog.content+'</p></div>') ;
						} else {
							//$('#ajax_tips_box').find('p').html(dialog.content) ;
						}
						switch (errCode) {
							case comm.errorCode[0]:
								//出错跳转到登录,电商用							 
								var toUrl = comm.getIndex('login');
								dialogEven(dialog, errCode, errMsg, toUrl);

								break;
							case comm.errorCode[1]:

								break;
							case comm.errorCode[2]:
							{


								break;
							}
							case comm.errorCode[8]:
							{
								//dialogEven(dialog, errCode, '会话已过期，请重新登录!');
								comm.alert({
									imgClass: 'tips_error',
									content: '会话已过期，请重新登录!',
									callOk:function() {
										comm.cache = {};//清空缓存
										//跳转到登录页面
										location.href = globalPath;
									}
								});
								break;
							}
							case comm.errorCode[9]:
							{
								//dialogEven(dialog, errCode, '会话已过期，请重新登录!');
								comm.alert({
									imgClass: 'tips_error',
									content: '会话已过期，请重新登录!',
									callOk:function() {
										comm.cache = {};//清空缓存
										//跳转到登录页面
										location.href = globalPath;
									}
								});
								break;
							}
							default:

								break;

						}

						/*
						 if( errCode =="100" || errCode =="400"){
						 //超时  清空掉之前缓存的数据.......
						 comm.clearCache();

						 return false;
						 }

						 //缓存的多个接口
						 if((errCode == "000" || errCode == "00") && (options.urlKey in responseCache))	{
						 responseCache[options.urlKey] = response;
						 }
						 */
						return false;
					}
				}
				if (len == 0) {
					try {
						//当请求全部正确的时候
						callback.apply(null, arr);
						errArr.join("") != ""
						&& error.apply(null, errArr);
					} catch (e) {
						alert("系统繁忙，请稍后重试！" + e);

					}
				}
			};
			//如果设置了缓存  并且存在缓存的数据  不从服务器拉数据.......
			if(!options.noCache&&responseCache[options.urlKey]){
				success(responseCache[options.urlKey]);				
			}else{
		        options.success = success;
		        if(typeof options.beforeSendCallback == "function"){
		        	ajaxSettings.beforeSendCallback = function(xhr){options.beforeSendCallback(xhr)}	
		        }
				var xhr = $.ajax(options);
				xhr.url = options.urlKey;
				xhrs[options.urlKey] = xhr;
			}
		});  				
	}

	comm.Request = function (name, options) {
		limits = {};
		var success = $.isFunction(options.success) ? options.success : function () {
			},
			error = $.isFunction(options.error) ? options.error : function () {
			};
		if ($(options.pID) && $(options.pID).length) {
			ajaxSettings.callback = $(options.pID).data('events').click;
			$(options.pID).data('events').click = undefined;
		}
		if ($.isArray(name)) {
			name.isArray = true;
			length = name.length;
			if (options.syn) {
				$.each(name, function (i, d) {
					requestData[d.url] = options;
					if (typeof d.limit == "function")
						limits[i] = d.limit;
				});
				name["even"] = options.even;
				processResquestSyn(name, [], [], success, error);
			} else {
				name["even"] = options.even;
				processResquest(name, [], success, error);
			}
		} else if ($.isPlainObject(name)) {
			options.url = comm.getDomainUrl(name.url, name.domain) || '';
			requestData[name] = options;
			processResquest([options], [], success, error);
			length = 1;

		} else {
			options.url = comm.getDomainUrl(name, Config.domain) || '';
			requestData[name] = options;
			processResquest([options], [], success, error);
			length = 1;
		}
	};
    return comm.Request;
});


