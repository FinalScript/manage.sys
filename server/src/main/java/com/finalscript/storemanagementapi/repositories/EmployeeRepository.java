package com.finalscript.storemanagementapi.repositories;

import com.finalscript.storemanagementapi.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findEmployeesByStore_Id(Long storeId);

}
