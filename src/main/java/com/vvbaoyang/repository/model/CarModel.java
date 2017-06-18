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
@Entity(name = "t_car_model")
@Table
public class CarModel implements Serializable{
    private static final long serialVersionUID = 2794225214545630923L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "bid")
    private Integer bid;
    
    @Column(name = "title")
    private String title;
    
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
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
}
