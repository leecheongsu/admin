package com.insrb.admin.api;

import java.util.Objects;
import javax.servlet.http.HttpSession;
import com.insrb.admin.exception.InsuEncryptException;
import com.insrb.admin.mapper.IN008TMapper;
import com.insrb.admin.model.LoginUser;
import com.insrb.admin.util.InsuConstant;
import com.insrb.admin.util.cyper.UserInfoCyper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class RootContoller {

	@Autowired
	IN008TMapper in008tMapper;

	@GetMapping(path = "/")
	public String index(Model model) {
		return "signin";
	}

	@GetMapping(path = "/signin")
	public String signin(HttpSession session) {
		return "signin";
	}

	@PostMapping(path = "/signin")
	public ModelAndView signin(
		HttpSession session,
		ModelMap model,
		@RequestParam(name = "uid", required = true) String uid,
		@RequestParam(name = "upwd", required = true) String plainPassword
	) {
		LoginUser loginUser = in008tMapper.selectById(uid);
		if (Objects.isNull(loginUser)) {
			model.addAttribute("message", "no user");
			// return "/signin";
			return new ModelAndView("redirect:/signin", model);
		}

		String pwdOnDatabase = (String) loginUser.getUpwd();

		try {
			if (pwdOnDatabase.equals(UserInfoCyper.EncryptPassword(uid, plainPassword))) {
				log.info(loginUser.toString());
				session.setAttribute(InsuConstant.USER, loginUser);
				// return "redirect:/admin/index";
        return new ModelAndView("redirect:/admin/index", model);
			}
			model.addAttribute("message", "pwd mismatch");
		} catch (InsuEncryptException e) {
			model.addAttribute("message", "encrypt error");
		}
		// return "/signin";
    return new ModelAndView("redirect:/signin", model);
	}

	@GetMapping(path = "/signout")
	public String signout(HttpSession session) {
		if (session != null) session.invalidate();
		return "/";
	}
}
