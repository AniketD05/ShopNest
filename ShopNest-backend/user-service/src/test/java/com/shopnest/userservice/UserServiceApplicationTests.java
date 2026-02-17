//package com.shopnest.userservice;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.shopnest.userservice.dto.RegisterRequest;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class UserServiceApplicationTests {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//
//    @Test
//    void testRegisterApi() throws Exception {
//        RegisterRequest req = new RegisterRequest();
//        req.setUsername("TestUser" + System.currentTimeMillis()); // unique
//        req.setEmail("user" + System.currentTimeMillis() + "@test.com");
//        req.setPassword("Pass@123");
//
//        mockMvc.perform(post("/api/auth/register")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(req)))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().string("User registered successfully"));
//    }
//
//    @Test
//    void testRegisterApiFail() throws Exception {
//        RegisterRequest req = new RegisterRequest();
//        req.setUsername("Aniket"); // existing username
//        req.setEmail("TestUser@test.com"); 
//        req.setPassword("Pass@123");
//
//        mockMvc.perform(post("/api/auth/register")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(req)))
//                .andDo(print())
//                .andExpect(status().isBadRequest())
//                .andExpect(content().string("Username already taken"));
//    }
//}
