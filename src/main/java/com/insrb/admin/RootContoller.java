package com.insrb.admin;

import com.insrb.admin.mapper.IN008TMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class RootContoller {

  @Autowired
  IN008TMapper in008tMapper;

  @GetMapping(path = "/")
  public String index(Model model){
    return "signin";
  }

  @GetMapping(path = "/admin")
  public String admin(Model model){
    return "/admin/index";
  }

}
