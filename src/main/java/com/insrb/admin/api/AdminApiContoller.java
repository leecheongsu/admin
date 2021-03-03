package com.insrb.admin.api;

import com.insrb.admin.exception.InsuEncryptException;
import com.insrb.admin.mapper.CommonMapper;
import com.insrb.admin.mapper.IN003T_V1Mapper;
import com.insrb.admin.mapper.IN008TMapper;
import com.insrb.admin.util.InsuStringUtil;
import com.insrb.admin.util.cyper.UserInfoCyper;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
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
@RequestMapping("/admin/api")
@RestController
public class AdminApiContoller {

	@Autowired
	CommonMapper commonMapper;

	@Autowired
	IN008TMapper in008tMapper;

	@Autowired
	IN003T_V1Mapper in003t_v1Mapper;

	@GetMapping(path = "/in008t/data")
	public List<Map<String, Object>> in008t_data(HttpSession session) throws InsuEncryptException {
		// LoginUser loginUser = (LoginUser) session.getAttribute(InsuConstant.USER);
		// log.info("{} request /admin/api/data",loginUser.getUuid());
		List<Map<String, Object>> users = in008tMapper.selectAll();
		for (Map<String, Object> user : users) {
			String mobile = (String) user.get("mobile");
			String decMobile = UserInfoCyper.DecryptMobile(mobile);
			user.put("mobile", decMobile);
		}
		return users;
	}

	@PutMapping(path = "/in008t/update")
	public String in008t_update(
		@RequestParam(name = "pk", required = true) String pk_value,
		@RequestParam(name = "name", required = true) String column_name,
		@RequestParam(name = "value", required = true) String column_value
	)
		throws InsuEncryptException {
		log.info("PK:{},{},{}", pk_value, column_name, column_value);
		// (String table_name,String column_name,String column_value,String pk_column,String pk_value);
		// insuroboad2019@insurobo.co.kr,comname,인슈로보xcsdfsdf

		if (InsuStringUtil.Equals(column_name, "mobile")) {
			column_value = UserInfoCyper.EncryptMobile(column_value);
		}
		if (InsuStringUtil.Equals(column_name, "upwd")) {
			column_value = UserInfoCyper.EncryptPassword(pk_value, column_value);
		}
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

	@GetMapping(path = "/in003t_v1/data")
	public List<Map<String, Object>> in003t_v1_data(HttpSession session) throws InsuEncryptException {
		List<Map<String, Object>> list = in003t_v1Mapper.selectAll();
		for (Map<String, Object> item : list) {
			item.put("mobile", UserInfoCyper.DecryptMobile(String.valueOf(item.get("mobile"))));
			item.put("pbohumja_mobile", UserInfoCyper.DecryptMobile(String.valueOf(item.get("pbohumja_mobile"))));
		}

		return list;
	}
}
