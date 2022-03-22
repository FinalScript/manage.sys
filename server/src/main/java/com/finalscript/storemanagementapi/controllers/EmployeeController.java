package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.Employee;
import com.finalscript.storemanagementapi.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 *  Handles the Employee Controller
 */
@RestController
@RequestMapping(path = "/api/v1/store/{storeId}/employee")
@CrossOrigin(origins ="*")
public class EmployeeController {
    private final EmployeeService employeeService;

    /**
     * @param employeeService employeeService class object
     */
    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     * @param storeId ID of store
     * @return list of employees at a given store
     */
    @GetMapping
    public List<Employee> getEmployees(@PathVariable Long storeId) {
        return employeeService.getEmployees(storeId);
    }

    /**
     * @param employeeId ID of employee
     * @param storeId ID of store
     * @return Employee at a given store with the given ID
     */
    @GetMapping(path = "{employeeId}")
    public Employee getEmployee(@PathVariable Long employeeId, @PathVariable Long storeId) {
        return employeeService.getEmployee(storeId, employeeId);
    }

    /**
     * @param password password of employee
     * @param storeId ID of store
     * @return A new employee filled with the given parameters
     */
    @PostMapping
    public Employee newEmployee(@RequestParam String name, @PathVariable Long storeId) {
        return employeeService.newEmployee(storeId, name);
    }
}