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

/**
 * Holds multiple methods to handle Store data
 */
@Service
public class StoreService {
    private final StoreRepository storeRepository;
    private final AdminUserRepository adminUserRepository;

    /**
     * @param storeRepository Store Repository object
     * @param adminUserRepository Admin User Repository object
     */
    @Autowired
    public StoreService(StoreRepository storeRepository, AdminUserRepository adminUserRepository) {
        this.storeRepository = storeRepository;
        this.adminUserRepository = adminUserRepository;
    }

    /**
     * @param adminId Admin ID
     * @return List of stores at given admin ID
     */
    public List<Store> getStores(Long adminId) {
        List<Store> storesList = storeRepository.findAllByAdminUser_Id(adminId);

        if (storesList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No stores connected to account #" + adminId);
        }

        return storesList;
    }

    /**
     * @param adminId Admin ID
     * @param storeId Store ID
     * @return A store at a given Admin ID and Store ID
     */
    public Store getStore(Long adminId,Long storeId) {
        Optional<Store> storeOptional = storeRepository.findByAdminUser_IdAndId(adminId, storeId);

        if(storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
        }

        return storeOptional.get();
    }

    /**
     * @param adminId Value of sent in admin ID
     * @param storeName value of sent in store name
     * @return A new store filled with the given parameters
     */
    public Store newStore(Long adminId, String storeName) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(adminId);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Admin account #" + adminId + " does not exist");
        }

        Store store = new Store(storeName, userOptional.get());

        return storeRepository.save(store);
    }

    /**
     * This method must validate the password and then proceed to delete the store by id
     * @param password admin password
     */
    public void deleteStore() {
        // TODO
    }

    /**
     * This method must take in a parameter of storeName and if that parameter exists and is not the same as the previous name
     * It will proceed to update the store by id and return the newly updated store
     */
    public void updateStore() {
        // TODO
    }
}
