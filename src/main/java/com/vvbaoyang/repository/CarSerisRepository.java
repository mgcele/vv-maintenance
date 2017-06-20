package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.CarSeris;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author mgcele
 */
public interface CarSerisRepository extends JpaRepository<CarSeris, Integer>{

    List<CarSeris> findByBid(Integer bid);

}
