package com.finalscript.storemanagementapi.filters;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StoreAdminIdParseFilter extends GenericFilterBean {
    RequestMatcher customFilterUrl = new AntPathRequestMatcher("/api/v1/store/**");

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        if (customFilterUrl.matches(httpServletRequest)) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication != null) {
                httpServletRequest.setAttribute("adminId", Long.valueOf(authentication.getPrincipal().toString()));
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
