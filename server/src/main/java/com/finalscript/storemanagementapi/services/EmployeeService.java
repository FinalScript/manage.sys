package com.finalscript.storemanagementapi.services;

import com.finalscript.storemanagementapi.models.Employee;
import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.repositories.EmployeeRepository;
import com.finalscript.storemanagementapi.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

/**
 * Holds multiple methods to handle Employee data
 */
@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final StoreRepository storeRepository;

    /**
     * @param employeeRepository Employee Repository object
     * @param storeRepository    Store Repository object
     */
    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, StoreRepository storeRepository) {
        this.employeeRepository = employeeRepository;
        this.storeRepository = storeRepository;
    }

    /**
     * @param storeId Store ID
     * @return List of employees at a given store
     */
    public List<Employee> getEmployees(Long storeId) {
        List<Employee> employeeList = employeeRepository.findEmployeesByStore_Id(storeId);

        if (employeeList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No employees found at store #" + storeId);
        }

        return employeeList;
    }

    /**
     * @param storeId    Store ID
     * @param employeeId Employee ID
     * @return Employee at a given store with the given ID
     */
    public Employee getEmployee(Long storeId, Long employeeId) {
        Optional<Employee> employeeOptional = Optional.ofNullable(employeeRepository.findEmployeeByStore_IdAndId(storeId, employeeId));

        if (employeeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee with ID #" + employeeId + " does not exist at store with ID #" + storeId);
        }

        return employeeOptional.get();
    }

    /**
     * @param storeId Store ID
     * @param name    Employee name
     * @return A new employee filled with the given parameters
     */
    public Employee newEmployee(Long storeId, String name) {

        Optional<Store> storeOptional = storeRepository.findById(storeId);

        // Checks if the there is an existing store with the given store ID
        if (storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
        }

        // Checks if the provided password is of a valid range
//        if (password.length() < 6) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 6 characters long");
//        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        Employee employee = new Employee(name);
//        employee.setPassword(encoder.encode(password));
        employee.setStore(storeOptional.get());

        return employeeRepository.save(employee);
    }

    /**
     * This method must delete the employee by id
     */
    public void deleteEmployee() {
        // TODO
    }

    /**
     * This method must take in the following parameters and check if those parameters are not the same as their previous values
     * - Float wage
     * - String status
     * - Date startingDate
     * It will proceed to update the employee by id and return the newly updated employee
     */
    public void updateEmployee() {
        // TODO
    }
}