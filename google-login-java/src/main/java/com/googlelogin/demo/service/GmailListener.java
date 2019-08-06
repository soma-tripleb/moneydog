package com.googlelogin.demo.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;

import java.util.List;

public interface GmailListener {

  public String getGmailId(GoogleTokenResponse tokenResponse);

  public Gmail getGmailService(String accessToken);

  public List<Message> listMessagesMatchingQuery (Gmail service, String userId, String query);

  public String getSnippet(Gmail service, String userId, String messageId);

  public String getMessage(Gmail service, String userId, String messageId);
}
