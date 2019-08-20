package com.googlelogin.demo.service;

import com.googlelogin.demo.dao.JsonData;
import com.googlelogin.demo.dao.GoogleUserInfo;
import com.googlelogin.demo.dao.Content;

import java.util.Map;

public interface GmailListener {

  Map<String, String> gMailBodyContents (GoogleUserInfo googleUserInfo);

  JsonData<Content> getMessagesId(String query);

  JsonData<Content> getMessagesSnippet(String query);

  JsonData<Content> getMessagesBody(String query);

  JsonData<Content> getMessageTotal(String query);
}
