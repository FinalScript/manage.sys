/**
 * March 13, 2022
 **/

package com.finalscript.storemanagementapi.services;

import com.finalscript.storemanagementapi.models.Employee;
import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.repositories.AdminUserRepository;
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
 * Handles the services related to the Employee
 */
@Service
public class EmployeeService {
    /**
     * Employee Repository Object
     */
    private final EmployeeRepository employeeRepository;
    /**
     * Store Repository Object
     */
    private final StoreRepository storeRepository;

    /**
     * @param employeeRepository
     * @param storeRepository
     */
    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository,
                           StoreRepository storeRepository) {
        this.employeeRepository = employeeRepository;
        this.storeRepository = storeRepository;
    }

    /**
     * @param storeId
     * @return List of Employees
     */
    public List<Employee> getEmployees(Long storeId) {
        List<Employee> employeeList = employeeRepository.findEmployeesByStore_Id(storeId);

        if (employeeList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No employees found at store #" + storeId);
        }

        return employeeList;
    }

    /**
     * @param storeId
     * @param employeeId
     * @return
     */
    public Employee getEmployee(Long storeId, Long employeeId) {
        Optional<Employee> employeeOptional = Optional.ofNullable(employeeRepository.findEmployeeByStore_IdAndId(storeId, employeeId));

        if (employeeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee with ID #" + employeeId + " does not exist at store with ID #" + storeId);
        }

        return employeeOptional.get();
    }

    /**
     * Creates a new employee and saves it to the database
     *
     * @param storeId  Store ID where the new employee should be created
     * @param password Password of the new employee
     * @return Employee Object
     **/
    public Employee newEmployee(Long storeId, String password) {
        // Creates a Store Optional and finds the Store given the Store ID
        Optional<Store> storeOptional = storeRepository.findById(storeId);

        // Checks if the there is an existing store with the given store ID
        if (storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
        }

        // Checks if the provided password is of a valid range
        if (password.length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 6 characters long");
        }

        // Creating a new Encoder object
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Creating a new employee
        Employee employee = new Employee();
        // Encoding the employee password and setting the password
        employee.setPassword(encoder.encode(password));
        // Setting the store for the employee with the given store ID
        employee.setStore(storeOptional.get());

        return employeeRepository.save(employee);
    }
}
