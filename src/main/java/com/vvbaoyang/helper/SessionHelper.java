package com.vvbaoyang.helper;

import com.vvbaoyang.filter.Oauth20Filter;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author mgcele
 *
 * 根据ip存储对应用户的sessionId
 */
public class SessionHelper {

    public static String getSessionIdForOpenId(){
        InetAddress address = null;
        try {
            address = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            return Oauth20Filter.SESSION_WECHAT_OPENID;
        }

        return Oauth20Filter.SESSION_WECHAT_OPENID + address.getHostAddress();
    }

    public static String getSessionIdForOriginal(){
        InetAddress address = null;
        try {
            address = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            return Oauth20Filter.SESSION_ORIGINAL_URL;
        }

        return Oauth20Filter.SESSION_ORIGINAL_URL + address.getHostAddress();
    }
    
    public static String getSessionIdForMobile(){
        InetAddress address = null;
        try {
            address = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            return "asgasgasetagsdgasdhadh";
        }
    
        return "asgasgasetagsdgasdhadh" + address.getHostAddress();
    }

}
