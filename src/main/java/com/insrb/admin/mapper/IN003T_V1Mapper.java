package com.insrb.admin.mapper;

import java.util.List;
import java.util.Map;

public interface IN003T_V1Mapper {
    List<Map<String, Object>> selectAll();

    List<Map<String, Object>> selectByInsDate(String pageSize, String pageNumber,String p_prod_code, String p_from, String p_to);
    int selectByInsDateTotal(String p_prod_code, String p_from, String p_to);
}
