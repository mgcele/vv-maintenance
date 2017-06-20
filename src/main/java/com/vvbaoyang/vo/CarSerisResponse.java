package com.vvbaoyang.vo;

import java.io.Serializable;

/**
 * @author mgcele
 */
public class CarSerisResponse implements Serializable{
    private static final long serialVersionUID = 4127573203473075711L;
    private Integer id;
    private Integer bid;
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
