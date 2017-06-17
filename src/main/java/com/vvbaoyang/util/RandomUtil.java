package com.vvbaoyang.util;

import java.util.Random;

/**
 * @author mgcele
 */
public class RandomUtil {
    
    /**
     * 生成指定范围内的int随机数
     *
     * @param min
     * @param max
     * @return
     */
    public static int randomInt(final int min, final int max) {
        Random rand = new Random();
        int tmp = Math.abs(rand.nextInt());
        return tmp % (max - min + 1) + min;
    }
    
}
