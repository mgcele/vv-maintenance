package com.vvbaoyang.controller;

import com.vvbaoyang.filter.Oauth20Filter;
import com.vvbaoyang.helper.SessionHelper;
import com.vvbaoyang.util.HttpUtil;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import sun.rmi.runtime.Log;

import javax.servlet.http.HttpSession;

/**
 * @author mgcele
 */
@Controller
@RequestMapping("/oauth")
public class Oauth20Controller {
    
    private Logger logger = LoggerFactory.getLogger(Oauth20Controller.class);
    
    @Value("${weChatAppId}")
    private String weChatAppId;
    
    @Value("${weChatSecret}")
    private String weChatSecret;
    
    @Value("${weChatRootUrl}")
    private String weChatRootUrl;
    
    private final String OPENID = "openid";
    
    /**
     * 用code交换openId 并重定向到之前的网页
     */
    @RequestMapping(value = "/getWeChatOpenId", method = RequestMethod.GET)
    public String getOpenIdByCode(HttpSession session, @RequestParam(value = "code") String code){
        
        logger.info("获取openId第二步开始。");
        
        String resultStr = null;
        resultStr = getOpenId(code);
        
        session.setAttribute(SessionHelper.getSessionIdForOpenId(), resultStr);
        String url = (String) session.getAttribute(SessionHelper.getSessionIdForOriginal());
        
        logger.info("获取openId成功。");
        if(StringUtils.isEmpty(url)){
            url = "/";
        }
        return "redirect:" + weChatRootUrl + url;
        
    }
    
    private String getOpenId(String code){
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + weChatAppId + "&secret=" + weChatSecret + "&code=" + code
                + "&grant_type=authorization_code";
        HttpUtil httpUtil = new HttpUtil(url, null);
        String result = null;
        try {
            result = httpUtil.Do();
        } catch (Exception e) {
            //TODO 异常
            e.printStackTrace();
        }
        if (StringUtils.isNotEmpty(result)) {
            JSONObject jsonObject = new JSONObject(result);
            return (String) jsonObject.get(OPENID);
        }
        return "";
    }
    
}
