package spring.boot.Front;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  private static final Logger log = Logger.getLogger(FrontApplication.class);

  @GetMapping({"/", "/app/**"})
  public static String index(){
    return "forward:/index.html";
  }
}
