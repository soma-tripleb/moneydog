package com.googlelogin.demo.api;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class GoogleApi {

  private static final String GOOGLE_API_SERVER_URL = "https://www.googleapis.com/oauth2/v4/token";

  @Value("${google.api.console.application.name}")
  private String GOOGLE_API_CONSOLE_APPLICATION_NAME;

  @Value("${google.api.console.client.id}")
  private String GOOGLE_API_CONSOLE_CLIENT_ID;

  @Value("${google.api.console.client.password}")
  private String GOOGLE_API_CONSOLE_CLIENT_PASSWORD;

  @Value("${google.api.console.redirect.url}")
  private String GOOGLE_API_CONSOLE_REDIRECT_URL;

  /**
   * Client Id Token 을 이용해서 사용자의 Google 서버에 접속할 수 있는 Access Token 발행.
   * @return
   */
  public GoogleTokenResponse googleTokenResponse (String token) {

    try {
      GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(new NetHttpTransport(), JacksonFactory.getDefaultInstance(),
              GOOGLE_API_SERVER_URL,
              GOOGLE_API_CONSOLE_CLIENT_ID,
              GOOGLE_API_CONSOLE_CLIENT_PASSWORD,
              token,
              GOOGLE_API_CONSOLE_REDIRECT_URL
              ).execute();

      return tokenResponse;

    } catch (IOException e) {
      //TODO, exception
      e.printStackTrace();
    }

    return null;
  }
}
