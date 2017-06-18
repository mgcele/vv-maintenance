package com.vvbaoyang.vo;

import com.alibaba.fastjson.JSONObject;

import java.io.Serializable;

/**
 * @author mgcele
 */
public class JsonRestResponseVo implements Serializable{
    private static final long serialVersionUID = 2197714351916674631L;
    // 成功响应的return code为0
    private static final String RET_CODE_SUCCESS = "0";
    
    /**
     * 元信息
     */
    private Status status;
    
    /**
     * 数据
     */
    private JSONObject list;
    
    public JsonRestResponseVo success() {
        this.status = new Status(RET_CODE_SUCCESS);
        return this;
    }
    
    public JsonRestResponseVo success(JSONObject list) {
        this.status = new Status(RET_CODE_SUCCESS);
        this.list = list;
        return this;
    }
    
    public JsonRestResponseVo failure(String retCode, String message) {
        this.status = new Status(retCode, message);
        return this;
    }
    
    public JsonRestResponseVo failure(String retCode, String message, String[] msgs) {
        this.status = new Status(retCode, message, msgs);
        return this;
    }
    
    public Status getStatus() {
        return status;
    }
    
    public JSONObject getList() {
        return list;
    }
    
    public class Status {
        
        private String retCode;
        
        // 具体的异常消息描述列表，经常用于校验返回
        private String[] errMsg;
        
        public Status(String retCode) {
            this.retCode = retCode;
            this.errMsg = new String[1];
            this.errMsg[0] = "";
        }
        
        public Status(String retCode, String retMsg) {
            this.retCode = retCode;
            this.errMsg = new String[1];
            this.errMsg[0] = retMsg;
        }
        
        public Status(String retCode, String retMsg, String[] errMsg) {
            this.retCode = retCode;
            this.errMsg = errMsg;
        }
        
        public String getRetCode() {
            return retCode;
        }
        
        public String[] getErrMsg() {
            return errMsg;
        }
        
        public void setErrMsg(String[] errMsg) {
            this.errMsg = errMsg;
        }
        
    }
}
