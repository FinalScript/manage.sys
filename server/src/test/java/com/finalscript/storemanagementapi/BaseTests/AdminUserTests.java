package com.finalscript.storemanagementapi.BaseTests;

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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class T1AdminUserTests {
    private static String token;
    @Autowired
    private MockMvc mvc;

    @Test
    public void T1_Register_New_Admin_Expect200() throws Exception {
        MvcResult mvcResult = mvc.perform(post("/api/v1/admin/register").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("username", "TestUser")
                        .queryParam("password", "123456"))
                .andExpect(status().isOk())
                .andReturn();

        JSONObject jsonObject = new JSONObject(mvcResult.getResponse()
                .getContentAsString());
        token = jsonObject.getString("token");
    }

    @Test
    public void T2_Register_Admin_WithExistingName_Expect409() throws Exception {
        mvc.perform(post("/api/v1/admin/register").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("username", "TestUser")
                        .queryParam("password", "123456"))
                .andExpect(status().isConflict());
    }

    @Test
    public void T3_Login_Admin_Expect200() throws Exception {
        mvc.perform(post("/api/v1/admin/login").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("username", "TestUser")
                        .queryParam("password", "123456"))
                .andExpect(status().isOk());
    }

    @Test
    public void T4_Login_Admin_Expect401() throws Exception {
        mvc.perform(post("/api/v1/admin/login").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("username", "TestUser")
                        .queryParam("password", "123"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void T5_Patch_Admin_NoChanges_Expect200() throws Exception {
        mvc.perform(patch("/api/v1/admin/").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("password", "123456")
                        .header("authorization", token))
                .andExpect(status().isOk());
    }

    @Test
    public void T6_Patch_Admin_NameAndEmail_Expect200() throws Exception {
        mvc.perform(patch("/api/v1/admin/").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("name", "TestUserTwo")
                        .queryParam("email", "user@test.com")
                        .queryParam("password", "123456")
                        .header("authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("TestUserTwo"))
                .andExpect(jsonPath("$.email").value("user@test.com"));
    }

    @Test
    public void T7_Delete_Admin_Expect200() throws Exception {
        mvc.perform(delete("/api/v1/admin/").contentType(MediaType.APPLICATION_JSON)
                        .queryParam("password", "123456")
                        .header("authorization", token))
                .andExpect(status().isOk());
    }

}
