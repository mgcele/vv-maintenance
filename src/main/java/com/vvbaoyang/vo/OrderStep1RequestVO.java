package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author mgcele
 */
public class OrderStep1RequestVO implements Serializable{
    private static final long serialVersionUID = 3044941878192721916L;
    
    private String name;
    
    private String mobile;
    
    private Integer carDisplacementId;
    
    private Integer carGoodsId;
    
    private Integer carGoodsNumber;
    
    private Date appointmentTime;
    
    private String plateNumber;
    
    private String address;
    
    private String remark;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getMobile() {
        return mobile;
    }
    
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    
    public Integer getCarDisplacementId() {
        return carDisplacementId;
    }
    
    public void setCarDisplacementId(Integer carDisplacementId) {
        this.carDisplacementId = carDisplacementId;
    }
    
    public Integer getCarGoodsId() {
        return carGoodsId;
    }
    
    public void setCarGoodsId(Integer carGoodsId) {
        this.carGoodsId = carGoodsId;
    }
    
    public Integer getCarGoodsNumber() {
        return carGoodsNumber;
    }
    
    public void setCarGoodsNumber(Integer carGoodsNumber) {
        this.carGoodsNumber = carGoodsNumber;
    }
    
    public Date getAppointmentTime() {
        return appointmentTime;
    }
    
    public void setAppointmentTime(Date appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
    
    public String getPlateNumber() {
        return plateNumber;
    }
    
    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getRemark() {
        return remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
}
