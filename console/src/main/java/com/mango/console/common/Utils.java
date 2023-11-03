package com.mango.console.common;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class Utils {
    public static Timestamp getLocalDateTime() {
        ZoneId zone = ZoneId.of("Asia/Shanghai", ZoneId.SHORT_IDS);
        LocalDateTime localDateTime = LocalDateTime.now(zone);
        return java.sql.Timestamp.valueOf(localDateTime);
    }
}
