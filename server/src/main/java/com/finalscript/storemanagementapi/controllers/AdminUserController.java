package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.AdminUser;
import com.finalscript.storemanagementapi.services.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/admin")
public class AdminUserController {
    private final AdminUserService adminUserService;

    @Autowired
    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    public AdminUser getAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return adminUserService.getAdmin(Long.valueOf(authentication.getPrincipal().toString()));
    }

    @PostMapping("/register")
    public AdminUser register(@RequestParam String username, @RequestParam String password) {
        AdminUser newUser = new AdminUser(username, password);

        return adminUserService.register(newUser);
    }

    @PostMapping("/login")
    public AdminUser login(@RequestParam String username, @RequestParam String password) {
        AdminUser newUser = new AdminUser(username, password);

        return adminUserService.login(newUser);
    }
}
