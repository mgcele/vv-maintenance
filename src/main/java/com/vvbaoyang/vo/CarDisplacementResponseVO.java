package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.util.List;

/**
 * @author mgcele
 */
public class CarDisplacementResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = 8150992365289471633L;
    private List<CarDisplacementResponse> list;
    
    public List<CarDisplacementResponse> getList() {
        return list;
    }
    
    public void setList(List<CarDisplacementResponse> list) {
        this.list = list;
    }
}
