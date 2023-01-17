package simple.mind.dbplayer.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@ComponentScan("simple.mind.dbplayer")
@Controller
public class DBPlayerDemo {

  public static void main(String[] args) {
    SpringApplication.run(DBPlayerDemo.class, args);
  }

  @GetMapping("/")
  public String i() {
    return "testindex";
  }
}
