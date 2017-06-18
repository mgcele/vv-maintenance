package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Date;

/**
 * @author mgcele
 */
public class OrderRequestVO implements Serializable{
    private static final long serialVersionUID = 3044941878192721916L;
    private Integer carGoodsId;
    
    private String realName;
    
    private String mobile;
    
    private String plateNumber;
    
    private Date appointmentTime;
    
    public Integer getCarGoodsId() {
        return carGoodsId;
    }
    
    public void setCarGoodsId(Integer carGoodsId) {
        this.carGoodsId = carGoodsId;
    }
    
    public String getRealName() {
        return realName;
    }
    
    public void setRealName(String realName) {
        this.realName = realName;
    }
    
    public String getMobile() {
        return mobile;
    }
    
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    
    public String getPlateNumber() {
        return plateNumber;
    }
    
    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }
    
    public Date getAppointmentTime() {
        return appointmentTime;
    }
    
    public void setAppointmentTime(Date appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
}
