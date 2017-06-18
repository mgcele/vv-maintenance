package com.vvbaoyang.vo;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;

/**
 * @author mgcele
 */
public class CarBrandResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = 7121646590598761815L;
    private Integer id;
    
    private Integer bid;
    
    private String carBrand;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Integer getBid() {
        return bid;
    }
    
    public void setBid(Integer bid) {
        this.bid = bid;
    }
    
    public String getCarBrand() {
        return carBrand;
    }
    
    public void setCarBrand(String carBrand) {
        this.carBrand = carBrand;
    }
}
