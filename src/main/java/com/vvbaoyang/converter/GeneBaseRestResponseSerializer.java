package com.vvbaoyang.converter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.vvbaoyang.specification.IGeneJsonable;
import com.vvbaoyang.vo.JsonRestResponseVO;

import java.io.IOException;

/**
 * @author mgcele
 */
public class GeneBaseRestResponseSerializer extends JsonSerializer<IGeneJsonable> {
    
    @Override
    public void serialize(IGeneJsonable value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
        
        ObjectMapper mapper = new ObjectMapper();
        String dataJsonStr = mapper.writeValueAsString(value);
        
        JSONObject dataJsonObj = JSON.parseObject(dataJsonStr);
        
        JsonRestResponseVO obj = new JsonRestResponseVO().success(dataJsonObj);
        jgen.writeObject(obj);
        
    }
}