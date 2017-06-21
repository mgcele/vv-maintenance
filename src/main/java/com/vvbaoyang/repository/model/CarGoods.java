package com.vvbaoyang.repository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author mgcele
 */
@Table
@Entity(name = "t_car_goods")
public class CarGoods implements Serializable{
    private static final long serialVersionUID = 928497789448775462L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    
    /**
     * 商品名
     */
    @Column(name = "car_goods_title")
    private String carGoodsTitle;
    
    /**
     * 商品单价
     */
    @Column(name = "unitPrice")
    private BigDecimal unitPrice;
    
    
    /**
     * 商品类型名称
     */
    @Column(name = "car_goods_type_name")
    private String carGoodsTypeName;
    
    /**
     * 商品类型id
     */
    @Column(name = "car_goods_type_id")
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
    
    public String getCarGoodsTypeName() {
        return carGoodsTypeName;
    }
    
    public void setCarGoodsTypeName(String carGoodsTypeName) {
        this.carGoodsTypeName = carGoodsTypeName;
    }
    
    public Integer getCarGoodsTypeId() {
        return carGoodsTypeId;
    }
    
    public void setCarGoodsTypeId(Integer carGoodsTypeId) {
        this.carGoodsTypeId = carGoodsTypeId;
    }
    
    public String getCarGoodsTitle() {
        return carGoodsTitle;
    }
    
    public void setCarGoodsTitle(String carGoodsTitle) {
        this.carGoodsTitle = carGoodsTitle;
    }
}
