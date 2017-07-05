package com.vvbaoyang.filter;

import com.vvbaoyang.helper.SessionHelper;
import com.vvbaoyang.repository.UserRepository;
import com.vvbaoyang.repository.model.User;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @author mgcele
 */
@WebFilter(filterName = "oautj20Filter", urlPatterns = "/*")
public class Oauth20Filter implements Filter{
    
    private Logger logger = LoggerFactory.getLogger(Oauth20Filter.class);
    
    public final static String SESSION_WECHAT_OPENID = "SESSION_WECHAT_OPENID_";
    public final static String SESSION_ORIGINAL_URL = "SESSION_ORIGINAL_URL";
    public final static String SESSION_MANAGER_ID = "SESSION_MANAGER_ID";
    
    @Value("${weChatAppId}")
    private String weChatAppId;
    
    @Value("${redirectUri}")
    private String redirectUri;
    
    @Value("${registerUrl}")
    private String registerUrl;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    
    }
    
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpSession session = request.getSession();
    
        String originalUrl = request.getServletPath();
    
        //需要排除过滤的url
        if(isUrlExcluded(originalUrl)){
            filterChain.doFilter(request, response);
            return;
        }
    
        //从session中获取openId，若获取不到，则进行oAuth授权
        String openId = (String) session.getAttribute(SessionHelper.getSessionIdForOpenId());
        if(StringUtils.isNotBlank(openId)){
            
            String realName = (String) session.getAttribute("realName");
            String telePhoneNum = (String) session.getAttribute("telePhoneNum");
            
            if(StringUtils.isBlank(realName) || StringUtils.isBlank(telePhoneNum)){
                User user = userRepository.findUserByOpenId(openId);
                if(user != null){
                    session.setAttribute("realName", user.getRealName());
                    session.setAttribute("telePhoneNum", user.getTelePhoneNum());
                } else {
                    String tempUrl = request.getServletPath();
                    if(tempUrl.contains("register") || tempUrl.contains("getVC")||tempUrl.contains("activty")||tempUrl.contains("introduction")||tempUrl.contains("MP_verify_pDNhm4qjHaEwGW2k")){
                        filterChain.doFilter(request, response);
                        return;
                    }
                    response.sendRedirect(registerUrl);
                    return;
                }
            }
            
            filterChain.doFilter(request, response);
            return;
        }
    
        //进行oauth授权之前先保存下当前的uoriginalUrl
        //        String queryString = request.getQueryString();
        //        if(StringUtils.isNotBlank(queryString)){
        //            originalUrl += "?";
        //            originalUrl += queryString;
        //        }
        session.setAttribute(SessionHelper.getSessionIdForOriginal(), originalUrl);
    
        logger.info("获取openId第一步--获取code开始");
        response.sendRedirect(getOAuthUrl());
        return;
    }
    
    @Override
    public void destroy() {
    
    }
    
    /**
     * 需要排除的url
     */
    private boolean isUrlExcluded(String url){
        if(StringUtils.isNotBlank(url)){
            if(url.contains("js") || url.contains("css") || url.contains("oauth") || url.contains("images") || url.contains("getVC")||url.contains(".txt")){
                return true;
            }
            if(url.contains("activty")||url.contains("introduction"))
            {
                return true;
            }
        }
        return false;
    }
    
    private String getOAuthUrl(){
        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + weChatAppId + "&redirect_uri=" + redirectUri +"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    }
}
