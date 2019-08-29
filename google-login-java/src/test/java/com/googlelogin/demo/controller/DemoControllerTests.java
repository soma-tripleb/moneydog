package com.googlelogin.demo.controller;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.googlelogin.demo.service.GmailListener;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;

@RunWith(SpringRunner.class)
public class DemoControllerTests {
  @Rule
  public ExpectedException thrown = ExpectedException.none();

  @Autowired
  private MockRestServiceServer server;

  @Test
  public void rest_test() {
    server.expect(requestTo("/tokensignin"))
            .andRespond(
                    withSuccess(new ClassPathResource("/test.json", getClass()), MediaType.APPLICATION_JSON));

  }
}