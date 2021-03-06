/*
 * Copyright (c) 2015-2018 SHENZHEN GUIYI SCIENCE AND TECHNOLOGY DEVELOP CO., LTD. All rights reserved.
 *
 * 注意：本内容仅限于深圳市归一科技研发有限公司内部传阅，禁止外泄以及用于其他的商业目的 
 */
package com.gy.hsxt.access.web.mcs.services.safeset;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gy.hsxt.access.web.bean.MCSBase;
import com.gy.hsxt.access.web.bean.safeset.PwdQuestionBean;
import com.gy.hsxt.access.web.bean.safeset.ReserveInfoBaen;
import com.gy.hsxt.access.web.common.service.BaseServiceImpl;
import com.gy.hsxt.access.web.mcs.services.common.MCSConfigService;
import com.gy.hsxt.common.exception.HsException;
import com.gy.hsxt.uc.as.api.common.IUCAsPwdQuestionService;
import com.gy.hsxt.uc.as.api.common.IUCAsReserveInfoService;
import com.gy.hsxt.uc.as.api.enumerate.UserTypeEnum;
import com.gy.hsxt.uc.as.bean.common.AsPwdQuestion;

/***
 * 系统安全设置
 * 
 * @Package: com.gy.hsxt.access.web.company.services.safeSet
 * @ClassName: SecuritySetService
 * @Description: TODO
 * 
 * @author: wangjg
 * @date: 2015-10-30 下午3:34:24
 * @version V1.0
 */
@Service(value = "securitySetService")
public class SecuritySetService extends BaseServiceImpl implements ISecuritySetService {

    @Autowired
    private MCSConfigService mcsConfigService; // 全局配置文件

    @Resource
    private IUCAsPwdQuestionService ucAsPwdQuestionService;

    @Resource
    private IUCAsReserveInfoService ucAsReserveInfoService;

    /**
     * 获取密保问题
     * 
     * @param resNo
     * @return
     * @throws HsException
     * @see com.gy.hsxt.access.web.ISecuritySetService.service.ISafeSetService#getQuestionList(java.lang.String)
     */
    @Override
    public List<AsPwdQuestion> getQuestionList(MCSBase mcsBase ) throws HsException {
        // 获取密保问题
        return ucAsPwdQuestionService.listDefaultPwdQuestions();
    }

    /**
     * 设置密保问题答案
     * 
     * @param pqb
     * @throws HsException
     * @see com.gy.hsxt.access.web.ISecuritySetService.service.ISafeSetService#setQuestion(com.gy.hsxt.access.web.bean.safeSet.PwdQuestionBean)
     */
    @Override
    public void setQuestion(PwdQuestionBean pqb) throws HsException {
        // 修改密保
        ucAsPwdQuestionService.updatePwdQuestion(pqb.getEntCustId(), (AsPwdQuestion)pqb);
    }

    /**
     * 设置预留信息
     * 
     * @param rib
     * @throws HsException
     * @see com.gy.hsxt.access.web.ISecuritySetService.service.ISafeSetService#setReserveInfo(com.gy.hsxt.access.web.bean.safeSet.ReserveInfoBaen)
     */
    @Override
    public void setReserveInfo(ReserveInfoBaen rib) throws HsException {
        // 设置预留信息
        ucAsReserveInfoService.setReserveInfo(rib.getEntCustId(), rib.getReserveInfo(), UserTypeEnum.ENT.getType());
    }

    /**
     * 修改预留信息
     * 
     * @param rib
     * @throws HsException
     * @see com.gy.hsxt.access.web.ISecuritySetService.service.ISafeSetService#updateReserveInfo(com.gy.hsxt.access.web.bean.safeSet.ReserveInfoBaen)
     */
    @Override
    public void updateReserveInfo(ReserveInfoBaen rib) throws HsException {
        // 新增预留信息
        ucAsReserveInfoService.setReserveInfo(rib.getEntCustId(), rib.getReserveInfo(), UserTypeEnum.ENT.getType());
    }

    /**
     * 查询预留信息
     * 
     * @param custId
     * @return
     * @throws HsException
     * @see com.gy.hsxt.access.web.ISecuritySetService.service.ISafeSetService#getReserveInfo(java.lang.String)
     */
    @Override
    public String getReserveInfo(MCSBase mcsBase) throws HsException {
        // 查询预留信息
        return ucAsReserveInfoService.findReserveInfoByCustId(mcsBase.getEntCustId(), UserTypeEnum.ENT.getType());

    }
}
