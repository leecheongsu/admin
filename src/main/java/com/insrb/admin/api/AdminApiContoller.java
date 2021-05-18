package com.insrb.admin.api;

import com.insrb.admin.exception.InsuEncryptException;
import com.insrb.admin.mapper.*;
import com.insrb.admin.util.InsuStringUtil;
import com.insrb.admin.util.cyper.UserInfoCyper;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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
import sun.jvm.hotspot.debugger.Page;

@Slf4j
@RequestMapping("/admin/api")
@RestController
public class AdminApiContoller {

	@Autowired
	CommonMapper commonMapper;

	@Autowired
	IN002TMapper in002tMapper;

	@Autowired
	IN003TMapper in003tMapper;

	@Autowired
	IN008TMapper in008tMapper;

	@Autowired
	IN003T_V1Mapper in003t_v1Mapper;

	@Autowired
	IN203T_V1Mapper in203T_v1Mapper;

	@GetMapping(path = "/in008t/data")
	public Map<String, Object> in008t_data(
		HttpSession session,
		@RequestParam(name = "pageSize", required = true) String pageSize,
		@RequestParam(name = "pageNumber", required = true) String pageNumber
	)
		throws InsuEncryptException {
		int total = in008tMapper.selectAllTotal();

		List<Map<String, Object>> users = in008tMapper.selectAll(pageSize, pageNumber);
		for (Map<String, Object> user : users) {
			String mobile = (String) user.get("mobile");
			String decMobile = UserInfoCyper.DecryptMobile(mobile);
			user.put("mobile", decMobile);
		}
		// return users;

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", String.valueOf(total));
		data.put("rows", users);
		return data;
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
			int cnt = in008tMapper.update(column_name, column_value, pk_value);
			if (cnt != 1) new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정 오류.");
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
	public Map<String, Object> in003t_v1_data(
		HttpSession session,
		@RequestParam(name = "p_prod_code", required = true) String p_prod_code,
		@RequestParam(name = "p_from", required = true) String p_from,
		@RequestParam(name = "p_to", required = true) String p_to,
		@RequestParam(name = "pageSize", required = true) String pageSize,
		@RequestParam(name = "pageNumber", required = true) String pageNumber
	)
		throws InsuEncryptException {

		int total = in003t_v1Mapper.selectByInsDateTotal(p_prod_code, p_from, p_to);
		List<Map<String, Object>> list = in003t_v1Mapper.selectByInsDate(pageSize, pageNumber, p_prod_code, p_from, p_to);

		for (Map<String, Object> item : list) {
			item.put("mobile", UserInfoCyper.DecryptMobile(String.valueOf(item.get("mobile"))));
			item.put("pbohumja_mobile", UserInfoCyper.DecryptMobile(String.valueOf(item.get("pbohumja_mobile"))));

			if (InsuStringUtil.Equals(String.valueOf(item.get("prod_code")), "m002")) {
				List<Map<String, Object>> premium = in002tMapper.selectByQuoteNo(String.valueOf(item.get("quote_no")));
				item.put("preminums", premium);
			}
		}

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", String.valueOf(total));
		data.put("rows", list);
		return data;
	}

	@GetMapping(path = "/in203t_v1/data")
	public Map<String, Object> in203t_v1_data(
			HttpSession session,
			@RequestParam(name = "p_prod_code", required = true) String p_prod_code,
			@RequestParam(name = "p_from", required = true) String p_from,
			@RequestParam(name = "p_to", required = true) String p_to,
			@RequestParam(name = "pageSize", required = true) String pageSize,
			@RequestParam(name = "pageNumber", required = true) String pageNumber
	)
			throws InsuEncryptException {

		int totalGroup = in203T_v1Mapper.selectByInsDateTotal(p_prod_code, p_from, p_to);

		int total = in003t_v1Mapper.selectByInsDateTotal(p_prod_code, p_from, p_to);
//		List<Map<String, Object>> listGroup = in203T_v1Mapper.selectByInsDate(pageSize, pageNumber, p_prod_code, p_from, p_to);
//		List<Map<String, Object>> list = in003t_v1Mapper.selectByInsDate(pageSize, pageNumber, p_prod_code, p_from, p_to);


		log.info(p_prod_code);
		//total + 처음
		int totalAll = totalGroup + total;
		List<Map<String, Object>> listAll = in203T_v1Mapper.selectByInsDateAll(pageSize, pageNumber, p_prod_code, p_from, p_to);



		for (Map<String, Object> item : listAll) {

			if(!InsuStringUtil.Equals(String.valueOf(item.get("prod_code")), "Gh007")) {
				item.put("mobile", UserInfoCyper.DecryptMobile(String.valueOf(item.get("mobile"))));
				item.put("pbohumja_mobile", UserInfoCyper.DecryptMobile(String.valueOf(item.get("pbohumja_mobile"))));

				if (InsuStringUtil.Equals(String.valueOf(item.get("prod_code")), "m002")) {
					List<Map<String, Object>> premium = in002tMapper.selectByQuoteNo(String.valueOf(item.get("quote_no")));
					item.put("preminums", premium);
				}
			}
		}


		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", String.valueOf(totalAll));
		data.put("rows", listAll);

//		log.info(String.valueOf(totalAll));
//		log.info(listAll.toString());
		return data;
	}


	@PutMapping(path = "/in003t/update")
	public String in003t_update(
		@RequestParam(name = "pk", required = true) String pk_value,
		@RequestParam(name = "name", required = true) String column_name,
		@RequestParam(name = "value", required = true) String column_value
	)
		throws InsuEncryptException {
		log.info("PK:{},{},{}", pk_value, column_name, column_value);
		int cnt = in003tMapper.update(column_name, column_value, pk_value);
		if (cnt != 1) new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정 오류.");
		return "";
	}
}
