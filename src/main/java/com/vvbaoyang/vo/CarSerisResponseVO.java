package com.vvbaoyang.vo;

import java.util.List;

/**
 * @author mgcele
 */
public class CarSerisResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = 6415198034321225740L;
    private List<CarSerisResponse> list;
    
    public List<CarSerisResponse> getList() {
        return list;
    }
    
    public void setList(List<CarSerisResponse> list) {
        this.list = list;
    }
}
