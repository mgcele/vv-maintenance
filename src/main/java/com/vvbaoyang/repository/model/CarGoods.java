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
    
    @Column(name = "price")
    private BigDecimal price;
    
    /**
     * 机油品牌
     */
    @Column(name = "oil_brand")
    private String oilBrand;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
}
