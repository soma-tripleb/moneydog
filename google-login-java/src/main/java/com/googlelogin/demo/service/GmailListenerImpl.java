package com.googlelogin.demo.service;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;

import com.googlelogin.demo.api.GoogleApi;
import com.googlelogin.demo.dao.GoogleUserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("gmailListener")
public class GmailListenerImpl implements GmailListener {

  @Value("${google.api.console.application.name}")
  private String GOOGLE_API_CONSOLE_APPLICATION_NAME;

  @Value("${gmail.message.list.search.query}")
  private String GMAIL_MESSAGE_LIST_SEARCH_QUERY;

  @Autowired public GoogleApi googleApi;

  @Override
  public Map<String, String> gMailBodyContents(GoogleUserInfo googleUserInfo) {

    Map<String, String> result = new HashMap<>();

    String userGmail = googleUserInfo.getGmail();

    Gmail service = googleApi.getGmailService(googleUserInfo.getAccessToken());

    List<Message> messagesIdList = googleApi.listMessagesMatchingQuery(service, userGmail, GMAIL_MESSAGE_LIST_SEARCH_QUERY);

    for(Message m : messagesIdList) {
      String messageId = m.getId();

      result.put(googleApi.getSnippet(service, userGmail, messageId),
              googleApi.getMessageHtml(service, userGmail, messageId));
    }

    return result;
  }
}
