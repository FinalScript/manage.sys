package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.Employee;
import com.finalscript.storemanagementapi.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/store/{storeId}/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getEmployees() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return employeeService.getEmployees(Long.valueOf(authentication.getPrincipal().toString()));
    }
    @GetMapping(path = "{employeeId}")
    public Employee getEmployee(@PathVariable Long employeeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return employeeService.getEmployee(Long.valueOf(authentication.getPrincipal().toString()), employeeId);

    }

    @PostMapping
    public void newEmployee(@RequestParam String password) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return employeeService.newEmployee(Long.valueOf(authentication.getPrincipal().toString()), password);
    }
}
