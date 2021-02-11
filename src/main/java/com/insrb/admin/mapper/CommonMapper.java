package com.insrb.admin.mapper;

public interface CommonMapper {
    void update(String table_name,String column_name,String column_value,String pk_column,String pk_value);
}
