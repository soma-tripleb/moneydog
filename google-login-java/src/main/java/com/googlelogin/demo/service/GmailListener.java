package com.googlelogin.demo.service;

import com.googlelogin.demo.dao.GoogleUserInfo;

import java.util.Map;

public interface GmailListener {

  Map<String, String> gMailBodyContents (GoogleUserInfo googleUserInfo);
}
