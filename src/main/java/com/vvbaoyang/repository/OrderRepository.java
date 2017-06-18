package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author mgcele
 */
public interface OrderRepository extends JpaRepository<Order, Integer>{
}
