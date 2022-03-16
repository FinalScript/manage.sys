package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/store")
@CrossOrigin(origins ="*")
public class StoreController {
    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public List<Store> getStores(HttpServletRequest httpServletRequest) {
        return storeService.getStores((Long) httpServletRequest.getAttribute("adminId"));
    }

    @GetMapping(path = "{storeId}")
    public Store getStore(@PathVariable Long storeId, HttpServletRequest httpServletRequest) {
        return storeService.getStore((Long) httpServletRequest.getAttribute("adminId"), storeId);
    }

    @PostMapping
    public Store newStore(@RequestParam String storeName, HttpServletRequest httpServletRequest) {
        return storeService.newStore((Long) httpServletRequest.getAttribute("adminId"), storeName);
    }
}
