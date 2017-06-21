package com.vvbaoyang.api;

import com.vvbaoyang.helper.SessionHelper;
import com.vvbaoyang.repository.OrderRepository;
import com.vvbaoyang.repository.model.Order;
import com.vvbaoyang.vo.OrderStep1RequestVO;
import com.vvbaoyang.vo.OrderStep1ResponseVO;
import com.vvbaoyang.vo.OrderStep2ReponseVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author mgcele
 */
@RestController
@RequestMapping("/order")
public class OrderApi {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @PostMapping("/step1")
    public OrderStep1ResponseVO addOrder(HttpSession session, @RequestBody OrderStep1RequestVO orderStep1RequestVO) {
        
        Order order = new Order();
        order.setName(orderStep1RequestVO.getName());
        order.setMobile(orderStep1RequestVO.getMobile());
        order.setCarDisplacementId(orderStep1RequestVO.getCarDisplacementId());
        order.setCarGoodsId(orderStep1RequestVO.getCarGoodsId());
        order.setCarGoodsNumber(orderStep1RequestVO.getCarGoodsNumber());
        order.setAppointmentTime(orderStep1RequestVO.getAppointmentTime());
        order.setPlateNumber(orderStep1RequestVO.getPlateNumber());
        order.setAddress(orderStep1RequestVO.getAddress());
        String openId = (String) session.getAttribute(SessionHelper.getSessionIdForOpenId());
        order.setOpenId(openId);
        order = orderRepository.save(order);
        OrderStep1ResponseVO orderStep1ResponseVO = new OrderStep1ResponseVO();
        orderStep1ResponseVO.setOrderId(order.getId());
        return orderStep1ResponseVO;
        
    }
    
    @GetMapping("/step2/{orderId}")
    public OrderStep2ReponseVO getOrder(@PathVariable(value = "orderId") Integer orderId){
        Order order = orderRepository.findOne(orderId);
        OrderStep2ReponseVO orderStep2ReponseVO = new OrderStep2ReponseVO();
        orderStep2ReponseVO.setOrderId(order.getId());
        orderStep2ReponseVO.setCarGoodsId(order.getCarGoodsId());
        orderStep2ReponseVO.setMobile(order.getMobile());
        orderStep2ReponseVO.setName(order.getName());
        return orderStep2ReponseVO;
    }
    
}
