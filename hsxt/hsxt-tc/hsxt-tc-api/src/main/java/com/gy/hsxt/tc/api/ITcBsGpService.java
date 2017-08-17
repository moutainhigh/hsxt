/*
 * Copyright (c) 2015-2018 SHENZHEN GUIYI SCIENCE AND TECHNOLOGY DEVELOP CO., LTD. All rights reserved.
 *
 * 注意：本内容仅限于深圳市归一科技研发有限公司内部传阅，禁止外泄以及用于其他的商业目的 
 */

package com.gy.hsxt.tc.api;

import com.gy.hsxt.common.bean.Page;
import com.gy.hsxt.common.bean.PageData;
import com.gy.hsxt.common.exception.HsException;
import com.gy.hsxt.tc.bean.BsGpImbalance;
import com.gy.hsxt.tc.bean.BsGpSummary;

/**
 * 业务系统（BS）与支付系统（GP）对账接口
 * 
 * @Package: com.gy.hsxt.tc.api
 * @ClassName: ITcBsGpService
 * @Description: TODO
 * 
 * @author: huanggaoyang
 * @date: 2015-11-17 上午11:17:35
 * @version V1.0
 */
public interface ITcBsGpService {

	/**
	 * 查询业务系统BS 与支付系统GP 对账汇总记录
	 * 
	 * @param beginDate
	 *            对账开始日期 格式YYYY-MM-DD
	 * @param endDate
	 *            对账结束日期 格式YYYY-MM-DD
	 * @param tcResult
	 *            对账结果：1平衡、2不平衡
	 * @param page
	 *            分页查询参数
	 * @return
	 * @throws HsException
	 */
	public PageData<BsGpSummary> querySummary(String beginDate, String endDate,
			Integer tcResult, Page page) throws HsException;

	/**
	 * 查询业务系统BS 与支付系统GP 对账不平衡记录
	 * 
	 * @param beginDate
	 *            对账开始日期 格式YYYY-MM-DD
	 * @param endDate
	 *            对账结束日期 格式YYYY-MM-DD
	 * @param imbalanceType
	 *            对账结果： 0：长款 1：短款 2：要素不一致
	 * @param page
	 *            分页查询参数
	 * @return
	 * @throws HsException
	 */
	public PageData<BsGpImbalance> queryImbalance(String beginDate,
			String endDate, Integer imbalanceType, Page page)
			throws HsException;
}