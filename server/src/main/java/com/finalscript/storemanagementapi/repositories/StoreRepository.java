package com.finalscript.storemanagementapi.repositories;

import com.finalscript.storemanagementapi.models.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findAllByAdminUser_IdOrderById(Long adminId);
    Optional<Store> findByAdminUser_IdAndId(Long adminId, Long storeId);
}
