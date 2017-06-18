package com.vvbaoyang.controller;

import com.vvbaoyang.repository.UserRepository;
import com.vvbaoyang.repository.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author mgcele
 */
@Controller
@RequestMapping("test")
public class TestController {
    private Logger logger = LoggerFactory.getLogger(TestController.class);
    
    @Autowired
    private UserRepository userRepository;
    
    
    @GetMapping(value = "/users")
    @ResponseBody
    public List<User> userList()
    {
        logger.info("/users");
        return userRepository.findAll();
    }
    
    @GetMapping(value = "/{id}")
    @ResponseBody
    public User userFindOne(@PathVariable("id") Integer id) {
        return userRepository.findOne(id);
    }
    
    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    @ResponseBody
    public String say(){
        logger.info("Hello World!");
        return "Hello World !";
    }
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String hello(){
        logger.info("First to try thymeleaf");
        return "login";
    }

    @RequestMapping(value = "/test/model", method = RequestMethod.GET)
    public String testmodel(){
        logger.info("/testmodel");
        return "[{\"imgUrl\": null,\"id\": \"339\",\"parentId\": \"1\",\"name\": \"(豪华版)更换机油机滤\",\"price\":\"￥417\"},{\"imgUrl\": null,\"id\": \"323\",\"parentId\": \"1\",\"name\": \"(标准版)更换机油机滤\",\"price\":\"￥339\"}]";
        // return "{\"type\":\"info\",\"message\":\"123456\"}";
    }
    
}
