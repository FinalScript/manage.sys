package com.finalscript.storemanagementapi.services;

import com.finalscript.storemanagementapi.models.AdminUser;
import com.finalscript.storemanagementapi.repositories.AdminUserRepository;
import com.finalscript.storemanagementapi.utility.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

/**
 * Service class for handling adminUser data
 */
@Service
public class AdminUserService {
    private final AdminUserRepository adminUserRepository;

    /**
     * @param adminUserRepository adminUser repository object
     */
    @Autowired
    public AdminUserService(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    /**
     * This method will get an adminUser by id
     *
     * @param id admin id
     * @return Retrieved adminUser
     */
    public AdminUser getAdmin(Long id) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User does not exist");
        }

        return userOptional.get();
    }

    /**
     * This method will create a new adminUser and generate a bearer token
     *
     * @param newUser adminUser object
     * @return Newly created adminUser
     */
    public AdminUser register(AdminUser newUser) {
        Optional<AdminUser> userOptional = adminUserRepository.findAdminUserByUsername(newUser.getUsername());

        if (userOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account with that username already exists");
        }

        if (newUser.getPassword().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 6 characters long");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        newUser.setPassword(encoder.encode(newUser.getPassword()));

        AdminUser savedUser = adminUserRepository.save(newUser);

        savedUser.setToken(JWT.getJWTToken(savedUser));

        return savedUser;
    }

    /**
     * This method will get an adminUser and generate a bearer token
     *
     * @param user existing adminUser object
     * @return Retrieved adminUser
     */
    public AdminUser login(AdminUser user) {
        Optional<AdminUser> userOptional = adminUserRepository.findAdminUserByUsername(user.getUsername());

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account with that username does not exist");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(user.getPassword(), userOptional.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Username/Password combination invalid");
        }

        userOptional.get().setToken(JWT.getJWTToken(userOptional.get()));

        return userOptional.get();
    }


    /**
     * This method will delete an adminUser by validation of password
     *
     * @param id       admin id
     * @param password admin password
     */
    public void deleteAdmin(Long id, String password) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account with that id does not exist");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(password, userOptional.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password invalid");
        }

        adminUserRepository.deleteById(id);
    }

    /**
     * This method will update an adminUser by validation of password, and optional fields of name and email
     *
     * @param id       admin id
     * @param password admin password
     * @param name     admin name
     * @param email    admin email
     * @return updated AdminUser
     */
    public AdminUser updateAdmin(Long id, String password, String name, String email) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account with that id does not exist");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(password, userOptional.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password invalid");
        }

        if (name != null && name.length() > 0) {
            if (Objects.equals(userOptional.get().getName(), name)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name cannot be the same");
            }

            userOptional.get().setName(name);
        }

        if (email != null && email.length() > 0) {
            if (Objects.equals(userOptional.get().getEmail(), email)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email cannot be the same");
            }

            userOptional.get().setEmail(email);
        }

        return adminUserRepository.save(userOptional.get());
    }
}
