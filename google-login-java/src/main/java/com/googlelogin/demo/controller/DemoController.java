package com.googlelogin.demo.controller;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import com.googlelogin.demo.api.GoogleApi;
import com.googlelogin.demo.dao.GoogleUserInfo;
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

  @GetMapping("/")
  public String index() {
    return "google oauth api";
  }

  @CrossOrigin("*")
  @PostMapping("/tokensignin")
  @ResponseBody
  public Map<String, String> getClientTonken(@RequestBody String jsonData) {

    GoogleUserInfo googleUserInfo = jsonParser.getUserInfo(jsonData);

    System.out.println(googleUserInfo.toString());

    return gmailListener.gMailBodyContents(googleUserInfo);
  }
}
