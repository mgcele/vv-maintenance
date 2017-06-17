package com.vvbaoyang.api;

import com.vvbaoyang.helper.SessionHelper;
import com.vvbaoyang.repository.UserCodeRepository;
import com.vvbaoyang.repository.UserRepository;
import com.vvbaoyang.repository.model.User;
import com.vvbaoyang.repository.model.UserCode;
import com.vvbaoyang.util.RandomUtil;
import com.vvbaoyang.util.SmsSingleSender;
import com.vvbaoyang.vo.RegisterVO;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
    @Autowired
    private UserCodeRepository userCodeRepository;
    
    @Value("${min_vc}")
    private Integer MIN_VC;
    
    @Value("${max_vc}")
    private Integer MAX_VC;
    
    @PostMapping("/register")
    public User register(HttpSession session, @RequestBody RegisterVO registerVO) {
        logger.info("注册、、、");
        if (!checkRandomCode(registerVO.getTelePhoneNum(), registerVO.getRandomCode())) {
            throw new RuntimeException("验证码错误！");
        }
        String openId = (String) session.getAttribute(SessionHelper.getSessionIdForOpenId());
        User user = userRepository.findUserByOpenId(openId);
        if (user == null) {
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
    
    private boolean checkRandomCode(String username, String randomCode) {
        
        if (StringUtils.isBlank(randomCode)) {
            return false;
        }
        
        UserCode userCode = userCodeRepository.findUserCodeByCodeKey(username);
        if (userCode != null) {
            boolean result = randomCode.equals(userCode.getCode());
            if (result) {
                userCodeRepository.delete(userCode);
            }
        }
        return false;
    }
    
    @GetMapping("/getVC")
    public void getVC(String username) throws Exception {
        
        String code = generateCode();
        
        UserCode userCode = userCodeRepository.findUserCodeByCodeKey(username);
        userCode.setCode(code);
        userCode.setCodeKey(username);
        userCode.setCreateTime(new Date());
        userCodeRepository.saveAndFlush(userCode);
        
        SmsSingleSender smsSingleSender = new SmsSingleSender();
        smsSingleSender.sendSms(username, code);
        
    }
    
    private String generateCode() {
        return RandomUtil.randomInt(MIN_VC, MAX_VC) + "";
    }
    
}
