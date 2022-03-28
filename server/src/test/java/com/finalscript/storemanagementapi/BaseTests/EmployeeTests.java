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
public class T3EmployeeTests {
    private static String token;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private StoreRepository storeRepository;

    @Test
    public void T1_Create_Employee_Expect200() throws Exception {
        MvcResult mvcResult = mvc.perform(post("/api/v1/admin/register").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("username", "TestUser")
                        .queryParam("password", "123456"))
                .andExpect(status().isOk())
                .andReturn();

        JSONObject jsonObject = new JSONObject(mvcResult.getResponse()
                .getContentAsString());
        token = jsonObject.getString("token");

        mvc.perform(post("/api/v1/store/").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("storeName", "TestStore")
                        .header("authorization", token))
                .andExpect(status().isOk());

        mvc.perform(post("/api/v1/store/{storeId}/employee", 1).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("name", "TestEmployee")
                        .header("authorization", token))
                .andExpect(status().isOk());
    }

    @Test
    public void T2_Get_Employee_Expect200() throws Exception {
        mvc.perform(get("/api/v1/store/{storeId}/employee/{employeeId}", 1, 1).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("name", "TestEmployee")
                        .header("authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("TestEmployee"));
    }

    @Test
    public void T3_Get_Employee_NoAuth_Expect403() throws Exception {
        mvc.perform(get("/api/v1/store/{storeId}/employee/{employeeId}", 1, 1).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("name", "TestEmployee"))
                .andExpect(status().isForbidden());
    }

    @Test
    public void T4_Patch_Employee_NoChanges_Expect200() throws Exception {
        mvc.perform(patch("/api/v1/store/{storeId}/employee/{employeeId}", 1, 1).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token))
                .andExpect(status().isOk());
    }

    @Test
    public void T5_Patch_Employee_WageAndStatus_Expect200() throws Exception {
        mvc.perform(patch("/api/v1/store/{storeId}/employee/{employeeId}", 1, 1).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token)
                        .queryParam("wage", "16")
                        .queryParam("status", "Hired"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.wage").value("16.0"))
                .andExpect(jsonPath("$.status").value("Hired"));
    }

    @Test
    public void T6_Patch_Employee_SameWage_Expect400() throws Exception {
        mvc.perform(patch("/api/v1/store/{storeId}/employee/{employeeId}", 1, 1).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token)
                        .queryParam("wage", "16"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void T7_Delete_Employee_Expect200() throws Exception {
        mvc.perform(delete("/api/v1/store/{storeId}/employee/{employeeId}", 1, 1).contentType(MediaType.APPLICATION_JSON)
                        .header("authorization", token))
                .andExpect(status().isOk());

        Optional<Store> storeOptional = storeRepository.findById(1L);

        if (storeOptional.isEmpty()) {
            throw new Exception();
        }
    }
}
