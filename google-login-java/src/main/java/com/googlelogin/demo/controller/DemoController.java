package com.googlelogin.demo.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpHeaders;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import com.googlelogin.demo.api.GoogleApi;
import com.googlelogin.demo.dao.GoogleUserInfo;
import com.googlelogin.demo.service.GmailListener;

import com.googlelogin.demo.util.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class DemoController{

  @Value("${gmail.message.list.search.query}")
  private String QUERY;

  @Value("${google.api.console.refresh.token}")
  private String GOOGLE_API_CONSOLE_REFRESH_TOKEN;

  @Value("${user.gmail}")
  private String USER_GMAIL;

  @Value("${google.api.console.client.id}")
  private String CLIENT_ID;

  @Value("${google.api.console.client.password}")
  private String GOOGLE_API_CONSOLE_CLIENT_PASSWORD;

  private static final String GOOGLE_API_SERVER_URL = "https://www.googleapis.com/oauth2/v4/UserAccessToken";

  @Value("${google.api.console.application.name}")
  private String APPLICATION_NAME;

  @Value("${google.api.console.redirect.url}")
  private String GOOGLE_API_CONSOLE_REDIRECT_URL;

  @Value("${api.scope}")
  private String API_SCOPE;

  @Value("${redirect.uri}")
  private String REDIRECT_URI;

  @Autowired public GmailListener gmailListener;
  @Autowired public GoogleApi googleApi;
  @Autowired public JsonParser jsonParser;

  @GetMapping("/")
  public String getAccessToken(HttpServletRequest request) {

    /*
    // Create a state token to prevent request forgery.
    // Store it in the session for later validation.
    String state = new BigInteger(130, new SecureRandom()).toString(32);
    request.session().attribute("state", state);

    // Read index.html into memory, and set the client ID,
    // token state, and application name in the HTML before serving it.
    return new Scanner(new File("index.html"), "UTF-8")
      .useDelimiter("\\A").next()
      .replaceAll("[{]{2}\\s*CLIENT_ID\\s*[}]{2}", CLIENT_ID)
      .replaceAll("[{]{2}\\s*STATE\\s*[}]{2}", state)
      .replaceAll("[{]{2}\\s*APPLICATION_NAME\\s*[}]{2}",
                  APPLICATION_NAME);

    */

    RestTemplate restTemplate = new RestTemplate();

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

    params.add("scope", API_SCOPE);
    params.add("access_type", "offline");
    params.add("include_granted_scopes", "true");
    params.add("state", "state_parameter_passthrough_value");
    params.add("redirect_uri", "https://localhost:8090");
    params.add("response_type", "code");
    params.add("login_hint", "dudrnxps1@gmail.com");
    params.add("prompt", "none");
    params.add("client_id", CLIENT_ID);

    String result = restTemplate.postForObject("https://accounts.google.com/o/oauth2/v2/auth", params, String.class);

    System.out.println(result);

    return result;
  }

  @GetMapping("/refreshtoken")
  public String getGoogleTokenResponse() throws Exception {
    GoogleTokenResponse tokenResponse = googleApi.tokenResponseWithRefreshToken();

    return tokenResponse.getAccessToken();
  }

  /**
   * dev - '사용자를 특정해서 탐색'
   * service - '/messages/[user-id]/[query]
   * @param query
   * @return
   */
  @GetMapping("/messages/{query}")
  public List<String> getMessagesId(@PathVariable String query) {
    return gmailListener.getMessagesId(query);
  }

  @GetMapping("/messages/snippet/{query}")
  public List<String> getMessagesSnippet(@PathVariable String query) {
    return gmailListener.getMessagesSnippet(query);
  }

  @CrossOrigin("*")
  @PostMapping("tokensignin")
  public Map<String, String> getClientTonken(@RequestBody String jsonData) {
    GoogleUserInfo googleUserInfo = jsonParser.getUserInfo(jsonData);

    return gmailListener.gMailBodyContents(googleUserInfo);
  }
}
