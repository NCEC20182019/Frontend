package spring.boot.Front;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@SpringBootApplication
public class FrontApplication {
  @RequestMapping("/hi")
  @ResponseBody
  public static String hi(){
    return "Hi";
  }

	public static void main(String[] args) {
		SpringApplication.run(FrontApplication.class, args);
	}

}

