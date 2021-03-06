package com.vvbaoyang.api;

import com.vvbaoyang.helper.SessionHelper;
import com.vvbaoyang.repository.CarDisplacementRepository;
import com.vvbaoyang.repository.CarGoodsRepository;
import com.vvbaoyang.repository.CarSerisRepository;
import com.vvbaoyang.repository.OrderRepository;
import com.vvbaoyang.repository.UserCodeRepository;
import com.vvbaoyang.repository.UserRepository;
import com.vvbaoyang.repository.model.CarDisplacement;
import com.vvbaoyang.repository.model.CarGoods;
import com.vvbaoyang.repository.model.CarSeris;
import com.vvbaoyang.repository.model.Order;
import com.vvbaoyang.repository.model.User;
import com.vvbaoyang.repository.model.UserCode;
import com.vvbaoyang.util.RandomUtil;
import com.vvbaoyang.util.SmsSingleSender;
import com.vvbaoyang.vo.AbstractGeneResponse;
import com.vvbaoyang.vo.CarDisplacementResponse;
import com.vvbaoyang.vo.CarDisplacementResponseVO;
import com.vvbaoyang.vo.CarGoodsResponse;
import com.vvbaoyang.vo.CarGoodsResponseVO;
import com.vvbaoyang.vo.CarSerisResponse;
import com.vvbaoyang.vo.CarSerisResponseVO;
import com.vvbaoyang.vo.JsonRestResponseVO;
import com.vvbaoyang.vo.OrderStep1RequestVO;
import com.vvbaoyang.vo.OrderStep1ResponseVO;
import com.vvbaoyang.vo.RegisterRequestVO;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author mgcele
 */
@RestController
@RequestMapping("/user")
public class UserApi {
    
    private Logger logger = LoggerFactory.getLogger(UserApi.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserCodeRepository userCodeRepository;
    
    @Value("${min_vc}")
    private Integer MIN_VC;
    
    @Value("${max_vc}")
    private Integer MAX_VC;
    
    @Autowired
    private CarSerisRepository carSerisRepository;
    
    @Autowired
    private CarDisplacementRepository carDisplacementRepository;
    
    @Autowired
    private CarGoodsRepository carGoodsRepository;
    
  
    @GetMapping("/carGoods/carGoodsType/{carGoodsTypeId}")
    public CarGoodsResponseVO queryCarGoods(@PathVariable(value = "carGoodsTypeId") Integer carGoodsTypeId) {
    
        List<CarGoods> list = carGoodsRepository.findByCarGoodsTypeId(carGoodsTypeId);
        CarGoodsResponseVO carGoodsResponseVO = new CarGoodsResponseVO();
        if (CollectionUtils.isEmpty(list)) {
            return carGoodsResponseVO;
        }
        List<CarGoodsResponse> tempList = new ArrayList<>();
        for (CarGoods carGoods : list) {
            CarGoodsResponse temp = new CarGoodsResponse();
            BeanUtils.copyProperties(carGoods, temp);
            tempList.add(temp);
        }
        carGoodsResponseVO.setList(tempList);
        return carGoodsResponseVO;
    }
    
    @GetMapping("/carDisplacement/{did}")
    public CarDisplacementResponseVO queryCarDisplacement(@PathVariable(value = "did") Integer did) {
        List<CarDisplacement> carDisplacementList = carDisplacementRepository.findBySid(did);
        CarDisplacementResponseVO carDisplacementResponseVO = new CarDisplacementResponseVO();
        if (CollectionUtils.isEmpty(carDisplacementList)) {
            return carDisplacementResponseVO;
        }
        List<CarDisplacementResponse> tempList = new ArrayList<>();
        for (CarDisplacement carDisplacement : carDisplacementList) {
            CarDisplacementResponse temp = new CarDisplacementResponse();
            BeanUtils.copyProperties(carDisplacement, temp);
            tempList.add(temp);
        }
        carDisplacementResponseVO.setList(tempList);
        return carDisplacementResponseVO;
    }
    
    @GetMapping("/carModel/{bid}")
    public CarSerisResponseVO queryCarModel(@PathVariable(value = "bid") Integer bid) {
        List<CarSeris> list = carSerisRepository.findByBid(bid);
        CarSerisResponseVO carSerisResponseVO = new CarSerisResponseVO();
        if (CollectionUtils.isEmpty(list)) {
            return carSerisResponseVO;
        }
        
        List<CarSerisResponse> tempList = new ArrayList<>();
        for (CarSeris carSeris : list) {
            CarSerisResponse temp = new CarSerisResponse();
            BeanUtils.copyProperties(carSeris, temp);
            tempList.add(temp);
        }
        carSerisResponseVO.setList(tempList);
        return carSerisResponseVO;
    }
    
    @PostMapping("/register")
    public User register(HttpSession session, @RequestBody RegisterRequestVO registerRequestVO) {
        
        logger.info("注册、、、");
        if (!checkRandomCode(registerRequestVO.getTelePhoneNum(), registerRequestVO.getRandomCode())) {
            throw new RuntimeException("验证码错误！");
        }
        String openId = (String) session.getAttribute(SessionHelper.getSessionIdForOpenId());
        User user = userRepository.findUserByOpenId(openId);
        if (user == null) {
            user = new User();
            user.setRealName(registerRequestVO.getRealName());
            user.setPassword(registerRequestVO.getPassword());
            user.setTelePhoneNum(registerRequestVO.getTelePhoneNum());
            user.setOpenId(openId);
            
            user.setUpdateTime(new Date());
            user.setCreateTime(new Date());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("用户已存在！");
        }
    }
    
    @GetMapping("/getVC")
    public AbstractGeneResponse getVC(@RequestParam(value = "username") String username) throws Exception {
        
        String code = generateCode();
        
        UserCode userCode = userCodeRepository.findUserCodeByCodeKey(username);
        if (userCode == null) {
            userCode = new UserCode();
        }
        userCode.setCode(code);
        userCode.setCodeKey(username);
        userCode.setCreateTime(new Date());
        userCodeRepository.saveAndFlush(userCode);
        
        SmsSingleSender smsSingleSender = new SmsSingleSender();
        smsSingleSender.sendSms(username, code);
        return new AbstractGeneResponse();
    }
    
    /**
     * 校验验证码
     */
    private boolean checkRandomCode(String username, String randomCode) {
        
        if (StringUtils.isBlank(randomCode)) {
            return false;
        }
        
        UserCode userCode = userCodeRepository.findUserCodeByCodeKey(username);
        if (userCode != null) {
            boolean result = randomCode.equals(userCode.getCode());
            if (result) {
                userCodeRepository.delete(userCode);
                return true;
            }
        }
        return false;
    }
    
    /**
     * 生成验证码
     */
    private String generateCode() {
        return RandomUtil.randomInt(MIN_VC, MAX_VC) + "";
    }
    
    @ExceptionHandler
    public ResponseEntity<JsonRestResponseVO> handleException(Exception e) {
        logger.error(e.getMessage(), e);
    
        String errMsg = e.getMessage();
        JsonRestResponseVO result = new JsonRestResponseVO().failure("1", errMsg);
    
        return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
