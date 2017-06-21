package com.vvbaoyang.api;

import com.vvbaoyang.helper.SessionHelper;
import com.vvbaoyang.repository.OrderRepository;
import com.vvbaoyang.repository.model.Order;
import com.vvbaoyang.vo.OrderStep1RequestVO;
import com.vvbaoyang.vo.OrderStep1ResponseVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
        BeanUtils.copyProperties(orderStep1RequestVO, order);
        String openId = (String) session.getAttribute(SessionHelper.getSessionIdForOpenId());
        order.setOpenId(openId);
        order = orderRepository.save(order);
        OrderStep1ResponseVO orderStep1ResponseVO = new OrderStep1ResponseVO();
        orderStep1ResponseVO.setOrderId(order.getId());
        return orderStep1ResponseVO;
        
    }
    
}
