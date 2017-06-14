package com.vvbaoyang.repository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * @author mgcele
 */
@Entity
public class User implements Serializable{
    
    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -4731671347514898592L;
    
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Integer userId;//userId
    
    @Column(name = "open_id")
    private String openId;//微信OPENID
    
    @Column(name = "nick_name")
    private String nickName;//微信昵称
    
    @Column(name = "tele_phone_num")
    private String telePhoneNum;//电话号码
    
    @Column(name = "real_name")
    private String realName;//姓名
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "create_time")
    private Date createTime;//注册时间
    
    /**
     * 更新时间
     */
    @Column(name = "update_time")
    private Date updateTime;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    
    public String getTelePhoneNum() {
        return telePhoneNum;
    }
    
    public void setTelePhoneNum(String telePhoneNum) {
        this.telePhoneNum = telePhoneNum;
    }
    
    public Date getCreateTime() {
        return createTime;
    }
    
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
    
    public String getRealName() {
        return realName;
    }
    
    public void setRealName(String realName) {
        this.realName = realName;
    }
    
    public Date getUpdateTime() {
        return updateTime;
    }
    
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
