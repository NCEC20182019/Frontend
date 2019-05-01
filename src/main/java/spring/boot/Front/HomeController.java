package spring.boot.Front;

import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServerOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@Controller
public class HomeController {

  private static String serviceUrl = "http://localhost:9999/auth";

  @GetMapping({"/", "/app/**", "/login"})
  public static String index(){
    return "forward:/index.html";
  }



  @PostMapping("/signin")
  public static String login(@RequestBody Map<String, String> credentials) {
    String token = WebClient.create().post()
      .uri(serviceUrl + "/oauth/token" + "?" +
        String.format("%s=%s&%s=%s&%s=%s",
          "grant_type", "password",
          "username", credentials.get("username"),
          "password", credentials.get("password")))
      .accept(MediaType.APPLICATION_JSON)
      .contentType(MediaType.APPLICATION_FORM_URLENCODED)
      .attributes(ServerOAuth2AuthorizedClientExchangeFilterFunction
        .clientRegistrationId("front"))
      .retrieve()
      .bodyToMono(java.util.Map.class)
      .block()
      .get("ACCESS_TOKEN")
      .toString();

    return token;
  }
}
