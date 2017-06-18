package com.vvbaoyang.util.car;

import com.vvbaoyang.repository.CarBrandRepository;
import com.vvbaoyang.repository.model.CarBrand;
import com.vvbaoyang.util.HttpUtil;
import com.vvbaoyang.util.HttpsUtil;
import com.vvbaoyang.util.RegexUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

/**
 * @author mgcele
 */
@Controller
public class CarDataSource {
    
    public static void main(String[] args) {
        
        String url = "http://www.car1982.com/wxshop/mobile.php?act=module&do=gettype&name=wecarservice&weid=3&from_user=&tid=105";
        String result = HttpUtil.sendGet(url, "");
        System.out.println(result);
        
    }
    
    @Autowired
    private CarBrandRepository carBrandRepository;
    
    @GetMapping("getCar")
    public void getCar() {
        String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = "http://www.car1982.com/wxshop/mobile.php?act=entry&eid=159&weid=3&wxref=mp.weixin.qq.com#wechat_redirect";
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
            for (String key : map.keySet()) {
                System.out.println(key + "--->" + map.get(key));
            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
            String line;
            while ((line = in.readLine()) != null) {
                boolean b = RegexUtil.isMatch(line, ".*<option value=\"[1-9]\\d*\">[\\u4e00-\\u9fa5]+</option>");
                if (b) {
                    String temp1 = "\">";
                    String temp2 = "</option>";
                    String aaa = line.substring(line.indexOf(temp1) + 2, line.indexOf(temp2));
            
                    String temp = "\"";
                    String bbb = line.substring(line.indexOf(temp) + 1);
                    bbb = bbb.substring(0, bbb.indexOf(temp));
                    Integer ccc = Integer.parseInt(bbb);
    
                    CarBrand carBrand = new CarBrand();
                    carBrand.setBid(ccc);
                    carBrand.setCarBrand(aaa);
                    carBrandRepository.save(carBrand);
                    
                    result += line;
                }
            }
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }
}