package com.insrb.admin.filter;

import com.insrb.admin.model.LoginUser;
import com.insrb.admin.util.InsuConstant;
import com.insrb.admin.util.InsuStringUtil;
import java.io.IOException;
import java.util.Objects;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;

@Slf4j
// @Component
// @WebFilter(urlPatterns = "/admin/*")
// @Order(1)


/**
 * /admin/* 는 이 필터의 적용을 받는다.
 * Session에 user가 없으면 무조건 로그인(signin) 창으로 보낸다.
**/
public class AuthFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		log.info("AuthFilter  {} : {} : {}", req.getMethod(), req.getRequestURI(), req.getContentType());
		HttpSession session = req.getSession(false);
		if (Objects.isNull(session)) {
			if (InsuStringUtil.Equals(req.getContentType(),MediaType.APPLICATION_JSON_VALUE)) {
				res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "invalid access.");
			} else if (InsuStringUtil.Equals(req.getMethod(),"PUT")) {
				res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "invalid access.");
			} else {
				res.sendRedirect("/signin");
			}
			return;
		}

		LoginUser loginUser = (LoginUser) session.getAttribute(InsuConstant.USER);
		if (Objects.isNull(loginUser)) {
			session.invalidate();
			res.sendRedirect("/signin");
			return;
		}

		log.info("AuthFilter2  {} : Success",  req.getRequestURI());
		chain.doFilter(request, response);
	}

	/**
	 * 2021.02.04 JUEUS 에서는 오류나서 이부분 막아야 한다. Tmax 기술지원, 조성환 매니저.
	 */
	@Override
	public void destroy() {
		// Filter.super.destroy();
	}

	/**
	 * 2021.02.04 JUEUS 에서는 오류나서 이부분 막아야 한다. Tmax 기술지원, 조성환 매니저.
	 * @param filterConfig
	 * @throws ServletException
	 */
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// Filter.super.init(filterConfig);
	}
}
