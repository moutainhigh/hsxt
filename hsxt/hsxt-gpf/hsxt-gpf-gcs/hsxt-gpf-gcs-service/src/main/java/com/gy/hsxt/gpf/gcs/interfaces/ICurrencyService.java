package com.gy.hsxt.gpf.gcs.interfaces;

import java.util.List;

import com.gy.hsxt.gpf.gcs.bean.Currency;

/***************************************************************************
 * <PRE>
 *  Project Name    : hsxt-gpf-gcs-service
 * 
 *  Package Name    : com.gy.hsxt.gpf.gcs.interfaces
 * 
 *  File Name       : ICurrencyService.java
 * 
 *  Creation Date   : 2015-7-12
 * 
 *  Author          : liuhq
 * 
 *  Purpose         : 币种ICurrencyService接口
 * 
 * 
 *  History         : TODO
 * 
 * </PRE>
 ***************************************************************************/
public interface ICurrencyService {
    /**
     * 插入记录
     * 
     * @param currency
     *            实体类 必须，非null
     * @return 返int类型 1成功，其他失败
     */
    public int insert(Currency currency);

    /**
     * 读取某条记录
     * 
     * @param currencyNo
     *            币种代码 必须，非null
     * @return 返回实体类Country
     */
    public Currency getCurrency(String currencyNo);

    /**
     * 获取数据分页列表
     * 
     * @param currency实体类
     *            必须，非null
     * @return 返回List<Currency>,数据为空，返回空List<Currency>
     */
    public List<Currency> getCurrencyListPage(Currency currency);

    /**
     * 获取全部有效
     * 
     * @return 返回List<Currency>,数据为空，返回空List<Currency>
     */
    public List<Currency> getCurrencyAll();

    /**
     * 更新某条记录
     * 
     * @param currency实体类
     *            必须，非null
     * @return 返回int类型 1成功，其他失败
     */
    public int update(Currency currency);

    /**
     * 删除某条记录
     * 
     * @param currency
     *            实体类 必须，非null
     * @return 返int类型 1成功，其他失败
     */
    public int delete(String currencyNo);

    /**
     * 判断是否已存在相同
     * 
     * @param currencyNo
     *            币种代码 必须，非null
     * @return 返回String 大于等于1存在，0不存在
     */
    public boolean existCurrency(String currencyNo);

    /**
     * 读取大于某个版本号的数据
     * 
     * @param version
     *            版本号 必须，非null
     * @return 返回List<Currency>,数据为空，返回空List<Currency>
     */
    public List<Currency> queryCurrencySyncData(Long version);

}
