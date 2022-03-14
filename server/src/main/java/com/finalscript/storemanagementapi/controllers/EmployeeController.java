package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.models.Employee;
import com.finalscript.storemanagementapi.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Employee> getEmployees(@PathVariable Long storeId) {


        return employeeService.getEmployees(storeId);
    }
    @GetMapping(path = "{employeeId}")
    public Employee getEmployee(@PathVariable Long employeeId, @PathVariable Long storeId) {

        return employeeService.getEmployee(storeId, employeeId);
    }

    @PostMapping
    public Employee newEmployee(@RequestParam String password, @PathVariable Long storeId) {


        return employeeService.newEmployee(storeId, password);
    }
}