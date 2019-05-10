package spring.boot.Front;

import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServerOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Base64;
import java.util.Map;

@Controller
public class HomeController {
  private static String serviceUrl = "http://localhost:9999/auth";

  @GetMapping({"/", "/app/**", "/login"})
  public static String index(){
    return "forward:/index.html";
  }

  @PostMapping("/signin")
  @ResponseBody
  public static String login(@RequestBody Map<String, String> credentials) {
   String uri = serviceUrl + "/oauth/token" + "?" +
     String.format("%s=%s&%s=%s&%s=%s",
       "grant_type", "password",
       "username", credentials.get("username"),
       "password", credentials.get("password"));
    // String uri = serviceUrl + "/oauth/token";
    String encoding = "Basic " +
      Base64.getEncoder().encodeToString(String.format("%s:%s", "client_service", "clientsecret").getBytes());
    Object token = WebClient.create().post()
      .uri(uri)
      .accept(MediaType.APPLICATION_JSON)
      // .attributes(ServerOAuth2AuthorizedClientExchangeFilterFunction
      // .clientRegistrationId("front"))
      .header("Authorization", encoding)
      .header("Content-Type", "application/x-www-form-urlencoded")
      .retrieve()
      .bodyToMono(Map.class)
      .block()
      .get("access_token");

    return String.format("{\"token\" : \"%s\"}",(String)token);
  }
}
