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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
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

        // Checks if the there is an existing store with the given store ID
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
     * Deletes a single employee
     *
     * @param storeId    ID of store
     * @param employeeId ID of employee
     */
    public void deleteEmployee(Long storeId, Long employeeId) {
        Optional<Store> storeOptional = storeRepository.findById(storeId);
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);

        // Checks if the there is an existing store with the given store ID
        if (storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
        }

        // Checks if the there is an existing employee with the given employee ID
        if (employeeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee #" + employeeId + " does not exist");
        }

        //Deleting the employee with the given employee id
        employeeRepository.deleteById(employeeId);
    }


    /**
     * Updates employee with new wage, status and starting date
     *
     * @param storeId      ID of store
     * @param employeeId   ID of employee
     * @param wage         wage of employee
     * @param status       status of employee
     * @param startingDate starting date of employee
     * @return Updated employee  with new wage, status and starting date
     */
    public Employee updateEmployee(Long storeId, Long employeeId, Float wage, String status, String startingDate) {
        Optional<Store> storeOptional = storeRepository.findById(storeId);
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);

        // Checks if the there is an existing store with the given store ID
        if (storeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store #" + storeId + " does not exist");
        }

        // Checks if the there is an existing employee with the given employee ID
        if (employeeOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee #" + employeeId + " does not exist");
        }

        if (wage != null && wage > 0) {

            //Checks if employee wage is equal to the previous employee wage amount
            if (Objects.equals(employeeOptional.get().getWage(), wage)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wage cannot be the same");
            }

            employeeOptional.get().setWage(wage);
        }

        if (status != null && status.length() > 0) {

            //Checks if employee status is equal to the previous employee status
            if (Objects.equals(employeeOptional.get().getStatus(), status)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status cannot be the same");
            }

            employeeOptional.get().setStatus(status);
        }


        if (startingDate != null) {
            SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
            Date date;

            try {
                date = format.parse(startingDate);
            } catch (ParseException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
            }

            //Checks if employee Starting Date is equal to the previous employee Starting Date
            if (Objects.equals(employeeOptional.get().getStartingDate(), date)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Starting Date cannot be the same");
            }

            employeeOptional.get().setStartingDate(date);
        }

        return employeeRepository.save(employeeOptional.get());

    }
}