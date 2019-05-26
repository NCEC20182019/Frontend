package spring.boot.Front;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Map;

@Controller
public class HomeController {
  private static String serviceUrl = "http://lemmeknow:9999/auth";

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
    Map tokenInfo = WebClient.create().post()
      .uri(uri)
      .accept(MediaType.APPLICATION_JSON)
      // .attributes(ServerOAuth2AuthorizedClientExchangeFilterFunction
      // .clientRegistrationId("front"))
      .header("Authorization", encoding)
      .header("Content-Type", "application/x-www-form-urlencoded")
      .retrieve()
      .bodyToMono(Map.class)
      .block();

    Map user = WebClient.create().get()
      .uri(serviceUrl + "/user/me")
      .accept(MediaType.APPLICATION_JSON)
      // .attributes(ServerOAuth2AuthorizedClientExchangeFilterFunction
      // .clientRegistrationId("front"))
      .header("Authorization", "Bearer " + tokenInfo.get("access_token"))
      .retrieve()
      .bodyToMono(Map.class)
      .block();

    Map principal = (Map)user.get("principal");

    Object[] arrRoles = ((ArrayList)principal.get("roles")).toArray();
    StringBuilder roles = new StringBuilder();
    for(int i = 0; i < arrRoles.length; i++)
    {
      roles.append(String.format("{ \"name\" : \"%s\"}" + (i < arrRoles.length - 1 ? "," : ""), ((Map) arrRoles[i]).get("name")));
    }


    return String.format(
      "{"
        + "\"token\" : \"%s\","
        + "\"time\" : %s,"
        + "\"refresh\" : \"%s\","
        + "\"user\" : {"
        +   "\"id\" : %s,"
        +   "\"username\" : \"%s\","
        +   "\"email\" : \"%s\","
        +   "\"roles\" : ["
        +     "%s"
        + "],"
        + "\"notification_channel\" : \"%s\""
        + "}"
      + "}", tokenInfo.get("access_token"), tokenInfo.get("expires_in"), tokenInfo.get("refresh_token"),
      principal.get("id"), principal.get("username"), principal.get("email"), roles, principal.get("notification_channel"));
  }
}
