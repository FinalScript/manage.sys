package com.finalscript.storemanagementapi.configs;

import com.finalscript.storemanagementapi.filters.JWTFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity security) throws Exception {
        security.cors().and().csrf().disable().formLogin().disable().addFilterAfter(new JWTFilter(), UsernamePasswordAuthenticationFilter.class).authorizeRequests().antMatchers(
                "/api/v1/admin/login").permitAll().antMatchers("/api/v1/admin/register").permitAll().antMatchers("/error").permitAll().antMatchers(
                "/api/v1/admin/**").authenticated().anyRequest().authenticated();
    }
}