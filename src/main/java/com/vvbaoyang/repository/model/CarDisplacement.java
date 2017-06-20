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
@Entity(name = "t_car_displacement")
public class CarDisplacement implements Serializable{
    
    private static final long serialVersionUID = 6752190531986364146L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "sid")
    private Integer sid;
    
    @Column(name = "title")
    private String title;
    
    /**
     * 容量
     */
    @Column(name = "capacity")
    private Double capacity;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Integer getSid() {
        return sid;
    }
    
    public void setSid(Integer sid) {
        this.sid = sid;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public Double getCapacity() {
        return capacity;
    }
    
    public void setCapacity(Double capacity) {
        this.capacity = capacity;
    }
}
