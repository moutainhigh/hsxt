define(["commSrc/comm"], function () {
	comm.langConfig["hsbAccount"] = {
			//错误毛描述
			22000:'操作成功', 
			22004 : "token令牌无效",
			22006 : "客户号不能为空",
			22007 : "登录token不能为空",
			30004 : "客户名不能为空",
			30011 : "转出互生币的数量错误",
			30002 : "交易密码不能为空",
			30003 : "互生币数量不能为空",
			12009:'超出互生币支付限额',
			30010 : "互生币转出数量大于可转数量，请重新输入！",
			30012 : "请输入8位交易密码",
			30013 : "互生币转货币金额必须为大于100的正整数",
			30014 : "转出货币金额不能为空",
			30015 : "实际转入数量 不能为空",
			30016 : "货币转换费不能为空",
			30017 : "转出互生币不能为空",
			30018 : "转入货币金额不能为空",
			160360 : "交易密码错误",
			160150 : "交易密码错误",
			22006 : "获取验证码失败",
			22007 : "付款失败",
			15102 : "验证码不正确，请点击获取验证码",
			9998  : "验证码不正确，请点击获取验证码",
			30184 : "提交订单失败",
			160102 : "该持卡人客户号找不到对应客户信息",
			30128 : "验证码过期",
			30024 : "验证码错误",
			160360 : "交易密码不正确",
			160415 : "交易密码未设置",
			160146 : "数据解密错误",
			160411 : "交易密码连续出错导致用户锁定",
			15000 : "支付回调地址验证失败",
			44000 : "支付限额值不能为空",
			13007 : "余额不足",
			accountManage_sendSmsSucc : '短信验证码发送成功',
			randomTokenInvalid:"获取随机报文失败，请重试",
			affireHsbToCash : "确认申请互生币转货币",
			hsbToCashSuccess : "互生币转货币操作成功",
			quickPaySucc : '快捷支付成功',
			quickPayFail : '快捷支付失败',
			quickPayProcessing : '兑换互生币快捷支付处理中',
			pleaseSelectQuick : '请选择同意快捷支付服务协议',
			affireBuy : "确认要购买吗",
			smsCode:'请填入手机验证码',
			bankNo:'请填入银行卡号',
			bankNoLength:'请输入16-19位银行卡号',
			selectBandQuickBank:"请选择绑定快捷支付的银行账户",
			hsbBuy : {
				//兑换互生币
				required : "金额不能为空",
				digits : "请输入最多两位小数的值",
				min : "兑换互生币数量不能小于{0}",
				max : "兑换互生币数量不能大于{0}",
				maxlength : "最多输入{0}位数",
				greater : "单笔兑换数量为500-5000的最多两位小数的值",
				less : "单笔兑换数量为500-5000的整数",
				dealPwd : "请输入交易密码",
				dealPwdLength : "请输入{0}位交易密码",
				setPassword  : "请至安全设置菜单设置交易密码",
				affireBuy : "确认要购买吗",
				convertHsb  :"兑换互生币",
				passwordCheckFail  : "交易密码验证错误!",
				passwordCheckFails  : "交易密码验证错误!",
				importMoneyError   :  "输入金额错误",
				convertHsbSubmit: "兑换互生币提交！",
				affirmBuy      : "确认要购买吗",
				pay : "支出",
				income : "收入",
				dayMinAmount:"每日互生币支付限额不能小于单笔互生币支付限额",
				dayMaxAmount:"单笔互生币支付限额不能大于每日互生币支付限额",
				singleMinAmount:"单笔互生币支付限额必须大于0",
				alarm1 : "您未实名注册，兑换互生币数量为{0}至{1}间最多两位小数的值，请正确输入兑换数量！",
				alarm2 : "兑换互生币数量为{0}至{1}间最多两位小数的值，请正确输入兑换数量！",
				alarm3 : "您当日兑换互生币数量已达到上限值，请明天再进行兑换",
				alarm4 : "您当日可兑换互生币余额为{0}，请重新输入兑换互生币数量",
				singleAmount:"请输入单笔互生币支付限额数",
				dayAmount:"请输入每日互生币支付限额数",
				minAmount : "支付限额最小值不能低于{0}"
			},
		detailSearch : {
			//积分投资明细查询
			quickDateRequired : "请至少选择一个科目",
			quickDateMinlength : "请至少选择一个科目",
			beginDateRequired : "请输入开始时间",
			beginDateError : "开始时间输入有误",
			beginDateEnd : "开始日期不能大于结束日期",
			endDateRequired : "请输入结束时间",
			endDateError : "结束时间输入有误",
			endDateBegin : "结束日期不能小于开始日期"
		},
		
		zfxesz_pwd : {
			required : "交易密码不能为空"	
		},
		zfxesz_code : {
			required : "验证码不能为空"	
		},
		dbhsbzfxe_add : {
			required : '必填'
		},
		mrhsbzfxe_add : {
			required : '必填'
		},
		mrhsbzfxzcs_add : {
			required : '必填'
		},
		pwd_add : {
			required : '必填'
		},
		code_add : {
			required : '必填'	
		},
		// 互生币类型
		hsbAccTypeEnum : {
			"20110" : "流通币",
			"20120" : "定向消费"
		},
		// 业务类别
		businessTypeEnum : {
			"0" : "全部",
			"1" : "收入",
			"2" : "支出"
		},
		// 交易类型
		transTypeEnum : {
		    "S52000":"企业互生币缴年费",
		    "S54000" :"企业网银缴年费",
		    "S55000":"企业缴年费临账支付",
		    "S12000"  :"企业互生币购买工具",
		    "S14000" :"企业网银申购工具",
		    "S15000":"企业临账购买工具",
		    "S12100":"企业互生币购买工具撤单",
		    "S14100":"企业网银申购工具撤单",
		    "S15100" :"企业临账购买工具撤单",
		    "K23000" :"企业货币兑换互生币",
		    "K23020":"企业货币兑换互生币冲正",
		    "K24000":"企业网银兑换互生币",
		    "K25000" :"企业兑换互生币临账支付",
		    "K13000":"货币兑换互生币",
		    "K13020" :"货币兑换互生币冲正",
		    "K14000":"网银兑换互生币",
		    "K15000":"兑换互生币临账支付",
		    "S22000":"补办互生卡",
		    "S24000":"网银补互生卡",
		    "S25000":"临账补互生卡",
		    "S22100" :"补办互生卡退款",
		    "S24100" :"网银补互生卡撤单",
		    "S25100":"临账补互生卡撤单",
		    "S32000" :"企业重做卡互生币支付",
		    "S34000":"企业重做卡网银支付",
		    "S35000":"企业重做卡临账支付",
		    "S32100" :"企业重做卡互生币支付撤单",
		    "S34100":"企业重做卡网银支付撤单",
		    "S35100" :"企业重做卡临账支付撤单",
		    "S42000":"企业售后服务费互生币支付",
		    "S44000":"企业售后服务费网银支付",
		    "S45000":"企业售后服务费临账支付",
		    "S62000":"个性卡定制互生币支付",
		    "S64000" :"个性卡定制网银支付",
		    "S65000":"个性卡定制临账支付",
		    "K34000" :"托管企业首段资源网银申报",
		    "K44000" :"托管企业创业资源网银申报",
		    "K54000":"托管企业全部资源网银申报",
		    "K35000":"托管企业首段资源临账申报",
		    "K45000" :"托管企业创业资源临账申报",
		    "K55000" :"托管企业全部资源临账申报",
		    "K64000" :"成员企业网银申报",
		    "K65000":"成员企业临账申报",
		    "K74000" :"服务公司申报网银支付",
		    "K75000" :"服务公司临账申报",
		    "M42000":"企业互生币转货币",
		    "M32000":"互生币转货币",
		    "M52000":"代兑互生币",
		    "M52020":"企业代兑互生币冲正",
		    "M21000" :"企业积分转互生币",
		    "M11000" :"积分转互生币",
		    "T21000":"企业积分投资",
		    "T11000":"积分投资",
		    "T46000":"企业投资分红分配",
		    "T36000" :"投资分红",
		    "U26000" :"积分再增值分配",
		    "U16000" :"互生积分分配",
		    "L23000":"企业转账预转出",
		    "L13000" :"转账预转出",
		    "L43000" :"企业转账转出",
		    "L33000":"转账转出",
		    "L23100":"企业转账失败退回",
		    "L13100":"转账失败退回",
		    "L43100":"企业转账银行退票退回",
		    "L33100" :"转账银行退票退回",
		    "W10000":"意外伤害补贴",
		    "W30000"  :"互生医疗补贴计划",
		    "W20000":"他人身故补贴",
		    "G10000" : "互生币商业收入(商业服务费)",  
		    "G11000" : "企业互生币收入(商城)",
		    "G12000" : "企业互生币收入(线下)",
		    "G30000" : "商业服务费税收",
		    "G41000" : "积分分配收入(商城)",
		    "G42000" : "积分分配收入(线下)",
		    "G50000" : "积分分配收入税收",
		    "G50100" : "退积分税收(退货)",
		    "X10630" : "系统调账转出",
		    "X10530" : "系统调账转入",
		    "S72000" : "平台业务扣款"
		},
		transResult : {
			0 : '等待付款',
			1 : '交易成功',
			2 : '冲正撤单',
			3 : '交易失败',
			4 : '过期失效'
		},
		channel : {
			1 : '网页终端',
			2 : '移动终端',
			3 : '移动终端',
			4 : 'POS终端'
		},
		orderStatus :{
			1 : '待付款',
			2 : '待配货',
			3 : '已完成',
			4 : '已过期',
			5 : '已关闭',
			6 : '待确认',
			7 : '已撤单',
			8 : '支付处理中',
		}
	
	}
});