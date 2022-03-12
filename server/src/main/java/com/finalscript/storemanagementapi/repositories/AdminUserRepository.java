package com.finalscript.storemanagementapi.repositories;

import com.finalscript.storemanagementapi.models.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
       Optional<AdminUser> findAdminUserByUsername(String username);
}
