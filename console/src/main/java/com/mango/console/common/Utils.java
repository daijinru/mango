package com.mango.console.common;

import java.net.URL;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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

    public static <T> T pickRandomEntity(List<T> entityList) {
        if (entityList == null || entityList.isEmpty()) {
            return null;
        }

        Random random = new Random();
        int randomIndex = random.nextInt(entityList.size());
        return entityList.get(randomIndex);
    }
}
