package com.insrb.admin.api;

import com.insrb.admin.mapper.CommonMapper;
import com.insrb.admin.mapper.IN008TMapper;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RequestMapping("/api")
@RestController
public class ApiContoller {

	@Autowired
	CommonMapper commonMapper;

	@Autowired
	IN008TMapper in008tMapper;

	@GetMapping(path = "/data")
	public List<Map<String, Object>> index() {
		return in008tMapper.selectAll();
	}

	@PutMapping(path = "/update")
	public String update(
		@RequestParam(name = "pk", required = true) String pk_value,
		@RequestParam(name = "name", required = true) String column_name,
		@RequestParam(name = "value", required = true) String column_value
	) {
		log.info("PK:{},{},{}", pk_value, column_name, column_value);
		// (String table_name,String column_name,String column_value,String pk_column,String pk_value);
		// insuroboad2019@insurobo.co.kr,comname,인슈로보xcsdfsdf

		try {
			in008tMapper.update(column_name, column_value, pk_value);
			return "";
		} catch (DataAccessException e) {
			if (e.getRootCause() instanceof SQLException) {
				SQLException sqlEx = (SQLException) e.getRootCause();
				int sqlErrorCode = sqlEx.getErrorCode();
				log.error("sqlErrorCode:" + sqlErrorCode);
			}
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정 오류.");
		}
	}
}
