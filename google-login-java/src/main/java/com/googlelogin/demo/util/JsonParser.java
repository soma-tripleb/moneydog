package com.googlelogin.demo.util;

import com.googlelogin.demo.dao.GoogleUserInfo;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JsonParser {

  public GoogleUserInfo getUserInfo(String jsonData) {

    GoogleUserInfo googleUserInfo = new GoogleUserInfo();

    JSONParser jsonParser = new JSONParser();

    try {
      JSONObject jsonObject = (JSONObject) jsonParser.parse(jsonData);
      JSONObject dataObject = (JSONObject) jsonObject.get("data");

      googleUserInfo.setAccessToken(dataObject.get("accessToken").toString());
      googleUserInfo.setTokenId(dataObject.get("tokenId").toString());
      googleUserInfo.setGmail(dataObject.get("gmail").toString());
    } catch (ParseException e) {
      //TODO
      e.printStackTrace();
    }

    return googleUserInfo;
  }
}
