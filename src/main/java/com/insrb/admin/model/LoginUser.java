package com.insrb.admin.model;

import lombok.Data;

@Data
public class LoginUser {
    String uuid;
    String upwd;
    String name;
    String mobile;
    String address;
    String ulevel;
    String comname;
    String businessnum;
    String gacode;
    String regdate;
    String account_status;
}
