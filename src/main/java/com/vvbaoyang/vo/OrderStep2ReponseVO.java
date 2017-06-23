package com.vvbaoyang.vo;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author mgcele
 */
public class OrderStep2ReponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = -2205512415848237729L;
    
    private Integer orderId;
    
    private String name;
    
    private String mobile;
    
    private String carGoodsTitle;
    
    private Date appointmentTime;
    
    private BigDecimal bugetTotalPrice;
    
    public Integer getOrderId() {
        return orderId;
    }
    
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
    
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
    
    public String getCarGoodsTitle() {
        return carGoodsTitle;
    }
    
    public void setCarGoodsTitle(String carGoodsTitle) {
        this.carGoodsTitle = carGoodsTitle;
    }
    
    public BigDecimal getBugetTotalPrice() {
        return bugetTotalPrice;
    }
    
    public void setBugetTotalPrice(BigDecimal bugetTotalPrice) {
        this.bugetTotalPrice = bugetTotalPrice;
    }
    
    public Date getAppointmentTime() {
        return appointmentTime;
    }
    
    public void setAppointmentTime(Date appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
}
