package com.vvbaoyang.vo;

import javax.persistence.Column;

/**
 * @author mgcele
 */
public class CarModelResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = 6415198034321225740L;
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
