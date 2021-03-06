define(['text!messageCenterTpl/fsxx/xxcg.html',
    	'messageCenterSrc/fsxx/xgxx',
    	'messageCenterDat/messageCenter',
    	'messageCenterLan'],function(xxcgTpl,xgxx,messageCenter ){
	return {
		searchTable : null,
		showPage : function(){
			$('#busibox').html(_.template(xxcgTpl)) ;			 
		 	$('#new_btn').triggerWith('#xxzx_fsxx');
		 	
		 	var gridObj ;
			var self = this;
			
			$("#qry_msg_btn").click(function(){
				
				var params = {
						search_msgTitle : $("#msgTitle").val(),	//消息标题
						search_status : 1
				};
				
				searchTable = gridObj = comm.getCommBsGrid("detailTable","find_message_list",params,comm.lang("messageCenter"),self.detail,self.del);
				
			});
			
			$("#del_btn").click(function(){
				var msgIds =gridObj.getCheckedValues("msgId");
				if(msgIds.length<1){
					comm.i_alert(comm.lang("messageCenter").selectDelMsg);
					return false;
				}
				comm.i_confirm(comm.lang("messageCenter").confirmDelMsg, function(){
					var params = {
							msgId : escape(JSON.stringify(msgIds)),	//消息ID
							status : 1
					};
					//删除	
					messageCenter.delMessages(params,function(res){
						/*
						//刷新列表
						if(searchTable){
							searchTable.refreshPage();
						}
						*/
						$("#qry_msg_btn").click();
					});
				}, 320);
			});
			
			$("#qry_msg_btn").click();
		},
		detail : function(record, rowIndex, colIndex, options){
			if(colIndex == 0){
				return rowIndex + 1;
			}else if(colIndex == 1){
				var receiptors = record.receiptor.split(",");
				var result ="";
				for(var i=0;i<receiptors.length;i++){
					if(receiptors[i]){
						var _rec = comm.lang("messageCenter").receiptor[receiptors[i]];
						if(!_rec){
							_rec = receiptors[i];
						}
						result += _rec+",";
					}
				}
				if(result != '' && result != undefined){
					result = result.substring(0,result.length-1);
					return "<span title='"+result+"'>" + result + "</span>";
				}else{
					return "<span title='"+record.receiptor+"'>" + record.receiptor + "</span>";
				}
			}else if(colIndex == 2){
				return comm.lang("messageCenter").msglevel[record.level];
			}else if(colIndex == 4){
				if(record.updatedDate!=null&&record.updatedDate!=''){
					return record.updatedDate;
				}
				return record.createdDate;
			}
			if(colIndex == 5){
				
				var link1 =  $('<a >'+comm.lang("messageCenter").xiugai+'</a>').click(function(e) {
					var postData = record;
					//获取接收信息的单位的中文名称
					var receiptors = record.receiptor.split(",");
					var result ="";
					for(var i=0;i<receiptors.length;i++){
						if(receiptors[i]){
							var _rec = comm.lang("messageCenter").receiptor[receiptors[i]];
							if(!_rec){
								_rec = receiptors[i];
							}
							result += _rec+",";
						}
					}
					
					if('' != result && result != undefined)
					{
						result = result.substring(0,result.length-1);
						postData.receiptorName = result;
					}
					else
					{
						postData.receiptorName = record.receiptor;
					}
					//重要级别
					postData.levelName = comm.lang("messageCenter").msglevel[record.level];
					//消息类型
					postData.typeName = comm.lang("messageCenter").msgtype[record.type];
					postData.summary = record.summary;
					//显示详细信息页面
					xgxx.showPage(postData);
				});
				return   link1 ;
			}
		},
		del : function(record,rowIndex,colIndex,options){
			if(colIndex == 5)
			{
				var link1 =  $('<a >'+comm.lang("messageCenter").del+'</a>').click(function(e) {
					comm.i_confirm(comm.lang("messageCenter").confirmDelMsg, function(){
						var postData = {
								msgId : record.msgId
							};
						//删除	
						messageCenter.delMessageById(postData,function(res){
							/*
							//刷新列表
							if(searchTable){
								searchTable.refreshPage();
							}
							*/
							$("#qry_msg_btn").click();
						});
					}, 320);
					
				});
				return   link1 ;
			}
		}
	}
}); 

 