package com.vvbaoyang.repository.model;

import org.springframework.transaction.annotation.Transactional;

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
    
    @Column(name = "did")
    private Integer did;
    
    @Column(name = "title")
    private String title;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Integer getDid() {
        return did;
    }
    
    public void setDid(Integer did) {
        this.did = did;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
}
