package com.gy.hsi.ds.param.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.disconf.core.common.constants.DisConfigTypeEnum;
import com.baidu.disconf.core.common.path.ZooPathMgr;
import com.gy.hsi.ds.param.beans.ZkDisconfData;
import com.gy.hsi.ds.param.beans.ZooConfig;
import com.gy.hsi.ds.param.beans.bo.App;
import com.gy.hsi.ds.param.service.IZkDeployMgr;
import com.gy.hsi.ds.param.service.IZooKeeperDriver;

/**
 * @author liaoqiqi
 * @version 2014-9-11
 */
@Service
public class ZkDeployMgrImpl implements IZkDeployMgr {

    @Autowired
    private IZooKeeperDriver zooKeeperDriver;

    @Autowired
    private ZooConfig zooConfig;

    /**
     * 获取ZK的详细部署信息
     */
    @Override
    public String getDeployInfo(String app, String env, String version) {

        // 路径获取
        String url = ZooPathMgr.getZooBaseUrl(zooConfig.getZookeeperUrlPrefix(), app, env, version);

        List<String> hostInfoList = zooKeeperDriver.getConf(url);

        return StringUtils.join(hostInfoList, '\n');
    }

    /**
     * 获取每个配置级别的Map数据, Key是配置, Value是ZK配置数据
     *
     * @return
     */
    public Map<String, ZkDisconfData> getZkDisconfDataMap(String app, String env, String version) {

        return zooKeeperDriver.getDisconfData(app, env, version);
    }

    public ZkDisconfData getZkDisconfData(String app, String env, String version, DisConfigTypeEnum disConfigTypeEnum,
                                          String keyName) {

        return zooKeeperDriver.getDisconfData(app, env, version, disConfigTypeEnum, keyName);
    }

    @Override
    public ZkDisconfData getZkCommonDisconfData(List<App> appList,String env, String version, DisConfigTypeEnum disConfigTypeEnum,
            String keyName) {
        return zooKeeperDriver.getDisconfData(appList,env, version, disConfigTypeEnum, keyName);
    }

}