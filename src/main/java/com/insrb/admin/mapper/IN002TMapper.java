package com.insrb.admin.mapper;

import java.util.List;
import java.util.Map;

public interface IN002TMapper {
    List<Map<String, Object>> selectByQuoteNo(String quote_no);
}
