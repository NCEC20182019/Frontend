package spring.boot.Front;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@EnableAutoConfiguration
public class FrontApplication {
   public static void main(String[] args) {
		SpringApplication.run(FrontApplication.class, args);
	}
}

