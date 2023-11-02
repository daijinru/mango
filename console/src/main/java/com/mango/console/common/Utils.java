package com.mango.console.common;

import java.time.LocalDateTime;
import java.time.ZoneId;

public class Utils {
    public static LocalDateTime getLocalDateTime() {
        ZoneId zone = ZoneId.of("Asia/Shanghai", ZoneId.SHORT_IDS);
        LocalDateTime localDateTime = LocalDateTime.now(zone);
        return localDateTime;
    }
}
