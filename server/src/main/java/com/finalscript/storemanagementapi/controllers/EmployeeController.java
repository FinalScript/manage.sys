package com.finalscript.storemanagementapi.controllers;

import com.finalscript.storemanagementapi.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/store/{storeId}/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    public void getEmployees() {
        // TODO
    }

    public void getEmployee() {
        // TODO
    }

    public void newEmployee() {
        // TODO
    }
}
