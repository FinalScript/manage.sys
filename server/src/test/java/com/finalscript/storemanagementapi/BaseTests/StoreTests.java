package com.finalscript.storemanagementapi.BaseTests;

import com.finalscript.storemanagementapi.models.AdminUser;
import com.finalscript.storemanagementapi.repositories.AdminUserRepository;
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
public class T2StoreTests {
    private static String token;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private AdminUserRepository adminUserRepository;

    @Test
    public void T1_Create_Store_Expect200() throws Exception {
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
    }

    @Test
    public void T2_Create_Store_NoAuth_Expect403() throws Exception {
        mvc.perform(post("/api/v1/store/").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("storeName", "TestStore"))
                .andExpect(status().isForbidden());
    }

    @Test
    public void T3_Patch_Store_Name_Expect200() throws Exception {
        mvc.perform(patch("/api/v1/store/{storeId}", 1).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("storeName", "RenamedStore")
                        .queryParam("password", "123456")
                        .header("authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("RenamedStore"));
    }

    @Test
    public void T4_Delete_Store_Expect200() throws Exception {
        mvc.perform(delete("/api/v1/store/{storeId}", 1).contentType(MediaType.APPLICATION_JSON)
                        .queryParam("password", "123456")
                        .header("authorization", token))
                .andExpect(status().isOk());

        Optional<AdminUser> adminUserOptional = adminUserRepository.findById(1L);

        if (adminUserOptional.isEmpty()) {
            throw new Exception();
        }
    }
}
