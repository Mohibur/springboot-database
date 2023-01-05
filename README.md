# How to Use

## Install Repository
1. Clone this repository
2. run `bash install.bash.sh`
3. Include in project
4. add dependency

e.g.

```xml
<dependency>
	<groupId>simple.mind</groupId>
	<artifactId>dbplayer</artifactId>
	<version>0.0.1-SNAPSHOT</version>
</dependency>
```

## add component scan. (make sure to add own package too)

e.g.

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({ 
	"simple.mind.dbplayer", // package provides http://localhost:8080/database/ 
	"com.example.demo"      // package of this project
	})
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

}

```


## Tested on db

1. h2
