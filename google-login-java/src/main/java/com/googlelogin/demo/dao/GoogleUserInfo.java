package com.googlelogin.demo.dao;

public class GoogleUserInfo {

  private String accessToken;
  private String tokenId;
  private String gmail;

  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  public String getTokenId() {
    return tokenId;
  }

  public void setTokenId(String tokenId) {
    this.tokenId = tokenId;
  }

  public String getGmail() {
    return gmail;
  }

  public void setGmail(String gmail) {
    this.gmail = gmail;
  }

  @Override
  public String toString() {
    return "GoogleUserInfo{" +
            "accessToken='" + accessToken + '\'' +
            ", tokenId='" + tokenId + '\'' +
            ", gmail='" + gmail + '\'' +
            '}';
  }
}
