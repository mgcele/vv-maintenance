package com.vvbaoyang.converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.vvbaoyang.specification.IGeneJsonable;

/**
 * @author mgcele
 */
public class GeneCustomObjectMapper extends ObjectMapper {
    
    private static final long serialVersionUID = 6377055537061664932L;
    
    public GeneCustomObjectMapper() {
        super();
        
        // 添加自定义的Long类型转换器
        // 如果未添加此转换器，则Long类型被转换成json对象时，会缺失精度
        registerModule(new SimpleModule().addSerializer(IGeneJsonable.class, new GeneBaseRestResponseSerializer())
                .addSerializer(Long.class, new GeneLongTypeSerializer()).addSerializer(Long.TYPE, ToStringSerializer.instance));
        
    }
}
