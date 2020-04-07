package com.teste.webpack;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WebpackApplicationTests {

	@Test
	void contextLoads() throws ParseException {
		try {
			Calendar calendar = Calendar.getInstance();
			calendar.setTimeZone(TimeZone.getTimeZone("America/Cuiaba"));
			calendar.set(Calendar.MINUTE, 0);
			calendar.set(Calendar.HOUR, 0);
			calendar.set(Calendar.DAY_OF_MONTH, 10);
			calendar.set(Calendar.MONTH, 0);
			calendar.set(Calendar.YEAR, 2020);
			
//			SimpleDateFormat formatadorData = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
//			formatadorData.setTimeZone(TimeZone.getTimeZone("Europe/London"));
			Date data = calendar.getTime();// formatadorData.parse("2020-01-01T12:00:00");
			
			SimpleDateFormat formatadorHoras = new SimpleDateFormat("HH:mm");
			String horas = formatadorHoras.format(data);
			
			assertEquals("10:00", horas);
		} catch (Exception e) {
			fail(e.getMessage());
		}
	}

}
