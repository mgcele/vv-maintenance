package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.math.BigDecimal;

/**
 * @author mgcele
 */
public class CarGoodsResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = -5461016353529898040L;
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
