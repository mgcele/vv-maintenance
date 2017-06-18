package com.vvbaoyang.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author mgcele
 */
public class RegexUtil {
    
    public static boolean isMatch(String str, String regex) {
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(str);
        return m.matches();
    }
    
}
