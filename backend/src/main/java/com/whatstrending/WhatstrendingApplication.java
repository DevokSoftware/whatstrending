package com.whatstrending;

import com.whatstrending.apis.twitter4j.configuration.TwitterProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties(TwitterProperties.class)
public class WhatstrendingApplication {
	public static void main(String[] args) {
		SpringApplication.run(WhatstrendingApplication.class, args);
	}
}
