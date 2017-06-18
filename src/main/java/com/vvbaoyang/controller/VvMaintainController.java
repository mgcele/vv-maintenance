package com.vvbaoyang.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author mgcele
 */
@Controller
public class VvMaintainController {

    @RequestMapping("/login")
    public String login(){
        return "login";
    }
    
    @RequestMapping("/")
    public String index(){
        return "huiyuan";
    }
    
    @RequestMapping("/register")
    public String register(){
        return "register";
    }
    
    @RequestMapping("/order")
    public String order(){
        return "order1";
    }

}
