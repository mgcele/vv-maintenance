package com.vvbaoyang.repository;

import com.vvbaoyang.repository.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author mgcele
 */
public interface UserRepository extends JpaRepository<User,Integer>{


    User findUserByOpenId(@Param("open_id") String openId);


}
