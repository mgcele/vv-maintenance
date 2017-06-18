package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.CarDisplacement;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author mgcele
 */
public interface CarDisplacementRepository extends JpaRepository<CarDisplacement, Integer>{
    
    CarDisplacement findByDid(Integer did);
    
}
