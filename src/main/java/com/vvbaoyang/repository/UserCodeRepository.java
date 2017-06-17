package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.UserCode;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author mgcele
 */
public interface UserCodeRepository extends JpaRepository<UserCode, Integer> {
    
    UserCode findUserCodeByCodeKey(String codeKey);
    
}
