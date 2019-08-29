package com.googlelogin.demo.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.repackaged.org.apache.commons.codec.binary.Base64;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;
import com.googlelogin.demo.api.GoogleApi;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@SpringBootTest
@RunWith(SpringRunner.class)
public class MessageTotalTest {

  @Autowired
  public GoogleApi googleApi;

  @Test
  public void ACCESS_TOKEN_받기() {
    Optional<GoogleTokenResponse> maybeTokenResponse = Optional.ofNullable(googleApi.tokenResponseWithRefreshToken());
    GoogleTokenResponse tokenResponse = maybeTokenResponse.get();

    Optional<String> maybeAccessToken = Optional.ofNullable(tokenResponse.getAccessToken());
    String accessToken = maybeAccessToken.get();

    assertThat(accessToken, is(notNullValue()));
  }

  @Test
  public void 사용자_ACCESS_TOKEN_유무확인() {
    Optional<GoogleTokenResponse> maybeTokenResponse = Optional.ofNullable(googleApi.tokenResponseWithRefreshToken());
    GoogleTokenResponse tokenResponse = maybeTokenResponse.get();

    Optional<String> maybeAccessToken = Optional.ofNullable(tokenResponse.getAccessToken());
    String accessToken = maybeAccessToken.get();

    GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

    Gmail service = new Gmail.Builder(
            new NetHttpTransport(),
            JacksonFactory.getDefaultInstance(),
            credential
    ).setApplicationName("moneydog")
            .build();

    List<Message> messages = new ArrayList<>();

    try {
      ListMessagesResponse response = service.users().messages().list("dudrnxps1@gmail.com").setQ("from:no_reply@email.apple.com").execute();

      Optional<List<Message>> maybeMessages = Optional.ofNullable(response.getMessages());

      messages = maybeMessages.get();

      Message message = service.users().messages().get("dudrnxps1@gmail.com", messages.get(0).getId()).execute();

      System.out.println(message.toPrettyString());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
