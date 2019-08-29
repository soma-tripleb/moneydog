package com.googlelogin.demo.service.api;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.gmail.Gmail;
import com.googlelogin.demo.api.GoogleApi;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@SpringBootTest
@RunWith(SpringRunner.class)
public class GetCredentialTest {

  Logger logger = LoggerFactory.getLogger(this.getClass());

  @Value("${google.api.console.refresh.token}")
  private String REFRESH_TOKEN;

  @Autowired
  GoogleApi googleApi;

  @Test
  public void 사용자_GOOGLE_서버_접근권한_얻기() {
    String accessToken = googleApi.getAccessTokenOfRefreshToken(REFRESH_TOKEN);

    GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

    Gmail service = new Gmail.Builder(
            new NetHttpTransport(),
            JacksonFactory.getDefaultInstance(),
            credential
    ).setApplicationName("moneydog")
            .build();

    assertThat(service, is(notNullValue()));

  }
}
