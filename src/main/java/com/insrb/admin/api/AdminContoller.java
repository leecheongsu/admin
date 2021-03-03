package com.insrb.admin.api;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

// @Slf4j
@RequestMapping("/admin")
@Controller
public class AdminContoller {

	private static final String _MENU = "_menu";

	@GetMapping(path = "/index")
	public String index(Model model) {
		model.addAttribute(_MENU,"dashboard");
		return "/admin/dashboard";
	}

	@GetMapping(path = "/manager")
	public String manager(Model model) {
		model.addAttribute(_MENU,"manager");
		return "/admin/manager";
	}

	@GetMapping(path = "/dashboard")
	public String dashboard(Model model) {
		model.addAttribute(_MENU,"dashboard");
		return "/admin/dashboard";
	}

	@GetMapping(path = "/users")
	public String users(Model model) {
		model.addAttribute(_MENU,"users");
		return "/admin/users";
	}

}
