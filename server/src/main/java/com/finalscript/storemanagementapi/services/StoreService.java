package com.finalscript.storemanagementapi.services;

import com.finalscript.storemanagementapi.models.AdminUser;
import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.repositories.AdminUserRepository;
import com.finalscript.storemanagementapi.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {
    private final StoreRepository storeRepository;
    private final AdminUserRepository adminUserRepository;

    @Autowired
    public StoreService(StoreRepository storeRepository, AdminUserRepository adminUserRepository) {
        this.storeRepository = storeRepository;
        this.adminUserRepository = adminUserRepository;
    }

    public List<Store> getStores(Long adminId) {
        List<Store> storesList = storeRepository.findAllByAdminUser_Id(adminId);

        if (storesList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No stores connected to account #" + adminId);
        }

        return storesList;
    }

    public Store getStore(Long adminId,Long storeId) {
        Optional<Store> storeOptional = storeRepository.findByAdminUser_IdAndId(adminId, storeId);

        if(storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
        }

        return storeOptional.get();
    }

    public Store newStore(Long adminId, String storeName) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(adminId);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Admin account #" + adminId + " does not exist");
        }

        Store store = new Store(storeName, userOptional.get());

        return storeRepository.save(store);
    }
}
