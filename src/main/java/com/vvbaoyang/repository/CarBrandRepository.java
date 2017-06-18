package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.CarBrand;
import com.vvbaoyang.repository.model.UserCode;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author mgcele
 */
public interface CarBrandRepository extends JpaRepository<CarBrand, Integer> {
}
