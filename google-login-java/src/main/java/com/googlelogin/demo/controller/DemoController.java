package com.googlelogin.demo.controller;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import com.googlelogin.demo.api.GoogleApi;
import com.googlelogin.demo.service.GmailListener;

import com.googlelogin.demo.util.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class DemoController{

  @Value("${gmail.message.list.search.query}")
  private String GMAIL_MESSAGE_LIST_SEARCH_QUERY;

  @Autowired public GmailListener gmailListener;
  @Autowired public GoogleApi googleApi;
  @Autowired public JsonParser jsonParser;

  @CrossOrigin("*")
  @PostMapping("tokensignin")
  public String getClientTonken(@RequestBody String jsonData) {


    Map<String, String> userInfoMap = jsonParser.getUserInfo(jsonData);

    String accessToken = userInfoMap.get("accessToken");

    String userGmailId = userInfoMap.get("gmail");

    Gmail service = gmailListener.getGmailService(accessToken);

    List<Message> messages = gmailListener.listMessagesMatchingQuery(service, userGmailId, GMAIL_MESSAGE_LIST_SEARCH_QUERY);

    System.out.println("----start----");

    int index = 1;
    for (Message message : messages) {
      if(index == 1) {
        index++;
        continue;
      }

      String messageId = message.getId();

      String snippet = gmailListener.getSnippet(service, userGmailId, messageId);
      String content1 = gmailListener.getMessage(service, userGmailId, messageId);

      System.out.format("- MESSAGE %d: %s \n", index++, snippet);
      System.out.println("- CONTENT");
      System.out.println(content1);

      if(index == 3) break;
    }

    System.out.println("----end----");

    return "/user/subscriptions";
  }
}
