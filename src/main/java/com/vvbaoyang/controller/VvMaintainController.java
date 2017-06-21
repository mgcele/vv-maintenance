package com.vvbaoyang.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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

    @RequestMapping(value = "/service.html", method = RequestMethod.GET)
    public String serverce(){

        return "service";
    }

    @RequestMapping(value = "/index.html", method = RequestMethod.GET)
    public String index1(){

        return "index";
    }

    @RequestMapping(value = "/advantage.html", method = RequestMethod.GET)
    public String advantage(){

        return "advantage";
    }

    @RequestMapping(value = "/contact.html", method = RequestMethod.GET)
    public String contact(){

        return "contact";
    }

    @RequestMapping(value = "/control.html", method = RequestMethod.GET)
    public String control(){

        return "control";
    }


    @RequestMapping(value = "/price.html", method = RequestMethod.GET)
    public String price(){

        return "price";
    }

    @RequestMapping(value = "/qualifications.html", method = RequestMethod.GET)
    public String qualifications(){

        return "qualifications";
    }


    @RequestMapping(value = "/order2", method = RequestMethod.GET)
    public String order2(){
        return "order2";
    }

    @RequestMapping(value = "/order3", method = RequestMethod.GET)
    public String order3(){
        return "order3";
    }

    @RequestMapping(value = "/order4", method = RequestMethod.POST)
    public String order4(){
        return "order4";
    }

    @RequestMapping(value = "/tips", method = RequestMethod.GET)
    public String tips(){
        return "tips";
    }
}
