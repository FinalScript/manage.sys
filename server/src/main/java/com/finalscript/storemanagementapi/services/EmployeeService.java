package com.finalscript.storemanagementapi.services;

import com.finalscript.storemanagementapi.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
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
