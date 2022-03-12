package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/store")
public class StoreController {
    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public List<Store> getStores() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return storeService.getStores(Long.valueOf(authentication.getPrincipal().toString()));
    }

    @GetMapping(path = "{storeId}")
    public Store getStore(@PathVariable Long storeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return storeService.getStore(Long.valueOf(authentication.getPrincipal().toString()), storeId);
    }

    @PostMapping
    public Store newStore(@RequestParam String storeName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return storeService.newStore(Long.valueOf(authentication.getPrincipal().toString()), storeName);
    }
}
