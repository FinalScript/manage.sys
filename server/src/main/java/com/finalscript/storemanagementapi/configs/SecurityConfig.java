package com.finalscript.storemanagementapi.configs;

import com.finalscript.storemanagementapi.filters.EmployeeRequestFilter;
import com.finalscript.storemanagementapi.filters.JWTFilter;
import com.finalscript.storemanagementapi.filters.StoreAdminIdParseFilter;
import com.finalscript.storemanagementapi.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    public StoreRepository storeRepository;

    @Override
    protected void configure(HttpSecurity security) throws Exception {
        security.cors().and().csrf().disable().formLogin().disable().addFilterAfter(new JWTFilter(), UsernamePasswordAuthenticationFilter.class).addFilterAfter(new EmployeeRequestFilter(
                        storeRepository),
                BasicAuthenticationFilter.class).addFilterAfter(new StoreAdminIdParseFilter(), BasicAuthenticationFilter.class).authorizeRequests().antMatchers(
                "/api/v1/admin/login").permitAll().antMatchers("/api/v1/admin/register").permitAll().antMatchers("/error").permitAll().antMatchers(
                "/api/v1/admin/**").authenticated().anyRequest().authenticated();
    }
}