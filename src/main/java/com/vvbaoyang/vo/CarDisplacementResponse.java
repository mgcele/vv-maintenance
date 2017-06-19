package com.vvbaoyang.vo;

import java.io.Serializable;

/**
 * @author mgcele
 */
public class CarDisplacementResponse implements Serializable{
    private static final long serialVersionUID = 355380299073433238L;
    private Integer id;
    
    private Integer did;
    
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
