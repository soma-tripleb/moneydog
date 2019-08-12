package com.googlelogin.demo.dao;

import java.util.List;

public class JsonData<T> {

  private String title;
  private int total;
  private List<? extends Content> objects;

  public JsonData(String title, int total, List<? extends Content> objects) {
    this.title = title;
    this.total = total;
    this.objects = objects;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getTotal() {
    return total;
  }

  public void setTotal(int total) {
    this.total = total;
  }

  public List<? extends Content> getObjects() {
    return objects;
  }

  public void setObjects(List<? extends Content> objects) {
    this.objects = objects;
  }
}
