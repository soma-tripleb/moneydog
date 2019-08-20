package com.googlelogin.demo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestService {

  @Autowired private RestTemplate restTemplate;

  public String getUserInfo() {
    String result = restTemplate.getForObject("https://localhost:8090/tokensignin", String.class);
    System.out.println("getUserInfo: " + result);

    return result;
  }
}