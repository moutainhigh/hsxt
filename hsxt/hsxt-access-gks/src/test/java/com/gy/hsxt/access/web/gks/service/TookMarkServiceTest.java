/*
 * Copyright (c) 2015-2018 SHENZHEN GUIYI SCIENCE AND TECHNOLOGY DEVELOP CO., LTD. All rights reserved.
 *
 * 注意：本内容仅限于深圳市归一科技研发有限公司内部传阅，禁止外泄以及用于其他的商业目的 
 */
package com.gy.hsxt.access.web.gks.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gy.hsxt.bs.api.tool.IBSToolMarkService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:spring/spring-consumer.xml" })
public class TookMarkServiceTest {

	@Autowired
	IBSToolMarkService toolMarkService;

	@Test
	public void test() {
		try {
			toolMarkService.configToolDeviceIsUsed(
					"06001010000163521987431424", "110120151126040132000000",
					"060010100000001", "06002110000164063559726080");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
