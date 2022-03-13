package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.Employee;
import com.finalscript.storemanagementapi.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 */
@RestController
@RequestMapping(path = "/api/v1/store/{storeId}/employee")
public class EmployeeController {
    /**
     *
     */
    private final EmployeeService employeeService;

    /**
     * @param employeeService
     */
    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     * @param storeId
     * @return
     */
    @GetMapping
    public List<Employee> getEmployees(@PathVariable Long storeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return employeeService.getEmployees(storeId);
    }

    /**
     * @param employeeId
     * @param storeId
     * @return
     */
    @GetMapping(path = "{employeeId}")
    public Employee getEmployee(@PathVariable Long employeeId, @PathVariable Long storeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return employeeService.getEmployee(storeId, employeeId);
    }

    /**
     * @param password
     * @param storeId
     * @return
     */
    @PostMapping
    public Employee newEmployee(@RequestParam String password, @PathVariable Long storeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return employeeService.newEmployee(storeId, password);
    }
}
