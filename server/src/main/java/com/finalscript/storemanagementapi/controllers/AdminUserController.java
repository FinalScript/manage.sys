package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.AdminUser;
import com.finalscript.storemanagementapi.services.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Handle the AdminUser Controllers
 */
@RestController
@RequestMapping(path = "/api/v1/admin")
@CrossOrigin(origins ="*")
public class AdminUserController {
    private final AdminUserService adminUserService;

    /**
     * @param adminUserService adminUserService  Class object
     */
    @Autowired
    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    /**
     * @return  Retrieved admin at the given ID
     */
    @GetMapping
    public AdminUser getAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return adminUserService.getAdmin(Long.valueOf(authentication.getPrincipal().toString()));
    }

    /**
     * @param username username of admin
     * @param password password of admin
     * @return A new registered admin user
     */
    @PostMapping("/register")
    public AdminUser register(@RequestParam String username, @RequestParam String password) {
        AdminUser newUser = new AdminUser(username, password);

        return adminUserService.register(newUser);
    }

    /**
     * @param username username of admin
     * @param password password of admin
     * @return The Logged in admin user
     */
    @PostMapping("/login")
    public AdminUser login(@RequestParam String username, @RequestParam String password) {
        AdminUser newUser = new AdminUser(username, password);

        return adminUserService.login(newUser);
    }
}
