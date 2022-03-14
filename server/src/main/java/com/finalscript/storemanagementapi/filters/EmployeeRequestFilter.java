package com.finalscript.storemanagementapi.filters;

import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.repositories.StoreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class EmployeeRequestFilter extends GenericFilterBean {
    RequestMatcher customFilterUrl = new AntPathRequestMatcher("/api/v1/store/{storeId}/employee/**");

    private final StoreRepository storeRepository;

    public EmployeeRequestFilter(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        if (customFilterUrl.matches(httpServletRequest)) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if(authentication != null) {
                Long storeId = Long.valueOf(httpServletRequest.getRequestURI().split("/")[4]);

                Optional<Store> storeOptional = storeRepository.findById(storeId);

                if(storeOptional.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
                }

                if (!storeOptional.get().getAdminUser().getId().equals(Long.valueOf(authentication.getPrincipal().toString()))) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN);
                }
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
