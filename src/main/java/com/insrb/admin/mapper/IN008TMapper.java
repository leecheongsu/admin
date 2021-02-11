package com.insrb.admin.mapper;

import java.util.List;
import java.util.Map;

public interface IN008TMapper {
    List<Map<String, Object>> selectAll();

    void update(String column_name,String column_value,String pk_value);
}
