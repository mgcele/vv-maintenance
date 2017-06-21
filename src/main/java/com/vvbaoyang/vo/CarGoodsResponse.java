package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author mgcele
 */
public class CarGoodsResponse implements Serializable{
    private static final long serialVersionUID = -6329497318268808989L;
    
    /**
     * 商品id
     */
    private Integer id;
    
    /**
     * 商品名
     */
    private String carGoodsTitle;
    
    /**
     * 商品单价
     */
    private BigDecimal unitPrice;
    
    /**
     * 商品类型id
     */
    private Integer carGoodsTypeId;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public BigDecimal getUnitPrice() {
        return unitPrice;
    }
    
    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
    
    public Integer getCarGoodsTypeId() {
        return carGoodsTypeId;
    }
    
    public void setCarGoodsTypeId(Integer carGoodsTypeId) {
        this.carGoodsTypeId = carGoodsTypeId;
    }
}
