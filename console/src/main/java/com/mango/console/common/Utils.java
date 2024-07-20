package com.mango.console.common;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;

import java.beans.FeatureDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Utils {
    public static Timestamp getLocalDateTime() {
        ZoneId zone = ZoneId.of("Asia/Shanghai", ZoneId.SHORT_IDS);
        LocalDateTime localDateTime = LocalDateTime.now(zone);
        return java.sql.Timestamp.valueOf(localDateTime);
    }

    public static Map<String, String> getQueryFromUrl(URL url) {
        Map<String, String> query = new HashMap<>();
        String queryStr = url.getQuery();
        if (queryStr != null) {
            String[] pairs = queryStr.split("&");
            for (String pair : pairs) {
                String[] kv = pair.split("=");
                if (kv.length > 1) {
                    query.put(kv[1], kv[2]);
                }
            }
        }
        return query;
    }

    public static String encodeURL(String baseURL, String... restParams) {
        try {
            StringBuilder urlBuilder = new StringBuilder(baseURL);
            if (restParams.length < 1) {
                return urlBuilder.toString();
            }

            urlBuilder.append("?");
            List<String> encodedQueries = new ArrayList<>();

            for (String param: restParams) {
                encodedQueries.add(URLEncoder.encode(param, StandardCharsets.UTF_8.toString()));
            }

            urlBuilder.append(String.join("&", encodedQueries));
            return urlBuilder.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Timestamp convertToTimestamp(String dateString, String pattern) throws Exception {
        if (pattern.isEmpty()) {
            pattern = "yyyy-MM-dd HH:mm:ss";
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        try {
            Date parsedDate = dateFormat.parse(dateString);
            return new Timestamp(parsedDate.getTime());
        } catch (Exception e) {
            throw e;
        }
    }

    public static void copyNonNullProperties(Object dest, Object orig) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        Set<String> propertyNames = Stream.of(PropertyUtils.getPropertyDescriptors(orig))
                .map(FeatureDescriptor::getName)
                .filter(name -> !"class".equals(name))
                .collect(Collectors.toSet());
        for (String propertyName : propertyNames) {
            Object value = PropertyUtils.getProperty(orig, propertyName);
            if (value != null) {
                BeanUtils.copyProperty(dest, propertyName, value);
            }
        }
    }
}
