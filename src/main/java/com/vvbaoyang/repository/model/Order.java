package com.vvbaoyang.repository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author mgcele
 */
@Table
@Entity(name = "t_order")
public class Order implements Serializable {
    private static final long serialVersionUID = -4624759720976882027L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "open_id")
    private String openId;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "mobile")
    private String mobile;
    
    @Column(name = "car_displacement_id")
    private Integer carDisplacementId;
    
    @Column(name = "car_goods_id")
    private Integer carGoodsId;
    
    @Column(name = "car_goods_number")
    private Integer carGoodsNumber;
    
    @Column(name = "appointment_time")
    private Date appointmentTime;
    
    @Column(name = "plate_number")
    private String plateNumber;
    
    @Column(name = "address")
    private String address;
    
    /**
     * 预算原价
     */
    @Column(name = "budget_total_price")
    private BigDecimal bugetTotalPrice;
    
    /**
     * 实际支付金额
     */
    @Column(name = "actual_payment_price")
    private BigDecimal actualPaymentPrice;
    
    /**
     * 实际支付时间
     */
    @Column(name = "actual_payment_time")
    private Date actualPaymentTime;
    
    /**
     * 支付订单号
     */
    @Column(name = "payment_number")
    private String paymentNumber;
    
    /**
     * 备注
     */
    @Column(name = "remark")
    private String remark;
    
    /**
     * 订单是否完成
     */
    @Column(name = "is_completed")
    private boolean isCompleted;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getOpenId() {
        return openId;
    }
    
    public void setOpenId(String openId) {
        this.openId = openId;
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
    
    public BigDecimal getBugetTotalPrice() {
        return bugetTotalPrice;
    }
    
    public void setBugetTotalPrice(BigDecimal bugetTotalPrice) {
        this.bugetTotalPrice = bugetTotalPrice;
    }
    
    public BigDecimal getActualPaymentPrice() {
        return actualPaymentPrice;
    }
    
    public void setActualPaymentPrice(BigDecimal actualPaymentPrice) {
        this.actualPaymentPrice = actualPaymentPrice;
    }
    
    public Date getActualPaymentTime() {
        return actualPaymentTime;
    }
    
    public void setActualPaymentTime(Date actualPaymentTime) {
        this.actualPaymentTime = actualPaymentTime;
    }
    
    public String getPaymentNumber() {
        return paymentNumber;
    }
    
    public void setPaymentNumber(String paymentNumber) {
        this.paymentNumber = paymentNumber;
    }
    
    public boolean isCompleted() {
        return isCompleted;
    }
    
    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
    
    public String getRemark() {
        return remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
}
