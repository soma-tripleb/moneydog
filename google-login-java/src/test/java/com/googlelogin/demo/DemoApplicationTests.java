package com.googlelogin.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Value("${server.ssl.key-store}")
	private String HTTPS_KEY_FILE;

	@Value("${server.ssl.key-store-path}")
	private String HTTPS_KEY_FILE_PATH;

	/**
	 * Boot 구동 전에 TEST 실행 시키고 싶다.
	 */
	@Test
	public void HTTPS_KEY_FILE_경로확인() {

		File file = new File(HTTPS_KEY_FILE);
		File directory = new File(HTTPS_KEY_FILE_PATH);

		if(directory.isDirectory()) {
			logger.info("HTTPS KEY 파일이 있는 디렉토리가 있습니다.");
		} else {
			assertThat(directory.isFile(), is("true"));
			logger.info("HTTPS KEY 파일이 있는 디렉토리가 없습니다.");
		}

		if(file.isFile()) {
			logger.info("HTTPS KEY 파일이 해당 위치에 있습니다.");
		} else {
			assertThat(file.isFile(), is("true"));
			logger.info("HTTPS KEY 파일이 해당 위치에 없습니다.");
		}

	}

}
