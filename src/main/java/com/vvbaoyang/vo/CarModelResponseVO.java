package com.vvbaoyang.vo;

import javax.persistence.Column;
import java.util.List;

/**
 * @author mgcele
 */
public class CarModelResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = 6415198034321225740L;
    private List<CarModelResponse> list;
    
    public List<CarModelResponse> getList() {
        return list;
    }
    
    public void setList(List<CarModelResponse> list) {
        this.list = list;
    }
}
