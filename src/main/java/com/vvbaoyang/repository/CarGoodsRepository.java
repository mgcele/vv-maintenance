package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.CarGoods;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author mgcele
 */
public interface CarGoodsRepository extends JpaRepository<CarGoods, Integer>{
    
    List<CarGoods> findByCarGoodsTypeId(Integer carGoodsTypeId);
    
}
