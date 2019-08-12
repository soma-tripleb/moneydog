package com.googlelogin.demo;

import static org.junit.Assert.assertEquals;

import static org.springframework.test.web.client.ExpectedCount.once;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.googlelogin.demo.util.RestService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.support.RestGatewaySupport;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RestServiceTestViaGateway {

  @Autowired RestTemplate restTemplate;
  @Autowired RestService service;

  private MockRestServiceServer mockServer;

  @Before
  public void setUp() {
    RestGatewaySupport gateway = new RestGatewaySupport();
    gateway.setRestTemplate(restTemplate);
    mockServer = MockRestServiceServer.createServer(gateway);
  }

  @Test
  public void testGetRootResourceOnce() {
    mockServer.expect(once(), requestTo("https://localhost:8090/tokensignin"))
            .andRespond(withSuccess("{message : 'under construction'}", MediaType.APPLICATION_JSON));

    String result = service.getUserInfo();
    System.out.println("testGetRootResourceOnce: " + result);

    mockServer.verify();
    assertEquals("{message : 'under construction'}", result);
  }
}