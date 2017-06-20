package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.io.Serializable;

/**
 * @author mgcele
 */
public class CarDisplacementResponse implements Serializable{
    private static final long serialVersionUID = 355380299073433238L;
    private Integer id;
    private Integer sid;
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
    
}
