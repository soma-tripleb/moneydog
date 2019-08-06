package com.googlelogin.demo.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import com.googlelogin.demo.api.GoogleApi;
import com.googlelogin.demo.service.GmailListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class DemoController{

  @Value("${gmail.message.list.search.query}")
  private String GMAIL_MESSAGE_LIST_SEARCH_QUERY;

  @Autowired
  public GmailListener gmailListener;

  @Autowired
  public GoogleApi googleApi;

  @GetMapping("/")
  public String index() {
    return "login";
  }

  @PostMapping("tokensignin")
  public String getClientTonken(@RequestParam(value = "idtoken") String idToken) {

    GoogleTokenResponse tokenResponse = googleApi.googleTokenResponse(idToken);

    String accessToken = tokenResponse.getAccessToken();

    String userGmailId = gmailListener.getGmailId(tokenResponse);

    Gmail service = gmailListener.getGmailService(accessToken);

    List<Message> messages = gmailListener.listMessagesMatchingQuery(service, userGmailId, GMAIL_MESSAGE_LIST_SEARCH_QUERY);

    System.out.println("----start----");

    int index = 1;
    for (Message message : messages) {
      if(index == 1) {
        index++;
        continue;
      }
      /* snipat output */
      String messageId = message.getId();

      String snippet = gmailListener.getSnippet(service, userGmailId, messageId);
      String content1 = gmailListener.getMessage(service, userGmailId, messageId);

      System.out.format("- MESSAGE %d: %s \n", index++, snippet);
      System.out.println("- CONTENT");
      System.out.println(content1);

      if(index == 3) break;
    }

    System.out.println("----end----");

    return "redirect:/";
  }


  @GetMapping("user")
  public String user() {
    return "user";
  }
}
