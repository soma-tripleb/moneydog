package com.googlelogin.demo.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.googlelogin.demo.api.GoogleApi;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@SpringBootTest
@RunWith(SpringRunner.class)
public class GetAccessTokenTest {

  @Autowired GoogleApi googleApi;

  @Test
  public void ACCESS_TOKEN_받기() {
    Optional<GoogleTokenResponse> maybeTokenResponse = Optional.ofNullable(googleApi.tokenResponseWithRefreshToken());
    GoogleTokenResponse tokenResponse = maybeTokenResponse.get();

    Optional<String> maybeAccessToken = Optional.ofNullable(tokenResponse.getAccessToken());
    String accessToken = maybeAccessToken.get();

    Assert.assertNotNull(accessToken);
  }
}
