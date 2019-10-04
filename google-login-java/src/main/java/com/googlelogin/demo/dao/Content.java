package com.googlelogin.demo.dao;

public class Content {
  private int id;
  private String data;

  public Content(int id, String data) {
    this.id = id;
    this.data = data;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getContent() {
    return data;
  }

  public void setContent(String data) {
    this.data = data;
  }
}
