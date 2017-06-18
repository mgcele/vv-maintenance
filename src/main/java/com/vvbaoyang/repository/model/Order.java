package com.vvbaoyang.repository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * @author mgcele
 */
@Table
@Entity(name = "t_order")
public class Order implements Serializable{
    private static final long serialVersionUID = -4624759720976882027L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "t_car_goods_id")
    private Integer carGoodsId;
    
    @Column(name = "real_name")
    private String realName;
    
    @Column(name = "mobile")
    private String mobile;
    
    @Column(name = "plate_number")
    private String plateNumber;
    
    @Column(name = "apppintment_time")
    private Date appointmentTime;
    
    @Column(name = "open_id")
    private String openId;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
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
    
    public String getOpenId() {
        return openId;
    }
    
    public void setOpenId(String openId) {
        this.openId = openId;
    }
}
