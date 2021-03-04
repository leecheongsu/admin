package com.insrb.admin.api;

import com.insrb.admin.mapper.IN003TMapper;
import com.insrb.admin.util.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

// @Slf4j
@RequestMapping("/admin")
@Controller
public class AdminContoller {

	@Autowired
	StorageService storageService;

	@Autowired
	IN003TMapper in003tMapper;

	private static final String _MENU = "_menu";

	@GetMapping(path = "/index")
	public String index(Model model) {
		model.addAttribute(_MENU, "dashboard");
		return "/admin/dashboard";
	}

	@GetMapping(path = "/manager")
	public String manager(Model model) {
		model.addAttribute(_MENU, "manager");
		return "/admin/manager";
	}

	@GetMapping(path = "/dashboard")
	public String dashboard(Model model) {
		model.addAttribute(_MENU, "dashboard");
		return "/admin/dashboard";
	}

	@GetMapping(path = "/users")
	public String users(Model model) {
		model.addAttribute(_MENU, "users");
		return "/admin/users";
	}

	@PostMapping(path = "/dashboard/upload")
	@ResponseBody
	public String dashboard_upload(
		@RequestParam("file") MultipartFile file,
		@RequestParam(name = "quote_no", required = true) String quote_no
	) {
		storageService.store(file);
		String filename = file.getOriginalFilename();
		in003tMapper.update("filename", filename, quote_no);
		return filename;
	}

	@GetMapping(path = "/dashboard/file")
	@ResponseBody
	public ResponseEntity<Resource> dashboard_file(@RequestParam(name = "filename", required = true) String filename) {
		Resource file = storageService.loadAsResource(filename);
		return ResponseEntity
			.ok()
			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
			.body(file);
	}
}
