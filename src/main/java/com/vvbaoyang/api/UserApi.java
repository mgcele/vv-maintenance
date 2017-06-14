package com.vvbaoyang.api;

import com.vvbaoyang.helper.SessionHelper;
import com.vvbaoyang.repository.UserRepository;
import com.vvbaoyang.repository.model.User;
import com.vvbaoyang.vo.RegisterVO;
import org.aspectj.weaver.ast.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpSession;
import java.util.Date;

/**
 * @author mgcele
 */
@RestController
@RequestMapping("/user")
public class UserApi {
    
    private Logger logger = LoggerFactory.getLogger(UserApi.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/register")
    public User register(HttpSession session, @RequestBody RegisterVO registerVO) {
        logger.info("注册、、、");
        if(!checkRandomCode(registerVO.getRandomCode())){
            throw new RuntimeException("验证码错误！");
        }
        String openId = (String) session.getAttribute(SessionHelper.getSessionIdForOpenId());
        User user = userRepository.findUserByOpenId(openId);
        if(user == null) {
            user = new User();
            user.setRealName(registerVO.getRealName());
            user.setPassword(registerVO.getPassword());
            user.setTelePhoneNum(registerVO.getTelePhoneNum());
            user.setOpenId(openId);
    
            user.setUpdateTime(new Date());
            user.setCreateTime(new Date());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("用户已存在！");
        }
    }
    
    private boolean checkRandomCode(String randomCode){
        return "6666".equals(randomCode);
    }
    
}
