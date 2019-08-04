package com.googlelogin.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DemoController {

  @GetMapping("/")
  public String index() {
    return "login";
  }

  @PostMapping("tokensignin")
  public String getToken(@RequestParam(value = "idtoken") String token) {

    System.out.println(token);

    return "redirect:/";
  }
}
