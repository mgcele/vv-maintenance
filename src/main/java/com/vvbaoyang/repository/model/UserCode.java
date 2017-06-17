package com.vvbaoyang.repository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * @author mgcele
 */
@Table
@Entity(name = "t_user_code")
public class UserCode implements Serializable{
    
    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -5082940351371715801L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "code_key")
    private String codeKey;
    
    @Column(name = "code")
    private String code;
    
    @Column(name = "create_time")
    private Date createTime;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public Date getCreateTime() {
        return createTime;
    }
    
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
    
    public String getCodeKey() {
        return codeKey;
    }
    
    public void setCodeKey(String codeKey) {
        this.codeKey = codeKey;
    }
}
