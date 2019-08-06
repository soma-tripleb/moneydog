package com.googlelogin.demo.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
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
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.w3c.dom.Element;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service("gmailListener")
public class GmailListenerImpl implements GmailListener {

  @Value("${google.api.console.application.name}")
  private String GOOGLE_API_CONSOLE_APPLICATION_NAME;

  @Override
  public String getGmailId(GoogleTokenResponse tokenResponse) {

    String email = null;

    try {
      GoogleIdToken idToken = tokenResponse.parseIdToken();
      GoogleIdToken.Payload payload = idToken.getPayload();

      email = payload.getEmail();
    } catch (IOException e) {
      //TODO, parseIdToken() - IOException
      e.printStackTrace();
    }

    return email;
  }

  @Override
  public Gmail getGmailService(String accessToken) {
    GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

    Gmail service = new Gmail.Builder(new NetHttpTransport(),
            JacksonFactory.getDefaultInstance(),credential)
            .setApplicationName(GOOGLE_API_CONSOLE_APPLICATION_NAME)
            .build();

    return service;
  }

  @Override
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

  @Override
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

  @Override
  public String getMessage(Gmail service, String userId, String messageId) {

    String data1 = null;
    String data2 = null;

    try {
      Message message = service.users().messages().get(userId, messageId).execute();

      MessagePart messagePart1 = message.getPayload().getParts().get(0);
      MessagePart messagePart2 = message.getPayload().getParts().get(1);

      MessagePartBody messagePartBody1 = messagePart1.getBody();
      MessagePartBody messagePartBody2 = messagePart2.getBody();

      data1 = messagePartBody1.getData();
      data2 = messagePartBody2.getData();

    } catch (IOException e) {
      //TODO, getMessage() - IOException
      e.printStackTrace();
    }

    /* decoding */
    Base64 base64Url = new Base64(true);
    byte[] decodedData1 = base64Url.decodeBase64(data1);
    byte[] decodedData2 = base64Url.decodeBase64(data2);

    /* byte to String */
    String result1 = new String(decodedData1);  //only text
    String result2 = new String(decodedData2);  //html

    /* debug */
    System.out.println(result2);

    /* HTML parser */
    Document doc = Jsoup.parse(result1);

    return result1;
  }
}
