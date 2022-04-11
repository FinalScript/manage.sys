package com.finalscript.storemanagementapi.services;

import com.finalscript.storemanagementapi.models.AdminUser;
import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.repositories.AdminUserRepository;
import com.finalscript.storemanagementapi.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Holds multiple methods to handle Store data
 */
@Service
public class StoreService {
    private final StoreRepository storeRepository;
    private final AdminUserRepository adminUserRepository;

    /**
     * @param storeRepository     Store Repository object
     * @param adminUserRepository Admin User Repository object
     */
    @Autowired
    public StoreService(StoreRepository storeRepository, AdminUserRepository adminUserRepository) {
        this.storeRepository = storeRepository;
        this.adminUserRepository = adminUserRepository;
    }

    /**
     * Gets all stores of an admin
     *
     * @param adminId Admin ID
     * @return List of stores at given admin ID
     */
    public List<Store> getStores(Long adminId) {
        List<Store> storesList = storeRepository.findAllByAdminUser_IdOrderById(adminId);

        if (storesList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No stores connected to account #" + adminId);
        }

        return storesList;
    }

    /**
     * Gets a single store of an admin
     *
     * @param adminId Admin ID
     * @param storeId Store ID
     * @return A store at a given Admin ID and Store ID
     */
    public Store getStore(Long adminId, Long storeId) {
        Optional<Store> storeOptional = storeRepository.findByAdminUser_IdAndId(adminId, storeId);

        if (storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
        }

        return storeOptional.get();
    }

    /**
     * Creates a new store with the given parameters
     *
     * @param adminId   Value of sent in admin ID
     * @param storeName value of sent in store name
     * @param location  value of sent in location
     * @param currency  value of sent in currency
     * @return A new store filled with the given parameters
     */
    public Store newStore(Long adminId, String storeName, String location, String currency) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(adminId);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Admin account #" + adminId + " does not exist");
        }

        Store store = new Store(storeName, userOptional.get());

        store.setLocation(location);

        if (currency.length() > 10) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "currency must be less then 10 characters long");
       }

        store.setCurrency(currency);

        return storeRepository.save(store);
    }

    /**
     * Deletes a single store
     *
     * @param adminId  admin id
     * @param storeId  store id
     * @param password admin password
     */
    public void deleteStore(Long adminId, Long storeId, String password) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(adminId);
        Optional<Store> storeOptional = storeRepository.findById(storeId);

        //Admin does not exist
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account with that id does not exist");
        }

        //Store does not exist
        if (storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Store with that id does not exist");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //Checking if the Admins' password matches the password stored in the database
        if (!encoder.matches(password, userOptional.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password invalid");
        }

        //Deleting the store with the given store id
        storeRepository.deleteById(storeId);
    }

    /**
     * Updates a stores name
     *
     * @param adminId   admin id
     * @param storeId   store id
     * @param storeName store name
     * @param password  admin password
     * @param currency  store currency
     * @param location  store location
     * @return Updated store with new store name
     */
    public Store updateStore(Long adminId, Long storeId, String storeName, String password, String location, String currency) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(adminId);
        Optional<Store> storeOptional = storeRepository.findById(storeId);

        //Admin does not exist
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account with that id does not exist");
        }

        //Store does not exist
        if (storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Store with that id does not exist");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //Checking if the Admins' password matches the password stored in the database
        if (!encoder.matches(password, userOptional.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password invalid");
        }

        //Checks if store name isn't empty and sets the new store name
        if (storeName != null && storeName.length() > 0) {
            //Checks if store name is equal to the previous store name
            if (Objects.equals(storeOptional.get().getName(), storeName)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Store name cannot be the same");
            }

            storeOptional.get().setName(storeName);
        }

        //Checks if location isn't empty and sets the new location
        if (location != null && location.length() > 0) {
            //Checks if location is equal to the previous location
            if (Objects.equals(storeOptional.get().getLocation(), location)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Store location cannot be the same");
            }

            storeOptional.get().setLocation(location);
        }

        //Checks if currency isn't empty and sets the new currency
        if (currency != null && currency.length() > 0) {
            //Checks if currency is equal to the previous currency
            if (Objects.equals(storeOptional.get().getCurrency(), currency)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Store currency cannot be the same");
            }
            if (currency.length() > 10) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "currency must be less then 10 characters long");
            }

            storeOptional.get().setCurrency(currency);
        }

        return storeRepository.save(storeOptional.get());
    }
}
