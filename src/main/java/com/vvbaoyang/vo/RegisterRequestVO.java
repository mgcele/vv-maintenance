package com.vvbaoyang.vo;

import java.io.Serializable;

/**
 * @author mgcele
 */
public class RegisterRequestVO extends AbstractGeneResponse implements Serializable{
    
    private static final long serialVersionUID = 8296373349299032033L;
    private String realName;
    private String telePhoneNum;
    private String randomCode;
    private String password;
    private String tag;
    
    public String getRealName() {
        return realName;
    }
    
    public void setRealName(String realName) {
        this.realName = realName;
    }
    
    public String getTelePhoneNum() {
        return telePhoneNum;
    }
    
    public void setTelePhoneNum(String telePhoneNum) {
        this.telePhoneNum = telePhoneNum;
    }
    
    public String getRandomCode() {
        return randomCode;
    }
    
    public void setRandomCode(String randomCode) {
        this.randomCode = randomCode;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getTag() {
        return tag;
    }
    
    public void setTag(String tag) {
        this.tag = tag;
    }
}
