package com.finalscript.storemanagementapi.BaseTests;

import com.finalscript.storemanagementapi.models.Store;
import com.finalscript.storemanagementapi.repositories.StoreRepository;
import org.json.JSONObject;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EmployeeTests {
    private static String token;
    private static int storeId;
    private static int employeeId;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private StoreRepository storeRepository;

    @Test
    public void T1_Create_Employee_Expect200() throws Exception {
        MvcResult adminMvcResult = mvc.perform(post("/api/v1/admin/register").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("username", "EmployeeTestUser")
                        .queryParam("password", "123456"))
                .andExpect(status().isOk())
                .andReturn();

        JSONObject adminJson = new JSONObject(adminMvcResult.getResponse()
                .getContentAsString());
        token = adminJson.getString("token");

        MvcResult storeMvcResult = mvc.perform(post("/api/v1/store/").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("storeName", "TestStore")
                        .header("authorization", token))
                .andExpect(status().isOk())
                .andReturn();

        JSONObject storeJson = new JSONObject(storeMvcResult.getResponse()
                .getContentAsString());
        storeId = storeJson.getInt("id");

        MvcResult employeeMvcResult = mvc.perform(post("/api/v1/store/{storeId}/employee", storeId).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("name", "TestEmployee")
                        .header("authorization", token))
                .andExpect(status().isOk())
                .andReturn();


        JSONObject employeeJson = new JSONObject(employeeMvcResult.getResponse()
                .getContentAsString());
        employeeId = employeeJson.getInt("id");
    }

    @Test
    public void T2_Get_Employee_Expect200() throws Exception {
        mvc.perform(get("/api/v1/store/{storeId}/employee/{employeeId}", storeId, employeeId).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("name", "TestEmployee")
                        .header("authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("TestEmployee"));
    }

    @Test
    public void T3_Get_Employee_NoAuth_Expect403() throws Exception {
        mvc.perform(get("/api/v1/store/{storeId}/employee/{employeeId}", storeId, employeeId).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("name", "TestEmployee"))
                .andExpect(status().isForbidden());
    }

    @Test
    public void T4_Patch_Employee_NoChanges_Expect200() throws Exception {
        mvc.perform(patch("/api/v1/store/{storeId}/employee/{employeeId}", storeId, employeeId).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token))
                .andExpect(status().isOk());
    }

    @Test
    public void T5_Patch_Employee_WageAndStatus_Expect200() throws Exception {
        mvc.perform(patch("/api/v1/store/{storeId}/employee/{employeeId}", storeId, employeeId).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token)
                        .queryParam("wage", "16")
                        .queryParam("status", "Hired"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.wage").value("16.0"))
                .andExpect(jsonPath("$.status").value("Hired"));
    }

    @Test
    public void T6_Patch_Employee_SameWage_Expect400() throws Exception {
        mvc.perform(patch("/api/v1/store/{storeId}/employee/{employeeId}", storeId, employeeId).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token)
                        .queryParam("wage", "16"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void T7_Delete_Employee_Expect200() throws Exception {
        mvc.perform(delete("/api/v1/store/{storeId}/employee/{employeeId}", storeId, employeeId).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token))
                .andExpect(status().isOk());

        Optional<Store> storeOptional = storeRepository.findById((long) storeId);

        if (storeOptional.isEmpty()) {
            throw new Exception();
        }
    }
}
