package com.vvbaoyang.vo;

import javax.persistence.Column;

/**
 * @author mgcele
 */
public class CarDisplacementResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = 8150992365289471633L;
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
