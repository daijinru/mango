package com.mango.console.common;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;

public class Utils {
    public static Timestamp getLocalDateTime() {
        ZoneId zone = ZoneId.of("Asia/Shanghai", ZoneId.SHORT_IDS);
        LocalDateTime localDateTime = LocalDateTime.now(zone);
        return java.sql.Timestamp.valueOf(localDateTime);
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
