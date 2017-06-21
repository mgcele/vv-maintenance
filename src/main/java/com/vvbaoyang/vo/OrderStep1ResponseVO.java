package com.vvbaoyang.vo;

/**
 * @author mgcele
 */
public class OrderStep1ResponseVO extends AbstractGeneResponse{
    private static final long serialVersionUID = 7599388693044008396L;
    private Integer orderId;
    
    public Integer getOrderId() {
        return orderId;
    }
    
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
}
