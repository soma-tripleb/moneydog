package com.googlelogin.demo.config;

import org.apache.catalina.LifecycleException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;

/*
https://tjjava.blogspot.com/2012/03/https.html
 */
@Component
public class HttpsKeyFileFindConfig implements CommandLineRunner {

  Logger logger = LoggerFactory.getLogger(this.getClass());

  @Value("${server.ssl.key-store}")
  private String HTTPS_KEY_FILE_PATH;

  @Override
  public void run(String... args) {

//    try{
//      File file = new File(HTTPS_KEY_FILE_PATH);
//      file.isFile();
//    } catch (Exception e) {
//      logger.error("HTTPS KEY 파일이 존재 하지 않습니다.");
//    }

  }
}
