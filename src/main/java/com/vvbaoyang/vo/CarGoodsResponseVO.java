package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author mgcele
 */
public class CarGoodsResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = -5461016353529898040L;
    private List<CarGoodsResponse> list;
    
    public List<CarGoodsResponse> getList() {
        return list;
    }
    
    public void setList(List<CarGoodsResponse> list) {
        this.list = list;
    }
}
