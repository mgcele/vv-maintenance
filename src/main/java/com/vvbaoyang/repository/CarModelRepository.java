package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.CarModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author mgcele
 */
public interface CarModelRepository extends JpaRepository<CarModel, Integer>{

    List<CarModel> findByBid(Integer bid);

}
