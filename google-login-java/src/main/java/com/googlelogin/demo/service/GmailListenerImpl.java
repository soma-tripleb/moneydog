package com.googlelogin.demo.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;

import com.googlelogin.demo.api.GoogleApi;
import com.googlelogin.demo.dao.GoogleUserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("gmailListener")
public class GmailListenerImpl implements GmailListener {

  @Value("${user.gmail}")
  private String USER_GMAIL;

  @Value("${google.api.console.application.name}")
  private String APPLICATION_NAME;

  @Value("${gmail.message.list.search.query}")
  private String QUERY;

  @Autowired public GoogleApi googleApi;

  @Override
  public Map<String, String> gMailBodyContents(GoogleUserInfo googleUserInfo) {

    Map<String, String> result = new HashMap<>();

    String userGmail = googleUserInfo.getGmail();

    Gmail service = googleApi.getGmailService(googleUserInfo.getAccessToken());

    List<Message> messagesIdList = googleApi.listMessagesMatchingQuery(service, userGmail, QUERY);

    for(Message m : messagesIdList) {
      String messageId = m.getId();

      result.put(googleApi.getSnippet(service, userGmail, messageId),
              googleApi.getMessageHtml(service, userGmail, messageId));
    }

    return result;
  }

  @Override
  public List<String> getMessagesId(String query) {

    GoogleTokenResponse tokenResponse = googleApi.tokenResponseWithRefreshToken();

    String accessToken = tokenResponse.getAccessToken();

    GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

    Gmail service = new Gmail.Builder(
            new NetHttpTransport(),
            JacksonFactory.getDefaultInstance(),
            credential
    ).setApplicationName(APPLICATION_NAME)
            .build();

    List<Message> messageIds = googleApi.listMessagesMatchingQuery(service, USER_GMAIL, query);

    return messageIds.stream().map(Message::getId).collect(Collectors.toList());
  }

  @Override
  public List<String> getMessagesSnippet(String query) {

    GoogleTokenResponse tokenResponse = googleApi.tokenResponseWithRefreshToken();

    String accessToken = tokenResponse.getAccessToken();

    GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

    Gmail service = new Gmail.Builder(
            new NetHttpTransport(),
            JacksonFactory.getDefaultInstance(),
            credential
    ).setApplicationName(APPLICATION_NAME)
            .build();

    List<Message> messageIds = googleApi.listMessagesMatchingQuery(service, USER_GMAIL, query);

    List<String> result = new LinkedList<>();

    for(Message m : messageIds) {
      try {
        result.add(service.users().messages().get(USER_GMAIL, m.getId()).execute().getSnippet());
      } catch(IOException e) {
        e.printStackTrace();
      }
    }

    return result;
  }
}
