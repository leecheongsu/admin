package com.insrb.admin.mapper;

import java.util.List;
import java.util.Map;
import com.insrb.admin.model.LoginUser;

public interface IN008TMapper {
    List<Map<String, Object>> selectAll();
    LoginUser selectById(String uuid);
    int update(String column_name,String column_value,String pk_value);
}
