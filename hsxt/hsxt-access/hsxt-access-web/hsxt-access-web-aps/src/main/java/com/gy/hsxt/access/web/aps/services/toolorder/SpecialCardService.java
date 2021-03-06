package com.gy.hsxt.access.web.aps.services.toolorder;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gy.hsxt.access.web.common.service.BaseServiceImpl;
import com.gy.hsxt.access.web.common.utils.CommonUtils;
import com.gy.hsxt.bs.api.tool.IBSToolOrderService;
import com.gy.hsxt.bs.bean.base.BaseParam;
import com.gy.hsxt.bs.bean.tool.CardStyle;
import com.gy.hsxt.common.bean.Page;
import com.gy.hsxt.common.bean.PageData;
import com.gy.hsxt.common.exception.HsException;

/**
 * 
 * @projectName : hsxt-access-web-aps
 * @package : com.gy.hsxt.access.web.aps.services.toolorder
 * @className : SpecialCardService.java
 * @description : 个性卡定制服务
 * @author : maocy
 * @createDate : 2016-03-03
 * @updateUser :
 * @updateDate :
 * @updateRemark :
 * @version : v0.0.1
 */
@SuppressWarnings("rawtypes")
@Service
public class SpecialCardService extends BaseServiceImpl implements ISpecialCardService {

	@Autowired
	private IBSToolOrderService bsService;// 服务类

	/**
	 * 方法名称：分页查询互生个性卡样 方法描述：工具制作管理-分页查询互生个性卡样
	 * 
	 * @param filterMap
	 * @param sortMap
	 * @param page
	 * @return
	 * @throws HsException
	 */
	public PageData<?> findScrollResult(Map filterMap, Map sortMap, Page page) throws HsException
	{
		BaseParam params = new BaseParam();
		params.setName((String) filterMap.get("cardName"));
		params.setHsCustName((String) filterMap.get("hsCustName"));
		params.setHsResNo((String) filterMap.get("hsResNo"));
		params.setStatus(CommonUtils.toInteger((String) filterMap.get("status")));
		return this.bsService.querySpecialCardStylePage(params, page);
	}

	/**
	 * 方法名称：根据订单号查询互生卡样 方法描述：工具制作管理-根据订单号查询互生卡样
	 * 
	 * @param orderNo
	 *            订单号
	 * @return
	 * @throws HsException
	 */
	public CardStyle queryCardStyleByOrderNo(String orderNo) throws HsException
	{
		return this.bsService.queryCardStyleByOrderNo(orderNo);
	}

	/**
	 * 方法名称：上传卡样制作文件 方法描述：工具制作管理-上传卡样制作文件
	 * 
	 * @param orderNo
	 *            订单号
	 * @return
	 * @throws HsException
	 */
	public void uploadCardStyleMarkFile(CardStyle bean) throws HsException
	{
		this.bsService.uploadCardStyleMarkFile(bean);
	}

}