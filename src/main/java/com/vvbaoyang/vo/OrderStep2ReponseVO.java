package com.vvbaoyang.vo;

/**
 * @author mgcele
 */
public class OrderStep2ReponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = -2205512415848237729L;
    
    private Integer orderId;
    
    private String name;
    
    private String mobile;
    
    private Integer carGoodsId;
    
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
    
    public Integer getCarGoodsId() {
        return carGoodsId;
    }
    
    public void setCarGoodsId(Integer carGoodsId) {
        this.carGoodsId = carGoodsId;
    }
}
