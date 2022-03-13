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


        return employeeService.getEmployees(Long.valueOf(toString()));
    }
    @GetMapping(path = "{employeeId}")
    public Employee getEmployee(@PathVariable Long employeeId) {

        return employeeService.getEmployee(Long.valueOf(toString()), employeeId);

    }

    @PostMapping
    public Employee newEmployee(@RequestParam String password) {

        return employeeService.newEmployee(Long.valueOf(toString()), password);
    }
}
