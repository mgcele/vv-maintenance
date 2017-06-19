package com.vvbaoyang.vo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author mgcele
 */
public class CarGoodsResponse implements Serializable{
    private static final long serialVersionUID = -6329497318268808989L;
    private Integer id;
    private BigDecimal price;
    private String description;
    
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
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}
