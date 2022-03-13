package com.whatstrending.apis.news.configuration;
import com.jzhangdeveloper.newsapi.net.NewsAPI;
import com.jzhangdeveloper.newsapi.net.NewsAPIClient;
import org.springframework.stereotype.Component;

@Component
public class NewsService {

    public NewsService(){
    }

    public NewsAPIClient createNewsAPIClient(NewsProperties newsProperties){
        return NewsAPI.newClientBuilder() .setApiKey(newsProperties.getApiKey()).build();
    }
}
