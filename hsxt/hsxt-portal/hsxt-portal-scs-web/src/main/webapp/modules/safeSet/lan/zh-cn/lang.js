﻿define(["commSrc/comm"],function(){
	comm.langConfig['safeSet'] ={
		//共用 
		22000:"操作成功",
		22001:"操作失败",
		22003:"参数错误",
		22004:"token令牌无效",
		22007:"登录token不能为空",
		0:"处理成功",
		requestError: '请求出错，请重试！',
		begin_Date: '请输入开始日期',
		end_Date : '请输入结束日期',
		digits: '请输入整数',
		maxlength: '最多输入{0}个字',
		kjrq: '请选择快捷日期',
		ywlb:'请选择业务类别',	
	    pwd_number_repeated_error:"密码不规范:数字不能全部重复 。如111111、222222",
		pwd_increase_error:"密码不规范:数字不能顺增或顺降。例123456、654321",
		trad_pwd_number_repeated_error:"密码不规范:数字不能全部重复 。如11111111、22222222",
		trad_pwd_increase_error:"密码不规范:数字不能顺增或顺降。例12345678、87654321",
		160150:"用户类型非法",
		pwdDigits:"密码必须为数字！",
		//修改登录密码
		input_old_password: '输入旧登录密码',
		input_new_password: '输入新的登录密码',
		input_confirm_password : '请再次输入新的登录密码',
		password_inconsistent: '两次输入密码不一致',		
		update_password_success: '修改登录密码成功',		
		password_maxlength: '请输入{0}位数字的密码',
		samePassword: '新密码跟旧密码相同',
		
		23000:"旧密码不能为空",
		23001:"新秘密不能为空",
		23002:"确认密不能为空",
		23003:"两次密码不一致",
		23004:"密码规则不满足,请根据规则输入密码",
		160102:"用户不存在",
		160109:"旧登录密码不正确",
		160359:"登录密码错误",
		160101:"该企业客户号找不到企业状态信息",
		160394:"授权码不存在或已过期",
		160355:"参数错误，请稍后再试！",
		31015:"交易密码存在,不需要重新设置",
		31016:"交易密码不存在,请先设置交易密码",
		33041:"验证码不存在或已过期",
		33038:"验证码错误",
		30128 : "验证码已过期",
		
		//设置交易密码
		set_trad_pwd_success:"您的新交易密码设置成功！请记住此交易密码，不要将交易密码告诉他人！",
		input_new_trading_password: '输入新的交易密码',
		input_confirm_trading_password: '请再次输入交易密码',
		input_old_trading_password: '请输入旧交易密码',
		trading_password_length: '请输入{0}位数字交易密码',
		trading_password_inconsistent: '两次输入的交易密码不一致',	
		add_trading_password_success: '设置交易密码成功',	
		update_trading_password_success: '修改交易密码成功',	
		23005:"交易密码不能为空",
		23006:"新交易密不能为空",
		23007:"确认交易密不能为空",
		23008:"两次交易密码不相等",
		23009:"交易密码规则不满足,请根据规则输入密码",
		30024:"交易密码存在,不要重新设置",
		30025:"交易密码不存在,请先设置交易密码",
		23012:"互生号不能为空 ",
		160109:"旧登录密码不正确",
		160360:"旧交易密码错误",
		160146:"操作失败！",
		33045:"交易密码不存在,请先设置交易密码",
	    33044:"交易密码存在,不需要重新设置",
		
		//重置交易秘密
		input_reset_trading_password_explain:"输入申请说明，最长不超过300个字符",
		input_reset_trading_password_code:"请输入验证码",
		input_reset_trading_password_authcode:"请输入授权码",
		160307:"授权码不正确",
		160308:"授权码已过期",
		
		//申请重置交易密码
		input_requested_reset_tradpwd_code:"验证码错误,请重新输入",
		select_requested_reset_tradpwd_file:"请选择需要上传的申请书",
		upload_file_error:"上传文件失败，请稍后再试",
		30022:"验证码已过期",
		30023:"验证码错误",
		
		//设置密保问题 
		question_answer_null:"请输入密保答案",
		set_question_answer_success:"设置密保答案成功",
		select_pwd_question:"请选择密保问题",
		23013:"密保答案不能为空",
		23014:"密保参数错误",
		
		//设置预留信息
		input_reserve_info:"请输入预留信息",
		set_reserve_info_success: '设置预留信息成功',
		update_reserve_info_success:"修改预留信息成功",
		23015:"预留信息存在,无需再次新增 ",
		30026:"未设置预留信息",
		160387:"更新密保失败",
		tardPwdApplyStatusEnum:{
			0:"待审批",
			1:"审批通过",
			2:"审批驳回"
		}
		
	}
});