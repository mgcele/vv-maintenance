package com.vvbaoyang.repository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author mgcele
 */
@Table
@Entity(name = "t_car_brand")
public class CarBrand implements Serializable{
    
    private static final long serialVersionUID = 8333628920547660943L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "bid")
    private Integer bid;
    
    @Column(name = "car_brand")
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
