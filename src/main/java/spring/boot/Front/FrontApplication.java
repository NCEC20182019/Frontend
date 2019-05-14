package spring.boot.Front;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication
//@EnableZuulProxy
@EnableOAuth2Sso
@Configuration
public class FrontApplication extends WebSecurityConfigurerAdapter {
   public static void main(String[] args) {
		SpringApplication.run(FrontApplication.class, args);
	}

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http
      .logout().logoutSuccessUrl("/").and()
      .authorizeRequests()
        .antMatchers("/index.html", "/", "/signin", "/login").permitAll()
        .antMatchers("/app/events/1").authenticated()
        .anyRequest().permitAll()
      .and()
        .csrf()
        .disable();
//      .formLogin().loginPage("/login1.html").failureUrl("/fmafss").permitAll();
  }
}

