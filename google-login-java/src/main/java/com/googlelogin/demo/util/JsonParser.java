package com.googlelogin.demo.util;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JsonParser {

  public Map<String, String> getUserInfo(String jsonData) {
    Map<String, String> userInfoMap = new HashMap<>();

    JSONParser jsonParser = new JSONParser();

    try {
      JSONObject jsonObject = (JSONObject) jsonParser.parse(jsonData);
      JSONObject dataObjetc = (JSONObject) jsonObject.get("data");

      userInfoMap.put("accessToken", dataObjetc.get("accessToken").toString());
      userInfoMap.put("tokenId", dataObjetc.get("tokenId").toString());
      userInfoMap.put("gmail", dataObjetc.get("gmail").toString());

    } catch (ParseException e) {
      //TODO
      e.printStackTrace();
    }

    return userInfoMap;
  }
}
