package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.CarDisplacement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author mgcele
 */
public interface CarDisplacementRepository extends JpaRepository<CarDisplacement, Integer>{
    
    List<CarDisplacement> findByDid(Integer did);
    
}
