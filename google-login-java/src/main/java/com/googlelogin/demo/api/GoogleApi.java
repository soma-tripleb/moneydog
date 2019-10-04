package com.googlelogin.demo.api;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.repackaged.org.apache.commons.codec.binary.Base64;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePart;
import com.google.api.services.gmail.model.MessagePartBody;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.*;

@Component
public class GoogleApi {

  private static final String GOOGLE_API_SERVER_URL = "https://www.googleapis.com/oauth2/v4/UserAccessToken";

  @Value("${google.api.console.application.name}")
  private String GOOGLE_API_CONSOLE_APPLICATION_NAME;

  @Value("${google.api.console.client.id}")
  private String CLIENT_ID;

  @Value("${google.api.console.client.password}")
  private String CLIENT_PASSWORD;

  @Value("${google.api.console.redirect.url}")
  private String GOOGLE_API_CONSOLE_REDIRECT_URL;

  @Value("${google.api.console.refresh.token}")
  private String REFRESH_TOKEN;

  /**
   * Client Id Token 을 이용해서 사용자의 Google 서버에 접속할 수 있는 Access Token 발행.
   * @return
   */
  public GoogleTokenResponse tokenResponseWithTokenId (String tokenId) {

    try {
      GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
              new NetHttpTransport(),
              JacksonFactory.getDefaultInstance(),
              GOOGLE_API_SERVER_URL,
              CLIENT_ID,
              CLIENT_PASSWORD,
              tokenId,
              GOOGLE_API_CONSOLE_REDIRECT_URL
              ).execute();

      return tokenResponse;

    } catch (IOException e) {
      //TODO, exception
      e.printStackTrace();
    }

    return null;
  }

  /**
   * 'Refresh Token' 을 이용한 인증
   * @return
   */
  public GoogleTokenResponse tokenResponseWithRefreshToken() {

    try {
      GoogleTokenResponse tokenResponse = new GoogleRefreshTokenRequest(
              new NetHttpTransport(),
              JacksonFactory.getDefaultInstance(),
              REFRESH_TOKEN,
              CLIENT_ID,
              CLIENT_PASSWORD
      ).execute();

      return tokenResponse;

    } catch (IOException e) {
      //TODO, exception
      e.printStackTrace();
    }

    return null;
  }

  public String getAccessTokenOfRefreshToken(String refreshToken) {
    Optional<GoogleTokenResponse> maybeTokenResponse = Optional.ofNullable(this.tokenResponseWithRefreshToken());
    GoogleTokenResponse tokenResponse = maybeTokenResponse.get();

    Optional<String> maybeAccessToken = Optional.ofNullable(tokenResponse.getAccessToken());
    String accessToken = maybeAccessToken.get();

    return accessToken;
  }

  public Gmail getGmailService(String accessToken) {
    GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

    Gmail service = new Gmail.Builder(new NetHttpTransport(),
            JacksonFactory.getDefaultInstance(),credential)
            .setApplicationName(GOOGLE_API_CONSOLE_APPLICATION_NAME)
            .build();

    return service;
  }

  public List<Message> listMessagesMatchingQuery(Gmail service, String userId, String query) {

    List<Message> messages = new ArrayList<>();

    try {
      ListMessagesResponse response = service.users().messages().list(userId).setQ(query).execute();

      while (response.getMessages() != null) {
        messages.addAll(response.getMessages());

        if (response.getNextPageToken() != null) {
          String pageToken = response.getNextPageToken();
          response = service.users().messages().list(userId).setQ(query).setPageToken(pageToken).execute();
        } else {
          break;
        }
      }

    } catch (IOException e) {
      //TODO, listMessagesMatchingQuery() - IOException
      e.printStackTrace();
    }

    return messages;
  }

  public String getSnippet(Gmail service, String userId, String messageId) {

    String snippet = null;

    try {
      Message message = service.users().messages().get(userId, messageId).execute();

      snippet = message.getSnippet();

    } catch(IOException e) {
      //TODO, getSnippet - IOException
      e.printStackTrace();
    }

    return snippet;
  }

  public String getMessageHtml(Gmail service, String userId, String messageId) {

    Map<String, String> mailBodyContents = new HashMap<>();

//    String textBody = null;
    String htmlBody = null;

    try {
      Message message = service.users().messages().get(userId, messageId).execute();

//      MessagePart messagePart1 = message.getPayload().getParts().get(0);
      MessagePart messagePart2 = message.getPayload().getParts().get(1);

//      MessagePartBody messagePartBody1 = messagePart1.getBody();
      MessagePartBody messagePartBody2 = messagePart2.getBody();

//      textBody = messagePartBody1.getData();
      htmlBody = messagePartBody2.getData();

    } catch (IOException e) {
      //TODO, getMessage() - IOException
      e.printStackTrace();
    }

    /* decoding */
    Base64 base64Url = new Base64(true);
//    byte[] decodedText = base64Url.decodeBase64(textBody);
    byte[] decodedHtml = base64Url.decodeBase64(htmlBody);

    /* byte to String */
//    mailBodyContents.put("textBody", new String(decodedText));
    mailBodyContents.put("htmlBody", new String(decodedHtml));

    String html = new String(decodedHtml);

    return html;
  }


  public String getMessageTotal(Gmail service, String userId, String messageId) {

    try {
      Message message = service.users().messages().get(userId, messageId).execute();

      Base64 base64Url = new Base64(true);
      byte[] emailBytes = base64Url.decodeBase64(message.getRaw());

      System.out.println(new String(emailBytes));
    } catch (IOException e) {
      e.printStackTrace();
    }

    return "success";
  }
}
