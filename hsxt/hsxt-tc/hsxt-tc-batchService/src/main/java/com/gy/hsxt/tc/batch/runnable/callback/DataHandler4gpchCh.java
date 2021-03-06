/*
 * Copyright (c) 2015-2018 SHENZHEN GUIYI SCIENCE AND TECHNOLOGY DEVELOP CO., LTD. All rights reserved.
 *
 * 注意：本内容仅限于深圳市归一科技研发有限公司内部传阅，禁止外泄以及用于其他的商业目的 
 */
/*
 * Copyright (c) 2015-2018 SHENZHEN GUIYI SCIENCE AND TECHNOLOGY DEVELOP CO., LTD. All rights reserved.
 *
 * 注意：本内容仅限于深圳市归一科技研发有限公司内部传阅，禁止外泄以及用于其他的商业目的 
 */

package com.gy.hsxt.tc.batch.runnable.callback;

import org.springframework.data.redis.core.RedisTemplate;

import com.gy.hsxt.tc.batch.mapper.TcGpchMapper;

/**
 * gpch对账之ch端数据文件内容拆解及入库
 * 
 * @Package: com.gy.hsxt.tc.batch.runnable.callback
 * @ClassName: DataHandler4GpchGp
 * @Description: TODO
 * 
 * @author: lvyan
 * @date: 2015-11-13 下午2:18:48
 * @version V1.0
 */
public class DataHandler4gpchCh extends DataHandlerAbstract {
    /**
     * 账单入库表
     */
    public static final String MY_TABLE = "T_TC_GPCH_CH_TMP";

    /**
     * 账单入库表字段 (与数据文件字段顺序保持一致)： 银联流水号｜交易时间｜银联订单号｜交易类型｜交易金额｜交易状态｜商户日期
     */
    public static final String[] MY_COLUMNS = { "CH_SEQ_ID", "CH_TRANS_DATE", "CH_TRAN_NUM", "CH_TRANS_TYPE",
            "CH_TRANS_AMOUNT", "CH_TRANS_STATUS", "CH_MERCHANT_DATE" };

    public DataHandler4gpchCh(TcGpchMapper batchMapper, RedisTemplate redisTemplate) {
        super(batchMapper, redisTemplate, MY_TABLE, MY_COLUMNS);

    }

    /**
     * 生成对账要素
     * 
     * @param args
     *            一行数据
     * @return
     */
    public String generateCheckKey(String[] args) {
        // 对账文件字段：银联流水号｜交易时间｜银联订单号｜交易类型｜交易金额｜交易状态｜商户日期
        // GP-CH 对账要素：银联订单号|交易类型|交易金额|交易状态
        StringBuilder sb = new StringBuilder();
        sb.append(args[2]).append("|");
        sb.append(args[3]).append("|");
        sb.append(args[4]).append("|");
        sb.append(args[5]);
        return sb.toString();
    }

}
