package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Handles the Store Controllers
 */
@RestController
@RequestMapping(path = "/api/v1/store")
@CrossOrigin(origins = "*")
public class StoreController {
    private final StoreService storeService;

    /**
     * @param storeService storeService class object
     */
    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    /**
     * @param httpServletRequest HTTP request object
     * @return List of stores at given admin ID
     */
    @GetMapping
    public List<Store> getStores(HttpServletRequest httpServletRequest) {
        return storeService.getStores((Long) httpServletRequest.getAttribute("adminId"));
    }

    /**
     * @param storeId            store ID
     * @param httpServletRequest HTTP request object
     * @return A store at a given admin ID and store ID
     */
    @GetMapping(path = "{storeId}")
    public Store getStore(@PathVariable Long storeId, HttpServletRequest httpServletRequest) {
        return storeService.getStore((Long) httpServletRequest.getAttribute("adminId"), storeId);
    }

    /**
     * @param storeName          store name
     * @param httpServletRequest HTTP request object
     * @return A new store filled with the given parameters
     */
    @PostMapping
    public Store newStore(@RequestParam String storeName, HttpServletRequest httpServletRequest) {
        return storeService.newStore((Long) httpServletRequest.getAttribute("adminId"), storeName);
    }

    /**
     * @param storeId            store id
     * @param password           admin password
     * @param httpServletRequest HTTP Request object
     */
    @DeleteMapping(path = "{storeId}")
    public void deleteStore(@PathVariable Long storeId, @RequestParam String password, HttpServletRequest httpServletRequest) {

        storeService.deleteStore((Long) httpServletRequest.getAttribute("adminId"), storeId, password);
    }

    public Store updateStore() {
        // TODO

        return storeService.updateStore();
    }
}
